<div align="center">

# 🚴 CRIT

### Plataforma de Gestión de Campeonatos de Ciclismo

**La solución completa para organizar, administrar y seguir competiciones ciclistas.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748.svg)](https://www.prisma.io/)

</div>

---

## ¿Qué es CRIT?

CRIT es una plataforma web diseñada para **organizadores de campeonatos de ciclismo** que necesitan una solución moderna, rápida y fácil de usar para gestionar sus competiciones.

Desde la inscripción de corredores hasta la generación automática de clasificaciones, CRIT maneja todo el ciclo de vida de un campeonato con un solo comando.

> **Ideal para:** Clubes ciclistas, organizadores de criteriums, series locales y campeonatos regionales.

---

## ✨ Características Principales

### 🏁 Gestión de Carreras
- Crear, editar y eliminar carreras
- Estados flexibles: Programada, Finalizada, Aplazada
- Historial completo de competiciones

### 📊 Sistema de Puntuación vía Excel
- Descarga de plantillas Excel personalizadas
- Carga masiva de resultados con validación estricta
- El Excel como fuente de verdad para cada carrera
- Soporte para puntos positivos, negativos y cero

### 🏆 Clasificación General en Tiempo Real
- Cálculo automático de posiciones
- Clasificación por corredor con puntos acumulados
- Cache inteligente para máximo rendimiento
- Filtrado por categoría y tipo de competencia

### 👥 Gestión de Corredores
- Perfiles detallados con datos personales
- Información de bicicleta (marca, cuadro, relación, peso)
- Números de dorsal únicos por competencia
- Registro con datos de emergencia y contacto

### 🔐 Autenticación Segura
- JWT con cookies HttpOnly
- Roles: Administrador y Usuario
- Control de acceso por endpoint
- Registro y login completo

### 📸 Almacenamiento de Imágenes
- MinIO (compatible S3) para fotos de perfil
- Upload directo desde la aplicación
- URLs públicas para imágenes

### 📱 Panel de Administración
- CRUD completo de carreras
- Gestión de inscripciones
- Descarga y carga de resultados vía Excel
- Control total del campeonato

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| **Frontend** | Next.js + React | 16.1 + 19.2 |
| **Estilos** | Tailwind CSS | 4.2 |
| **Estado** | Zustand | 5.0 |
| **Data Fetching** | SWR | 2.4 |
| **Tablas** | Tanstack Table | 8.21 |
| **Formularios** | React Hook Form | 7.75 |
| **Backend** | Express | 5.2 |
| **ORM** | Prisma | 7.8 |
| **Base de datos** | PostgreSQL | 16 |
| **Almacenamiento** | MinIO | Latest |
| **Auth** | JWT + bcrypt | - |
| **Validación** | Zod | 4.4 |
| **Idioma** | TypeScript | 5.9 |
| **Infra** | Docker Compose | - |

---

## 🚀 Quick Start

### Prerrequisitos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 10
- [Docker](https://www.docker.com/) (opcional pero recomendado)

### Instalación con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/DiegoGp227/crit.git
cd crit

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración

# 3. Levantar todos los servicios
docker compose up --build
```

**¡Listo!** La aplicación estará disponible en:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- MinIO Console: `http://localhost:9001`

### Instalación Manual

```bash
# 1. Clonar el repositorio
git clone https://github.com/DiegoGp227/crit.git
cd crit

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Iniciar PostgreSQL y MinIO
docker compose up -d postgres minio

# 4. Backend
cd back
pnpm install
pnpm run prisma:generate
pnpm run prisma:migrate:init
pnpm run dev

# 5. Frontend (en otra terminal)
cd front
pnpm install
pnpm run dev
```

---

## 📁 Estructura del Proyecto

```
crit/
├── back/                    # Backend API
│   ├── src/
│   │   ├── config/          # Variables de entorno
│   │   ├── db/              # Conexión a Prisma
│   │   ├── errors/          # Manejo de errores
│   │   ├── lib/             # Utilidades (MinIO, cache)
│   │   ├── middlewares/     # Auth, admin, errorHandler
│   │   ├── modules/         # Módulos de negocio
│   │   │   ├── auth/        # Autenticación
│   │   │   ├── classification/ # Clasificación general
│   │   │   ├── profile/     # Perfiles de corredores
│   │   │   ├── races/       # Gestión de carreras
│   │   │   ├── registration/ # Inscripciones
│   │   │   ├── results/     # Resultados y Excel
│   │   │   └── upload/      # Upload de imágenes
│   │   ├── routes/          # Definición de rutas
│   │   └── utils/           # Helpers
│   ├── prisma/
│   │   ├── schema.prisma    # Schema de base de datos
│   │   ├── seed.ts          # Datos iniciales
│   │   └── migrations/      # Migraciones
│   └── Dockerfile
├── front/                   # Frontend Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 16)
│   │   ├── components/      # Componentes React
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilidades
│   │   ├── provider/        # Context providers
│   │   ├── store/           # Estado global (Zustand)
│   │   └── types/           # Tipos TypeScript
│   └── Dockerfile
├── docker-compose.yml       # Orquestación de servicios
└── .env.example             # Plantilla de configuración
```

---

## 🔌 API Reference

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/signup` | Registrar usuario | ❌ |
| POST | `/api/login` | Iniciar sesión | ❌ |
| POST | `/api/logout` | Cerrar sesión | ❌ |

### Perfil

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/me` | Obtener perfil propio | ✅ |
| PATCH | `/api/me/profile` | Actualizar perfil | ✅ |
| GET | `/api/riders` | Listar corredores | ❌ |
| GET | `/api/riders/:id` | Ver perfil de corredor | ❌ |

### Inscripciones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/me/registration` | Inscribirse al campeonato | ✅ |
| GET | `/api/admin/registrations` | Ver inscripciones | 🔒 Admin |

### Carreras (Público)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/races` | Listar carreras | ❌ |
| GET | `/api/races/:id` | Detalle de carrera | ❌ |
| GET | `/api/races/:id/results` | Resultados de carrera | ❌ |
| GET | `/api/classification` | Clasificación general | ❌ |

### Carreras (Admin)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/races` | Listar carreras | 🔒 Admin |
| POST | `/api/admin/races` | Crear carrera | 🔒 Admin |
| PATCH | `/api/admin/races/:id` | Actualizar carrera | 🔒 Admin |
| DELETE | `/api/admin/races/:id` | Eliminar carrera | 🔒 Admin |
| GET | `/api/admin/races/:id/excel` | Descargar Excel | 🔒 Admin |
| POST | `/api/admin/races/:id/excel` | Subir resultados | 🔒 Admin |

---

## 🗄 Base de Datos

### Diagrama de Entidades

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│    User     │────▶│   Profile   │◀────│  Registration   │
│  (auth)     │ 1:1│  (corredor) │ 1:1│  (inscripción)  │
└─────────────┘     └─────────────┘     └─────────────────┘
                           │
                           │ 1:N
                           ▼
                    ┌─────────────┐
                    │   Result    │
                    │ (resultados)│
                    └─────────────┘
                           │
                           │ N:1
                           ▼
                    ┌─────────────┐
                    │  RaceDate   │
                    │  (carrera)  │
                    └─────────────┘
```

### Modelos Principales

- **User**: Usuarios del sistema con roles (ADMIN/USER)
- **Profile**: Perfiles de corredores con datos personales y de bicicleta
- **Registration**: Inscripciones al campeonato con número de dorsal
- **RaceDate**: Carreras con estado y fecha
- **Result**: Resultados por carrera con puntos y asistencia

---

## 🚢 Deployment

### Docker (Producción)

```bash
# Variables de entorno para producción
export API_URL=https://api.tudominio.com
export NEXT_PUBLIC_API_URL=https://tudominio.com
export MINIO_PUBLIC_URL=https://minio.tudominio.com

# Levantar en producción
docker compose -f docker-compose.yml up -d --build
```

### Raspberry Pi 5

CRIT está diseñado para funcionar eficientemente en hardware de bajo consumo:

```bash
# En tu Raspberry Pi
git clone https://github.com/DiegoGp227/crit.git
cd crit
cp .env.example .env
# Editar .env con tus configuraciones
docker compose up -d --build
```

**Requisitos mínimos:**
- Raspberry Pi 4/5 (2GB+ RAM recomendado)
- Docker y Docker Compose
- Conexión a internet (para imágenes)

---

## 📋 Roadmap

### ✅ Completado
- [x] Sistema de autenticación JWT
- [x] Gestión de perfiles de corredores
- [x] CRUD de carreras
- [x] Sistema de inscripciones
- [x] Upload y validación de Excel
- [x] Clasificación general en tiempo real
- [x] Almacenamiento de imágenes con MinIO
- [x] Panel de administración

### 🔜 Próximamente
- [ ] Notificaciones por email
- [ ] Exportación de clasificación a PDF
- [ ] App móvil companion
- [ ] Estadísticas avanzadas por corredor
- [ ] Sistema de comentarios y redes sociales
- [ ] Soporte para múltiples campeonatos
- [ ] Dashboard con métricas en tiempo real

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 📧 Contacto

**Diego** - [GitHub](https://github.com/DiegoGp227)

Project Link: [https://github.com/DiegoGp227/crit](https://github.com/DiegoGp227/crit)

---

<div align="center">

**¿Te gusta CRIT?** Dale una ⭐ en GitHub para apoyar el proyecto.

</div>
