# NEXXO - Plataforma de Marketing de Influencers

NEXXO es una agencia boutique de marketing enfocada en matching entre influencers locales y negocios que necesiten publicidad.

## Tech Stack

### Frontend
- **React 19** - Biblioteca UI
- **Vite 6** - Build tool
- **Tailwind CSS 4** - Estilos
- **React Router 7** - Enrutamiento
- **TanStack Query 5** - Estado del servidor
- **Motion (Framer Motion 12)** - Animaciones
- **React Hook Form** - Formularios
- **Zod** - Validación

### Backend
- **Node.js 22** - Runtime
- **Express 5** - Framework
- **Prisma 7** - ORM
- **PostgreSQL 17** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Hashing de contraseñas

## Getting Started

### Requisitos Previos
- Node.js 22+
- PostgreSQL 17+
- npm o pnpm

### Instalación

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npm run db:generate

# Push esquema a DB (desarrollo)
npm run db:push

# Iniciar desarrollo
npm run dev
```

### Variables de Entorno

Crear archivo `.env` en `/server`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexxo?schema=public"
JWT_SECRET="your-super-secret-key"
PORT=3001
NODE_ENV=development
```

## Estructura del Proyecto

```
nexxo-web/
├── client/           # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── public/
├── server/           # Backend Node
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── config/
│   └── prisma/
└── database/        # Scripts de DB
    └── seeds/
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia client + server |
| `npm run dev:client` | Solo frontend |
| `npm run dev:server` | Solo backend |
| `npm run build` | Build producción |
| `npm run db:push` | Sincroniza schema a DB |
| `npm run db:seed` | Ejecuta seeds |

## Licencia

Privado - NEXXO Agency
