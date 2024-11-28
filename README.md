# Development

Pasos para levantar la app en desarrollo

1. Levantar la BD

```bash
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar comando `npm install`
5. Ejecutar comando `npm run dev`
6. Ejecutar comandos de prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar SEED para crear la base de datos local entrando al link:

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

> Nota 1: \
> Si ya se tiene una base de datos y tablas en ella, se puede ejecutar el comando: \
> `npx prisma db pull` \
> Tal comando tomará la estructura de las tablas existentes y las creará en el archivo `schema.prisma`.

> Nota 2: \
> Para que prisma adicione las tablas existentes en los archivos de migración, se debe ejecutar también el comando: \
> `npx prisma migrate dev`.
