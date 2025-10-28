# 🔒 EGAR CRM - Isolated Local Development

## Quick Start (NO Remote Connections)

This setup creates a **completely isolated** local development environment on your laptop:
- ✅ NO connection to production server (38.242.250.92)
- ✅ NO access to production database  
- ✅ NO remote SMTP servers
- ✅ Everything runs in Docker containers locally
- ✅ Safe to experiment without affecting production

### Start the Isolated Environment

```bash
./start-local-dev.sh
```

This will:
1. Build local Docker images
2. Start MariaDB database (local)
3. Start Redis cache (local)
4. Start Django web app (local)
5. Start Nginx proxy (local)
6. Create admin user
7. Initialize EGAR branding

### Access Your Local CRM

- **Application:** http://localhost:8080
- **Admin Panel:** http://localhost:8080/admin
- **Username:** admin
- **Password:** admin123

## What's Running Locally?

All services run in isolated Docker containers:

| Service | Container | Port | Purpose |
|---------|-----------|------|---------|
| Web App | egar_crm_local_web | 8000 | Django application |
| Database | egar_crm_local_db | 3306 | MariaDB (local data) |
| Cache | egar_crm_local_redis | 6379 | Redis cache |
| Proxy | egar_crm_local_nginx | 8080 | Nginx web server |

## Important: NO Remote Access

```
🚫 NO connection to: 38.242.250.92 (production)
🚫 NO connection to: arafa.contaboo.com
🚫 NO production database access
🚫 NO SMTP email servers
✅ ALL data stored locally
✅ ALL services run locally
```

## Commands

### Service Management

```bash
# Start environment
./start-local-dev.sh

# Stop services (keeps data)
docker-compose stop

# Start services again
docker-compose start

# Full shutdown (keeps data)
docker-compose down

# Full cleanup (⚠️  deletes all local data)
docker-compose down -v

# Health check
./docker-health.sh

# View logs
docker-compose logs -f
docker-compose logs -f web
docker-compose logs -f db
```

### Django Commands

```bash
# Django shell
docker-compose exec web python manage.py shell

# Create migrations
docker-compose exec web python manage.py makemigrations

# Run migrations  
docker-compose exec web python manage.py migrate

# Collect static
docker-compose exec web python manage.py collectstatic

# Create user
docker-compose exec web python manage.py createsuperuser

# Access container
docker-compose exec web bash
```

### Database Commands

```bash
# Access MySQL shell
docker-compose exec db mysql -u egar_local_user -p egar_crm_local_db
# Password: local_dev_password_123

# Backup local database
docker-compose exec db mysqldump -u egar_local_user -plocal_dev_password_123 egar_crm_local_db > backup.sql

# Restore database
docker-compose exec -T db mysql -u egar_local_user -plocal_dev_password_123 egar_crm_local_db < backup.sql
```

## Development Workflow

1. **Start Environment:** `./start-local-dev.sh`
2. **Make Code Changes:** Edit files in your editor
3. **Test Changes:** Django auto-reloads in dev mode
4. **View Logs:** `docker-compose logs -f web`
5. **Stop When Done:** `docker-compose stop`

## Data Persistence

Local data is stored in Docker volumes:
- `egar_crm_local_mariadb_data` - Database
- `egar_crm_local_redis_data` - Cache
- `egar_crm_local_static` - Static files
- `egar_crm_local_media` - Uploaded files
- `egar_crm_local_logs` - Application logs

Data persists between container restarts.

## Isolated from Production

This local environment is **completely separate** from production:

| Aspect | Local Dev | Production |
|--------|-----------|------------|
| Database | Docker MariaDB (local) | Remote MariaDB @ 38.242.250.92 |
| Domain | localhost:8080 | arafa.contaboo.com |
| Data | Local volumes | Remote server |
| Email | Console output | SMTP server |
| SSL | No HTTPS | Let's Encrypt SSL |
| Debug | Enabled | Disabled |

You can:
- ✅ Create/delete data safely
- ✅ Test new features
- ✅ Experiment with changes
- ✅ Break things without worry
- ✅ Reset environment anytime

## Troubleshooting

### Port 8080 Already in Use

Stop the conflicting service or change port in `.env.local`:
```bash
NGINX_PORT=8081
```

### Services Won't Start

```bash
# Check Docker
docker info

# View logs
docker-compose logs

# Full reset
docker-compose down -v
./start-local-dev.sh
```

### Database Issues

```bash
# Check database health
docker-compose exec db mysqladmin ping -u root -plocal_root_password_123

# View database logs
docker-compose logs db

# Reset database
docker-compose down -v
./start-local-dev.sh
```

## Environment Files

- `.env.local` - Local development configuration (active)
- `.env.docker` - Original Docker configuration (backup)
- `real_estate_crm/settings_local_isolated.py` - Isolated Django settings

## Security Notes

⚠️  **For Local Development Only**

- Default passwords are simple (admin123, local_dev_password_123)
- Debug mode is enabled
- No HTTPS/SSL
- Console email backend
- Permissive CORS settings

**NEVER** use these settings in production!

## Switching Back to Production

This local setup does NOT affect production. Your production server at `arafa.contaboo.com` continues running independently.

To deploy changes to production later, use the deployment scripts:
```bash
./scripts/2_deploy_to_server.sh
```

## Files and Scripts

- `start-local-dev.sh` - Start isolated local environment
- `docker-compose.yml` - Docker services configuration
- `Dockerfile` - Django app container
- `.env.local` - Local environment variables
- `docker-health.sh` - Health check script
- `docker-stop.sh` - Stop services

## Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Check health: `./docker-health.sh`
3. Check status: `docker-compose ps`
4. Full reset: `docker-compose down -v && ./start-local-dev.sh`

---

**🔒 COMPLETELY ISOLATED** | **💻 LAPTOP ONLY** | **🚫 NO REMOTE ACCESS**

EGAR CRM © 2025 - Local Development Environment
