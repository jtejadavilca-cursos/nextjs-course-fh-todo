# Development

Pasos para levantar la app en desarrollo

1. Levantar la BD

```bash
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar SEED para crear la base de datos local

```bash
http://localhost:3000/api/seed
```

# Prisma commands:

```bash
# Inicializa la configuración de prisma
npx prisma init

# crea los archivos necesarios para sincronizar con la estructura en BD
npx prisma migrate dev

# Genera las tablas según la estructura creada en el archivo schema.prisma
npx prisma generate
```
