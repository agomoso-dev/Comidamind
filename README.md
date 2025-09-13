
# 🍽️ Comidamind

Aplicación para automatizar la planificación semanal de dietas familiares,
construida con **Django + React + PostgreSQL + Docker**.
Genera dietas usando un LLM y muestra quécomer cada día de manera organizada.

---

## 🚀 Clonar el repositorio

```bash
git clone https://github.com/<your_user>/ComidaMind.git
cd ComidaMind
````

---

## ⚙️ Configuración

Copia el archivo de variables de entorno:

```bash
cp .env.local .env
```

Asegúrate de configurar las credenciales y parámetros necesarios en `.env`.

---

## 🐳 Despliegue con Docker

Construye y levanta los contenedores:

```bash
docker-compose up -d --build
```

Verifica que todos los servicios estén corriendo:

```bash
docker-compose ps
```

Para reiniciar los contenedores sin reconstruir:

```bash
docker-compose up -d
```

---

## ✅ Próximos pasos / TODO

### Seguridad

* Configurar **CORS** correctamente.
* Implementar **CSRF Tokens** en el backend.

---

## 📦 Tecnologías utilizadas

* **Backend:** Django (Python)
* **Frontend:** React
* **Base de datos:** PostgreSQL
* **Contenerización:** Docker + Docker Compose
* **IA:** LLM para generación automática de dietas

---

## ⚡ Instalación rápida

```bash
# Clonar repo
git clone https://github.com/<your_user>/ComidaMind.git
cd ComidaMind

# Configurar entorno
cp .env.local .env

# Levantar contenedores
docker-compose up -d --build
```

## 💡 Nota

Este proyecto está en desarrollo, ideal para pruebas y mejoras continuas. Cualquier contribución es bienvenida.


