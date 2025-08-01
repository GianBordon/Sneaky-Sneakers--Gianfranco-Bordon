-- Script para crear la tabla de reviews en Supabase
-- Ejecutar en el SQL Editor de Supabase

-- Crear tabla de reviews
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    pros TEXT,
    cons TEXT,
    recommend BOOLEAN DEFAULT true,
    helpful_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Asegurar que un usuario solo puede tener una review por producto
    UNIQUE(product_id, user_id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_helpful_count ON reviews(helpful_count);

-- Habilitar Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Allow authenticated users to read reviews" ON reviews
    FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir inserción solo a usuarios autenticados
CREATE POLICY "Allow authenticated users to insert reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Permitir actualización solo al autor de la review
CREATE POLICY "Allow users to update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Permitir eliminación solo al autor de la review
CREATE POLICY "Allow users to delete their own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Función para incrementar el contador de helpful
CREATE OR REPLACE FUNCTION increment_helpful_count(review_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE reviews 
    SET helpful_count = helpful_count + 1 
    WHERE id = review_id;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Función para obtener estadísticas de reviews de un producto
CREATE OR REPLACE FUNCTION get_product_review_stats(product_uuid UUID)
RETURNS TABLE (
    average_rating NUMERIC,
    total_reviews BIGINT,
    rating_distribution JSON,
    total_helpful BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(AVG(r.rating), 0)::NUMERIC(3,1) as average_rating,
        COUNT(*)::BIGINT as total_reviews,
        json_build_object(
            '1', COUNT(*) FILTER (WHERE r.rating = 1),
            '2', COUNT(*) FILTER (WHERE r.rating = 2),
            '3', COUNT(*) FILTER (WHERE r.rating = 3),
            '4', COUNT(*) FILTER (WHERE r.rating = 4),
            '5', COUNT(*) FILTER (WHERE r.rating = 5)
        ) as rating_distribution,
        COALESCE(SUM(r.helpful_count), 0)::BIGINT as total_helpful
    FROM reviews r
    WHERE r.product_id = product_uuid;
END;
$$ LANGUAGE plpgsql;

-- Comentarios para documentar la tabla
COMMENT ON TABLE reviews IS 'Tabla para almacenar las reseñas de productos';
COMMENT ON COLUMN reviews.rating IS 'Calificación de 1 a 5 estrellas';
COMMENT ON COLUMN reviews.title IS 'Título de la reseña';
COMMENT ON COLUMN reviews.comment IS 'Comentario principal de la reseña';
COMMENT ON COLUMN reviews.pros IS 'Aspectos positivos del producto';
COMMENT ON COLUMN reviews.cons IS 'Aspectos negativos del producto';
COMMENT ON COLUMN reviews.recommend IS 'Si el usuario recomienda el producto';
COMMENT ON COLUMN reviews.helpful_count IS 'Número de usuarios que marcaron la reseña como útil';
COMMENT ON COLUMN reviews.verified IS 'Si la reseña es de un comprador verificado'; 