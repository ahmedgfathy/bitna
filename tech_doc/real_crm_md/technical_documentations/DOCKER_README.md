# 🐳 EGAR CRM - Docker Development Environment

## Quick Start

### 1. Prerequisites
- Docker Desktop installed and running
- At least 4GB of free RAM
- At least 10GB of free disk space

### 2. Start the Environment

```bash
# Make scripts executable
chmod +x docker-setup.sh docker-stop.sh

# Start the Docker environment
./docker-setup.sh
```

This will:
- ✅ Build Docker images
- ✅ Start MariaDB database
- ✅ Start Redis cache
- ✅ Start Django web application
- ✅ Start Nginx reverse proxy
- ✅ Run database migrations
- ✅ Create superuser (admin/admin123)
- ✅ Collect static files
- ✅ Initialize company settings

### 3. Access the Application

- **Web Application:** http://localhost:8080
- **Admin Panel:** http://localhost:8080/admin

**Default Login:**
- Username: `admin`
- Password: `admin123`

## Docker Commands

### Service Management

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f web
docker-compose logs -f db
docker-compose logs -f redis
docker-compose logs -f nginx

# Stop services (containers remain)
docker-compose stop

# Start stopped services
docker-compose start

# Restart services
docker-compose restart

# Stop and remove containers
docker-compose down

# Stop and remove everything including volumes (⚠️  DATA LOSS!)
docker-compose down -v
```

### Django Management

```bash
# Django shell
docker-compose exec web python manage.py shell

# Create migrations
docker-compose exec web python manage.py makemigrations

# Run migrations
docker-compose exec web python manage.py migrate

# Collect static files
docker-compose exec web python manage.py collectstatic --noinput

# Create superuser
docker-compose exec web python manage.py createsuperuser

# Access web container bash
docker-compose exec web bash
```

### Database Management

```bash
# Access MariaDB shell
docker-compose exec db mysql -u egar_user -p egar_crm_db
# Password: egar_secure_password_2025

# Backup database
docker-compose exec db mysqldump -u egar_user -p egar_crm_db > backup.sql

# Restore database
docker-compose exec -T db mysql -u egar_user -p egar_crm_db < backup.sql

# Access database as root
docker-compose exec db mysql -u root -p
# Password: egar_root_password_2025
```

### Redis Management

```bash
# Access Redis CLI
docker-compose exec redis redis-cli

# Clear Redis cache
docker-compose exec redis redis-cli FLUSHALL

# Check Redis info
docker-compose exec redis redis-cli INFO
```

## Project Structure

```
real_crm/
├── docker-compose.yml         # Docker services configuration
├── Dockerfile                 # Django app Docker image
├── docker-setup.sh           # Setup script
├── docker-stop.sh            # Stop script
├── .env.docker               # Environment variables
├── .dockerignore             # Files to exclude from build
├── nginx/
│   ├── Dockerfile            # Nginx Docker image
│   └── nginx.conf            # Nginx configuration
└── real_estate_crm/
    └── settings_docker.py    # Docker-specific Django settings
```

## Environment Variables

Edit `.env.docker` to customize:

```bash
# Company Configuration
COMPANY_ID=egar_crm
COMPANY_NAME=EGAR
COMPANY_DOMAIN=localhost

# Database
DB_NAME=egar_crm_db
DB_USER=egar_user
DB_PASSWORD=egar_secure_password_2025

# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Localization
LANGUAGE_CODE=ar
TIMEZONE=Africa/Cairo
DEFAULT_CURRENCY=EGP
```

## Volumes

Data is persisted in Docker volumes:

- `egar_crm_mariadb_data` - Database files
- `egar_crm_redis_data` - Redis cache
- `egar_crm_static` - Static files (CSS, JS)
- `egar_crm_media` - Media files (uploads, images)
- `egar_crm_logs` - Application logs

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, edit `.env.docker`:

```bash
NGINX_PORT=8081  # Or any other available port
```

Then restart:

```bash
docker-compose down
docker-compose up -d
```

### Database Connection Issues

Check if database is healthy:

```bash
docker-compose ps
docker-compose logs db
```

Wait for database to be ready:

```bash
docker-compose exec db mysqladmin ping -h localhost -u root -p
```

### Clear Everything and Start Fresh

```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Start fresh
./docker-setup.sh
```

### View Container Resource Usage

```bash
docker stats
```

### Access Container Shell

```bash
# Web container
docker-compose exec web bash

# Database container
docker-compose exec db bash

# Redis container
docker-compose exec redis sh

# Nginx container
docker-compose exec nginx sh
```

## Production Deployment

**⚠️  Important:** This Docker setup is for **development only**.

For production:
1. Change all passwords in `.env.docker`
2. Set `DEBUG=False`
3. Use proper `SECRET_KEY`
4. Configure SSL/HTTPS
5. Use production-grade web server settings
6. Set up proper backup strategy
7. Configure monitoring and logging

## Security Notes

- Default credentials are for development only
- Change all passwords before production use
- Never commit `.env` files with real credentials
- Use Docker secrets in production
- Keep Docker images updated

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Verify services: `docker-compose ps`
- Check health: `docker-compose ps` (look for "healthy" status)

## License

EGAR CRM © 2025
