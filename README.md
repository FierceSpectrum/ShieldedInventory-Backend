# Shield Inventory - Backend Seguro con Node.js, Express y PostgreSQL

Shield Inventory es un sistema backend diseñado con foco en **seguridad**, **organización modular** y **escalabilidad**. Implementa una API RESTful protegida contra ataques comunes como XSS, CSRF, SQL Injection y fuerza bruta. Ideal para proyectos que requieren autenticación con roles y permisos, protección de sesiones y un manejo robusto de productos e inventario.

---

## Objetivo

Construir una API backend segura, organizada y fácilmente ampliable que cumpla con los siguientes requisitos:

- Protección ante vulnerabilidades web comunes.
- Autenticación con JWT y manejo de sesiones por inactividad.
- Control de acceso por roles y permisos.
- Gestión de usuarios y productos.
- Despliegue mediante contenedores Docker con PostgreSQL.

---

## Tecnologías y Herramientas

| Herramienta / Paquete      | Propósito                                                                                       |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **Node.js / Express**     | Servidor backend y enrutamiento.                                                                 |
| **PostgreSQL**            | Base de datos relacional.                                                                        |
| **Sequelize**             | ORM para trabajar con PostgreSQL y evitar SQL Injection.                                         |
| **JWT (`jsonwebtoken`)**  | Autenticación basada en tokens.                                                                  |
| **bcryptjs**              | Encriptación de contraseñas.                                                                     |
| **dotenv**                | Manejo de variables de entorno sensibles.                                                        |
| **helmet**                | Agrega cabeceras HTTP de seguridad para prevenir XSS, clickjacking, etc.                        |
| **cors**                  | Permite solicitudes seguras desde diferentes orígenes.                                           |
| **express-rate-limit**    | Previene ataques de fuerza bruta limitando la cantidad de solicitudes.                          |
| **cookie-parser**         | Lee cookies enviadas por el cliente.                                                             |
| **express-session**       | Manejo de sesiones persistentes.                                                                 |
| **connect-pg-simple**     | Almacena sesiones en PostgreSQL.                                                                 |
| **express-validator**     | Valida y sanitiza entradas del usuario.                                                          |
| **Docker / Docker Compose** | Contenerización de la app y base de datos, ideal para despliegue y desarrollo consistente.   |

---

## Estructura del Proyecto

```bash
shield-inventory/
├── src/
│   ├── config/            # Configuración general (DB, variables de entorno)
│   ├── controllers/       # Lógica de negocio por entidad (usuarios, productos, etc.)
│   ├── middlewares/       # Autenticación, manejo de errores, permisos, etc.
│   ├── models/            # Definición de modelos Sequelize (User, Role, Product...)
│   ├── routes/            # Endpoints agrupados por entidad
│   ├── services/          # Funciones de negocio reutilizables
│   ├── utils/             # Funciones auxiliares (formato, manejo de tokens...)
│   └── app.js             # Inicialización principal del servidor Express
├── .env                   # Variables sensibles (secretos, claves, conexión DB)
├── Dockerfile             # Imagen de la app backend
├── docker-compose.yml     # Contenedor para backend + PostgreSQL
├── package.json           # Dependencias y scripts
└── README.md              # Documentación base del proyecto
```

---

## Seguridad Implementada

- **Helmet** para proteger cabeceras HTTP contra XSS, sniffing, clickjacking, etc.
- **Rate Limiting** con `express-rate-limit` para prevenir ataques de fuerza bruta.
- **CORS** correctamente configurado para autorizar solicitudes seguras.
- **ORM Sequelize** evita SQL injection al trabajar con queries parametrizados.
- **express-validator** sanitiza y valida entradas del usuario.
- **JWT** y sesiones para control de autenticación.
- **bcryptjs** para hash seguro de contraseñas.
- **Manejo de sesiones por inactividad**: expiran automáticamente tras X minutos.
- **Roles y Permisos** implementados para control de acceso.

---

## Variables de Entorno Recomendadas (`.env`)

```env
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=shield_inventory
JWT_SECRET=clave_super_secreta
SESSION_SECRET=otra_clave
SESSION_TIMEOUT_MINUTES=5
```

---

## Instalación y Ejecución (Modo Docker)

```bash
# Paso 1: Clona el proyecto
git clone https://github.com/tuusuario/shield-inventory.git
cd shield-inventory

# Paso 2: Configura el archivo .env (ver ejemplo arriba)

# Paso 3: Construye e inicia los contenedores
docker-compose up --build
```

La API estará corriendo en: **[http://localhost:3000](http://localhost:3000)**

---

## Entidades del Proyecto

### Usuarios
- username
- password (cifrada)
- rol
- última fecha y hora de inicio de sesión

### Permite:
- Registro
- Inicio de sesión
- CRUD de usuarios (solo ciertos roles)
- Listado con filtros

### Roles
- SuperAdmin
- Auditor
- Registrador

### Permisos
- Crear
- Editar
- Borrar
- Ver Reportes

### Productos
- Código alfanumérico
- Nombre
- Descripción
- Cantidad
- Precio

---

## Requisitos Funcionales y de Seguridad

- UTN-01: Aplicación Web con base de datos relacional.
- UTN-02: Contraseñas cifradas en base de datos.
- UTN-03: CRUD de productos.
- UTN-04: CRUD de usuarios, listado de usuarios con información.
- UTN-05: Sistema de permisos (crear, editar, borrar, ver).
- UTN-06: Sistema de roles (SuperAdmin, Auditor, Registrador).

---

## Próximos Pasos

- Implementar pruebas de seguridad automatizadas.
- Agregar bitácora de auditoría.
- Documentar endpoints con Swagger.
