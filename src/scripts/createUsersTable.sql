-- Actualizar tabla de usuarios existente para autenticación
-- Agregar campos faltantes si no existen
DO $$
BEGIN
    -- Agregar campo nombres si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'nombres'
    ) THEN
        ALTER TABLE public.users ADD COLUMN nombres TEXT;
    END IF;

    -- Agregar campo apellidos si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'apellidos'
    ) THEN
        ALTER TABLE public.users ADD COLUMN apellidos TEXT;
    END IF;

    -- Agregar campo correo si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'correo'
    ) THEN
        ALTER TABLE public.users ADD COLUMN correo TEXT UNIQUE;
    END IF;
END $$;

-- Habilitar RLS (Row Level Security) si no está habilitado
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (solo crear si no existen)
DO $$
BEGIN
    -- Usuarios pueden ver su propio perfil
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON public.users
            FOR SELECT USING (auth.uid() = id);
    END IF;

    -- Usuarios pueden actualizar su propio perfil
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON public.users
            FOR UPDATE USING (auth.uid() = id);
    END IF;

    -- Permitir inserción durante el registro
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Allow insert during registration'
    ) THEN
        CREATE POLICY "Allow insert during registration" ON public.users
            FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;

    -- Admins pueden ver todos los perfiles (usando is_admin en lugar de role)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Admins can view all profiles'
    ) THEN
        CREATE POLICY "Admins can view all profiles" ON public.users
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM public.users 
                    WHERE id = auth.uid() AND is_admin = true
                )
            );
    END IF;
END $$;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at (solo crear si no existe)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_users_updated_at'
    ) THEN
        CREATE TRIGGER update_users_updated_at 
            BEFORE UPDATE ON public.users 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Insertar usuario admin por defecto (opcional)
-- INSERT INTO public.users (id, nombres, apellidos, correo, is_admin)
-- VALUES (
--     '00000000-0000-0000-0000-000000000000', -- Reemplazar con UUID real
--     'Admin',
--     'User',
--     'admin@sneakysneakers.com',
--     true
-- ) ON CONFLICT (id) DO NOTHING; 