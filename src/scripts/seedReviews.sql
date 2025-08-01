-- Script para insertar datos de ejemplo en la tabla de reviews
-- Ejecutar después de crear la tabla y tener productos en la base de datos

-- Insertar reviews de ejemplo (ajustar los product_id según los productos existentes)
INSERT INTO reviews (product_id, user_id, rating, title, comment, pros, cons, recommend, helpful_count, verified) VALUES
-- Reviews para productos Nike
('550e8400-e29b-41d4-a716-446655440001', 'auth-user-1', 5, 'Excelente calidad y comodidad', 'Estas zapatillas son increíbles. Muy cómodas para el día a día y el deporte. El material es de primera calidad.', 'Cómodas, duraderas, buen diseño', 'Precio algo elevado', true, 15, true),
('550e8400-e29b-41d4-a716-446655440001', 'auth-user-2', 4, 'Buenas pero podrían mejorar', 'Son buenas zapatillas, pero el material podría ser un poco más resistente al desgaste.', 'Buen diseño, cómodas', 'Material podría ser más resistente', true, 8, true),
('550e8400-e29b-41d4-a716-446655440002', 'auth-user-3', 5, 'Super recomendadas', 'Compré estas zapatillas hace 3 meses y están como nuevas. Excelente inversión para el deporte.', 'Duraderas, cómodas, buen precio', 'Ninguna', true, 12, false),
('550e8400-e29b-41d4-a716-446655440002', 'auth-user-4', 3, 'Regulares', 'Las zapatillas son aceptables pero no cumplen todas las expectativas. El soporte podría ser mejor.', 'Diseño atractivo', 'Soporte limitado, precio alto', false, 3, true),

-- Reviews para productos Jordan
('550e8400-e29b-41d4-a716-446655440003', 'auth-user-5', 5, 'Clásicas y confiables', 'Las Jordan nunca fallan. Excelente calidad y el estilo es atemporal. Perfectas para basketball.', 'Calidad premium, estilo clásico', 'Precio alto', true, 20, true),
('550e8400-e29b-41d4-a716-446655440003', 'auth-user-6', 4, 'Muy buenas', 'Excelentes zapatillas para basketball. El agarre es perfecto y la amortiguación es muy buena.', 'Excelente agarre, buena amortiguación', 'Un poco pesadas', true, 10, true),
('550e8400-e29b-41d4-a716-446655440004', 'auth-user-7', 5, 'Increíbles', 'Las mejores zapatillas que he tenido. El confort es excepcional y el rendimiento en la cancha es perfecto.', 'Confort excepcional, rendimiento perfecto', 'Ninguna', true, 18, true),

-- Reviews para productos Adidas
('550e8400-e29b-41d4-a716-446655440005', 'auth-user-8', 4, 'Buenas zapatillas', 'Muy cómodas para correr. La tecnología Boost es realmente efectiva para la amortiguación.', 'Tecnología Boost efectiva, cómodas', 'Precio elevado', true, 9, true),
('550e8400-e29b-41d4-a716-446655440005', 'auth-user-9', 3, 'Aceptables', 'Son buenas zapatillas pero no extraordinarias. El precio no justifica completamente la calidad.', 'Buen diseño', 'Precio no justificado', false, 4, false),
('550e8400-e29b-41d4-a716-446655440006', 'auth-user-10', 5, 'Excelentes para running', 'Perfectas para correr largas distancias. La amortiguación es increíble y muy ligeras.', 'Ligeras, excelente amortiguación', 'Ninguna', true, 14, true),

-- Reviews para productos de jugadores específicos
('550e8400-e29b-41d4-a716-446655440007', 'auth-user-11', 5, 'LeBron no decepciona', 'Las zapatillas de LeBron son increíbles. Perfectas para basketball y muy cómodas para el día a día.', 'Perfectas para basketball, cómodas', 'Precio alto', true, 16, true),
('550e8400-e29b-41d4-a716-446655440007', 'auth-user-12', 4, 'Muy buenas', 'Excelente calidad y rendimiento. Las uso tanto para basketball como para el gimnasio.', 'Excelente rendimiento, versátiles', 'Un poco pesadas', true, 7, true),
('550e8400-e29b-41d4-a716-446655440008', 'auth-user-13', 5, 'KD siempre cumple', 'Las zapatillas de KD son perfectas. Muy ligeras y excelente para basketball.', 'Muy ligeras, excelente para basketball', 'Ninguna', true, 13, true),
('550e8400-e29b-41d4-a716-446655440008', 'auth-user-14', 4, 'Buenas pero frágiles', 'Son muy buenas zapatillas pero el material es algo frágil. Hay que tener cuidado.', 'Buen rendimiento, ligeras', 'Material frágil', true, 6, false),
('550e8400-e29b-41d4-a716-446655440009', 'auth-user-15', 5, 'Giannis es el MVP', 'Increíbles zapatillas. El confort es excepcional y el rendimiento en la cancha es perfecto.', 'Confort excepcional, rendimiento perfecto', 'Ninguna', true, 19, true),
('550e8400-e29b-41d4-a716-446655440009', 'auth-user-16', 4, 'Muy buenas', 'Excelentes zapatillas para basketball. El soporte es muy bueno y son muy cómodas.', 'Excelente soporte, cómodas', 'Precio alto', true, 11, true),

-- Reviews para productos Nike SB
('550e8400-e29b-41d4-a716-446655440010', 'auth-user-17', 5, 'Perfectas para skate', 'Las Nike SB son las mejores para skate. El agarre es perfecto y la durabilidad es increíble.', 'Perfecto agarre, muy duraderas', 'Ninguna', true, 17, true),
('550e8400-e29b-41d4-a716-446655440010', 'auth-user-18', 4, 'Buenas para skate', 'Muy buenas zapatillas para skate. El agarre es excelente pero podrían ser más duraderas.', 'Excelente agarre', 'Podrían ser más duraderas', true, 8, true),
('550e8400-e29b-41d4-a716-446655440011', 'auth-user-19', 5, 'Increíbles', 'Las mejores zapatillas de skate que he tenido. El confort y la durabilidad son perfectos.', 'Confort perfecto, muy duraderas', 'Ninguna', true, 15, true),
('550e8400-e29b-41d4-a716-446655440011', 'auth-user-20', 3, 'Regulares', 'Son buenas zapatillas pero no extraordinarias. El precio es algo alto para la calidad.', 'Buen diseño', 'Precio alto para la calidad', false, 5, false);

-- Actualizar el contador de helpful_count para algunas reviews
UPDATE reviews SET helpful_count = 25 WHERE id = 1;
UPDATE reviews SET helpful_count = 22 WHERE id = 5;
UPDATE reviews SET helpful_count = 20 WHERE id = 7;
UPDATE reviews SET helpful_count = 18 WHERE id = 11;
UPDATE reviews SET helpful_count = 16 WHERE id = 13;
UPDATE reviews SET helpful_count = 14 WHERE id = 15; 