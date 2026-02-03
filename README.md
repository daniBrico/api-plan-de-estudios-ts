# API - Plan de Estudios

API REST para la aplicación web de Plan de Estudios. Permite la gestión de carreras y la autenticación de usuarios (registro, login y verificación por correo electrónico). Desarrollada con Node.js y TypeScript, siguiendo una arquitectura MVC y un enfoque modular orientado a la escalabilidad y el mantenimiento.

Actualmente la API se encuentra en producción utilizando el servicio de Render para dar respuesta a las peticiones del [frontend](https://github.com/daniBrico/plan-estudios-web-ts).

## Tecnologías

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose

## Seguridad y autenticación

- JWT (JSON Web Tokens)
- Rate limiting (express-rate-limit)
- Validación de datos con Zod

## Servicios externos

Brevo (envío de emails para verificación de cuenta):

- El envío de emails se implementó mediante un patrón _Provider_, lo que permite desacoplar la lógica de la aplicación del servicio de mensajería concreto (Brevo, Resend, etc.).
  Esto facilita el reemplazo o la incorporación de nuevos proveedores sin modificar la lógica de negocio.

## Arquitectura

- Patrón MVC
- Estructura modular basada en responsabilidades
- Middlewares reutilizables

### Estructura de carpetas

<pre>
src/
├── config/        # Configuración de servicios externos y variables de entorno
├── constants/     # Constantes globales
├── controllers/   # Controladores HTTP
├── emails/        # Plantillas y lógica de emails
├── errors/        # Errores personalizados
├── middlewares/   # Auth, rate limit, validaciones y manejo de errores
├── models/        # Modelos y esquemas de Mongoose
├── routes/        # Definición de rutas
├── schemas/       # Schemas de validación (Zod)
├── scripts/       # Scripts para poblar la base de datos
├── services/      # Lógica de negocio y servicios externos
├── test/          # Tests
├── types/         # Tipos globales de TypeScript
├── utils/         # Utilidades compartidas
</pre>

## Funcionalidades

- Registro de usuarios con validación de datos
- Login de usuarios mediante JWT
- Verificación de cuenta por correo electrónico
- Protección de rutas mediante middlewares de autenticación
- Rate limiting para prevenir abuso de la API
- Gestión de carreras y planes de estudio
- Manejo centralizado de errores

## Endpoints principales

### Autenticación

- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/verify/token/:token
- POST /auth/verify/email

### Carreras

- GET /career/:id
- GET /career/names

### Ejemplo de request

POST /auth/register

```json
{
  "name": "username",
  "lastName": "lastname",
  "email": "user@example.com",
  "password": "********"
}
```

## Variables de entorno

Ver [.env.example](./.env.example)

## Instalación y ejecución del proyecto

Instalar las dependencias:

- `npm install`

Poblar la base de datos:

- `npm run setSubjects`
- `npm run setSubjectsCorrelatives`
- `npm run setCareers`

Ejecución en desarrollo:

- `npm run dev`

Build:

- `npm run build`
- `npm start`

## Decisiones técnicas

- Se utilizó Zod para validar y tipar los datos de entrada, garantizando consistencia entre request y lógica de negocio.
- JWT fue implementado para mantener la API stateless.
- Se incorporó rate limiting para mejorar la seguridad y prevenir ataques de fuerza bruta.
- La verificación de cuenta por correo electrónico se implementó mediante Brevo para asegurar la validez de los usuarios registrados.

## Estado del proyecto

Proyecto en desarrollo activo. La API se encuentra desplegada y en uso por el frontend del proyecto.
