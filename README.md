# 🎬 Catálogo de Películas del Archivo Histórico de Colima

📌 **Descripción:**
Este proyecto es una plataforma de administración y consulta de películas mexicanas catalogadas por décadas desde 1930. Desarrollado como parte del servicio social, tiene como objetivo digitalizar y organizar la información cinematográfica del Archivo Histórico del Estado de Colima.

## 🔹 Funciones principales
- 📂 **Administración de películas**: Registro y gestión de títulos, imágenes, géneros, directores, productoras y más.
- 🔍 **Exploración de catálogos**: Búsqueda y filtrado por década, género y otros criterios.
- 🖼 **Visor de imágenes**: Almacenamiento y visualización de imágenes de películas y documentos históricos.
- 👥 **Gestión de usuarios**: Control de acceso y permisos para administradores y usuarios.
- 📊 **Dashboard**: Visualización de estadísticas y reportes sobre el catálogo.
- 🌍 **Parte pública**: Información sobre el Archivo Histórico, décadas destacadas y películas relevantes.

## ⚙️ Tecnologías utilizadas
- 🖥 **Frontend & Backend**: [Next.js](https://nextjs.org/) (con React y TypeScript)
- 📂 **ORM**: [Prisma](https://www.prisma.io/)
- 🗄 **Base de datos**: [PostgreSQL](https://www.postgresql.org/)

## 🚀 Instalación y uso
1. Clona el repositorio:
  ```bash
    git clone https://github.com/Chucky22Mendoza/SIDF.git
  ```

2. Instalalas dependencias:
  ```bash
    cd tu-repositorio
    npm install
  ```

3. Configura las variables de entorno:
  ```env
    DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_db
    SECRET_JWT_KEY=12345678
  ```

4. Ejecuta las migraciones de la base de datos:
  ```bash
    npx prisma migrate dev --name init
  ```

5. Inicia el servidor de desarrollo:
  ```bash
    npm run dev
  ```

## 📩 Contacto
Si tienes dudas o sugerencias, ¡no dudes en contribuir o contactarme!
