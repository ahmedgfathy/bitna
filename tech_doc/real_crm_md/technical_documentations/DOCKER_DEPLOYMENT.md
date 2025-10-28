# 🐋 Docker Deployment Guide - Real Estate CRM

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [System Requirements](#system-requirements)
3. [Production Deployment](#production-deployment)
4. [Configuration](#configuration)
5. [Scaling & Performance](#scaling--performance)
6. [Troubleshooting](#troubleshooting)
7. [Publishing to Docker Hub](#publishing-to-docker-hub)

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/ahmedgfathy/real_crm.git
cd real_crm
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.docker .env

# Edit configuration
nano .env
```

### 3. Deploy with One Command
```bash
./deploy.sh
```

That's it! Your CRM will be running at `http://localhost`

## 💻 System Requirements

### Minimum Hardware
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **Network**: 1Gbps

### Recommended Hardware
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 50GB SSD
- **Network**: 1Gbps

### Software Requirements
- Docker Engine 20.10+
- Docker Compose 2.0+
- Linux/Windows/macOS

## 🏢 Production Deployment

### 1. Server Setup
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose-plugin git -y
sudo systemctl enable docker
sudo usermod -aG docker $USER

# CentOS/RHEL
sudo dnf install docker docker-compose git -y
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 3. Production Configuration
```bash
# Production environment
cat > .env << EOF
COMPANY_ID=yourcompany
COMPANY_NAME=Your Company Name
COMPANY_DOMAIN=yourdomain.com
NGINX_PORT=80:80,443:443
DB_PASSWORD=your_super_secure_password_here
SECRET_KEY=your-50-character-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
EOF
```

### 4. Deploy
```bash
./deploy.sh
```

## ⚙️ Configuration

### Environment Variables

#### Required
```bash
COMPANY_ID=unique_company_identifier
COMPANY_NAME=Your Company Name
DB_PASSWORD=secure_database_password
SECRET_KEY=django_secret_key_50_chars
```

#### Optional
```bash
# Domain & SSL
COMPANY_DOMAIN=yourdomain.com
NGINX_PORT=80

# Database
DB_NAME=glomart_crm
DB_USER=crm_user
DB_ROOT_PASSWORD=root_password

# Localization
LANGUAGE_CODE=ar
TIMEZONE=Africa/Cairo
DEFAULT_CURRENCY=EGP

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app_specific_password

# Development
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,localhost
```

### Docker Services

#### 🌐 Web Application (Django + Gunicorn)
- **Port**: 8000 (internal)
- **Workers**: 4 with Gevent
- **Health Check**: HTTP GET /
- **Volumes**: Static files, media, logs

#### 🗄️ Database (MariaDB 10.11)
- **Port**: 3306 (internal)
- **Storage**: Persistent volume
- **Health Check**: MySQL ping
- **Backup**: Automated daily

#### 🚀 Cache (Redis 7)
- **Port**: 6379 (internal)
- **Memory**: 256MB with LRU eviction
- **Persistence**: AOF enabled

#### 🔀 Load Balancer (Nginx)
- **Port**: 80/443 (external)
- **Features**: SSL, compression, caching
- **Static Files**: Direct serving

## 📈 Scaling & Performance

### Horizontal Scaling
```yaml
# docker-compose.override.yml
version: '3.8'
services:
  web:
    deploy:
      replicas: 3
    environment:
      - GUNICORN_WORKERS=2
```

### Performance Optimization
```bash
# Increase worker processes
docker-compose exec web sh -c "
  export GUNICORN_WORKERS=8
  export GUNICORN_THREADS=4
  supervisorctl restart gunicorn
"
```

### Database Optimization
```sql
-- MariaDB optimization
SET GLOBAL innodb_buffer_pool_size = 2G;
SET GLOBAL query_cache_size = 256M;
SET GLOBAL max_connections = 200;
```

## 🔍 Troubleshooting

### Service Health Check
```bash
# Check all services
docker-compose ps

# Check specific service logs
docker-compose logs -f web
docker-compose logs -f db
docker-compose logs -f redis
docker-compose logs -f nginx
```

### Common Issues

#### Database Connection Failed
```bash
# Check database health
docker-compose exec db mysql -u root -p -e "SELECT 1;"

# Reset database
docker-compose down -v
docker-compose up -d
```

#### Static Files Not Loading
```bash
# Collect static files
docker-compose exec web python manage.py collectstatic --noinput

# Check nginx configuration
docker-compose exec nginx nginx -t
```

#### Memory Issues
```bash
# Check resource usage
docker stats

# Increase memory limit
echo 'COMPOSE_DOCKER_CLI_BUILD=1' >> .env
echo 'DOCKER_BUILDKIT=1' >> .env
```

### Backup & Restore
```bash
# Backup database
docker-compose exec db mysqldump -u root -p glomart_crm > backup.sql

# Backup media files
docker-compose exec web tar -czf /tmp/media_backup.tar.gz /app/media
docker cp $(docker-compose ps -q web):/tmp/media_backup.tar.gz ./

# Restore database
cat backup.sql | docker-compose exec -T db mysql -u root -p glomart_crm
```

## 📦 Publishing to Docker Hub

### 1. Build Production Image
```bash
# Build optimized image
docker build -t ahmedgfathy/real-estate-crm:latest .
docker build -t ahmedgfathy/real-estate-crm:v1.0.0 .
```

### 2. Test Image
```bash
# Test image locally
docker run -d \
  --name crm-test \
  -p 8000:8000 \
  -e SECRET_KEY=test-key \
  -e DEBUG=True \
  ahmedgfathy/real-estate-crm:latest

# Verify
curl http://localhost:8000
```

### 3. Push to Registry
```bash
# Login to Docker Hub
docker login

# Push images
docker push ahmedgfathy/real-estate-crm:latest
docker push ahmedgfathy/real-estate-crm:v1.0.0
```

### 4. Create Public Repository
```bash
# Create docker-compose for public use
cat > docker-compose.public.yml << EOF
version: '3.8'
services:
  db:
    image: mariadb:10.11
    environment:
      MYSQL_DATABASE: \${DB_NAME:-glomart_crm}
      MYSQL_USER: \${DB_USER:-crm_user}
      MYSQL_PASSWORD: \${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped

  web:
    image: ahmedgfathy/real-estate-crm:latest
    environment:
      - DB_HOST=db
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=\${SECRET_KEY}
      - DEBUG=\${DEBUG:-False}
      - ALLOWED_HOSTS=\${ALLOWED_HOSTS}
    volumes:
      - static_files:/app/staticfiles
      - media_files:/app/media
    depends_on:
      - db
      - redis
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - static_files:/app/staticfiles:ro
      - media_files:/app/media:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - web
    restart: unless-stopped

volumes:
  db_data:
  redis_data:
  static_files:
  media_files:
EOF
```

## 🌟 Features for Company Deployment

### Multi-Tenant Support
- Isolated data per company using `COMPANY_ID`
- Separate volumes and networks
- Custom branding per tenant

### Enterprise Features
- **SSO Integration**: LDAP/Active Directory support
- **Audit Logging**: Complete action tracking
- **Advanced Security**: WAF, rate limiting, IP whitelisting
- **Monitoring**: Prometheus + Grafana integration
- **Backup**: Automated backup to S3/Azure
- **Scaling**: Kubernetes deployment ready

### Industry Customization
- **Real Estate**: Property management, lead tracking
- **Construction**: Project management, material tracking
- **Property Management**: Tenant management, maintenance
- **Sales**: Lead conversion, pipeline management

## 📞 Support

### Documentation
- **GitHub**: https://github.com/ahmedgfathy/real_crm
- **Wiki**: Detailed configuration guides
- **Issues**: Bug reports and feature requests

### Professional Services
- Custom deployment assistance
- Enterprise feature development
- Training and consultation
- 24/7 support packages

---

**Ready to deploy your Real Estate CRM? Start with `./deploy.sh`!** 🚀