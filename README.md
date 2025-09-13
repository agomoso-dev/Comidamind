# Comidamind - Django + React + PostgreSQL + Docker
## Clone repository
```commandline
git clone https://github.com/<your_user>/ComidaMind.git

cd ComidaMind

## Copy .env.local to .env
```commandline
cp .env.local .env
```
## Deploy

```commandline
docker-compose up -d --build
```
## Start Docker containers
```commandline
docker-compose up -d
```


## TODO
seguridad:
- CORS
- CSRF TOKEN

mensajes de error mas explicativos