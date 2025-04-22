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
  "roleId",
  "createdAt",
  "updatedAt"
)
SELECT 
  * 
FROM (VALUES
  (
    -- Username cifrado: 'superadmin'
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
    -- Username cifrado: 'auditor1'
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
    -- Username cifrado: 'registrador1'
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

-- Permisos base del sistema
INSERT INTO "Permissions" (name, description, "createdAt", "updatedAt") 
VALUES 
  -- Permisos de usuarios
  ('user_create', 'Crear nuevos usuarios', NOW(), NOW()),
  ('user_read', 'Ver listado de usuarios', NOW(), NOW()),
  ('user_update', 'Modificar usuarios', NOW(), NOW()),
  ('user_delete', 'Eliminar usuarios', NOW(), NOW()),
  -- Permisos de roles
  ('role_create', 'Crear nuevos roles', NOW(), NOW()),
  ('role_read', 'Ver listado de roles', NOW(), NOW()),
  ('role_update', 'Modificar roles', NOW(), NOW()),
  ('role_delete', 'Eliminar roles', NOW(), NOW()),
  -- Permisos de permisos
  ('permission_create', 'Crear nuevos permisos', NOW(), NOW()),
  ('permission_read', 'Ver listado de permisos', NOW(), NOW()),
  ('permission_update', 'Modificar permisos', NOW(), NOW()),
  ('permission_delete', 'Eliminar permisos', NOW(), NOW()),
  -- Permisos de productos
  ('product_create', 'Crear nuevos productos', NOW(), NOW()),
  ('product_read', 'Ver listado de productos', NOW(), NOW()),
  ('product_update', 'Modificar productos', NOW(), NOW()),
  ('product_delete', 'Eliminar productos', NOW(), NOW())

ON CONFLICT (name) DO NOTHING;

-- Asignación de permisos a roles
INSERT INTO "RolePermissions" ("roleId", "permissionId", "createdAt", "updatedAt")
VALUES
  -- SuperAdmin (todos los permisos)
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'user_create'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'user_read'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'user_update'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'user_delete'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'role_create'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'role_read'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'role_update'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'role_delete'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'SuperAdmin'),
    (SELECT id FROM "Permissions" WHERE name = 'product_read'),
    NOW(),
    NOW()
  ) ,
  -- Auditor
  (
    (SELECT id FROM "Roles" WHERE name = 'Auditor'),
    (SELECT id FROM "Permissions" WHERE name = 'user_read'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'Auditor'),
    (SELECT id FROM "Permissions" WHERE name = 'product_read'),
    NOW(),
    NOW()
  ),
  -- Registrador
  (
    (SELECT id FROM "Roles" WHERE name = 'Registrador'),
    (SELECT id FROM "Permissions" WHERE name = 'product_create'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'Registrador'),
    (SELECT id FROM "Permissions" WHERE name = 'product_read'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'Registrador'),
    (SELECT id FROM "Permissions" WHERE name = 'product_update'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'Registrador'),
    (SELECT id FROM "Permissions" WHERE name = 'product_delete'),
    NOW(),
    NOW()
  ),
  (
    (SELECT id FROM "Roles" WHERE name = 'Registrador'),
    (SELECT id FROM "Permissions" WHERE name = 'user_read'),
    NOW(),
    NOW()
  )
  
ON CONFLICT DO NOTHING;