-- Active: 1745082471040@@127.0.0.1@5432@shieldedInventory@public
-- Crear roles si no existen
INSERT INTO "Roles" (name, "createdAt", "updatedAt") 
VALUES 
  ('SuperAdmin', NOW(), NOW()),
  ('Auditor', NOW(), NOW()),
  ('Registrador', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Crear usuarios (contraseñas hasheadas con bcrypt)
INSERT INTO "Users" (
  username,
  name,
  identification,
  password,
  "RoleId",
  "createdAt",
  "updatedAt"
)
SELECT 
  * 
FROM (VALUES
  (
    '$2b$10$JedF2F83KwX/TzsmKx88h.5TSxMkdrxFON1pxEykfaKPlSd4547qC',
    'Administrador Principal',
    'ADM-001',
    -- Contraseña: SuperAdmin123
    '$2b$10$QdH2VDjbxiBtcZWEeWLT/upTHaIqYAbGtac/lj.0cNBwBclOj0Ll6',
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    NOW(),
    NOW()
  ),
  (
    '$2b$10$i37hdMrJP6GjD42wnM56vuwjg7l0GoAXhLKTpo1wrG4Wmt1.s2V3iy',
    'Juan Pérez',
    'AUD-001',
    -- Contraseña: AuditorSecure456
    '$2b$10$hGQRX700QsPB2jnPKGp7B.QZNj0gD4dkD6Sv0yBNw8Z3HNPykvBS2',
    (SELECT id FROM "Roles" WHERE name = 'Auditor'),
    NOW(),
    NOW()
  ),
  (
    '$2b$10$2KL8GzCp1uFaq2qI.Bdc3uFpRw94pz6RflCNcU9cVth33vxkqAISy',
    'María García',
    'REG-001',
    -- Contraseña: Registrador789
    '$2b$10$fTTjpufjskBAWYijKzDB0eLsakQOMW92CrUIKNV2zcX5X19IcaY/i',
    (SELECT id FROM "Roles" WHERE name = 'Registrador'),
    NOW(),
    NOW()
  )
) AS data(
  username,
  name,
  identification,
  password,
  "RoleId",
  "createdAt",
  "updatedAt"
)
WHERE NOT EXISTS (
  SELECT 1 
  FROM "Users" 
  WHERE identification = data.identification
);