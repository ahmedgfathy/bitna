# GLO Project - Deployment Notes

## Media Files Management

### Current Situation
- **Total Media Files**: 12,754 files
- **Property Images**: 1.6GB (static/property-images/)
- **Property Videos**: 769MB (static/property-videos/)
- **Total Media Size**: ~2.4GB

### Git Configuration
The `.gitignore` file has been configured to exclude:
- All property images and videos (`static/property-images/`, `static/property-videos/`)
- Collected static files (`staticfiles/`)
- User uploaded media (`media/`)
- All image, video, and audio file types in static directories

### Deployment Strategy

#### For Production Deployment:
1. **Media Files**: Upload media files separately to your production server
2. **Static Files**: Run `python manage.py collectstatic` on production
3. **Media Storage**: Consider using cloud storage (AWS S3, Cloudinary, etc.) for media files

#### Commands for Production:
```bash
# Collect static files (excludes media)
python manage.py collectstatic --noinput

# Upload media files separately using rsync or cloud storage
rsync -av static/property-images/ user@server:/path/to/media/property-images/
rsync -av static/property-videos/ user@server:/path/to/media/property-videos/
```

#### Alternative: Cloud Storage
Consider moving large media files to:
- **AWS S3** with Django Storages
- **Cloudinary** for image optimization
- **DigitalOcean Spaces**
- **Google Cloud Storage**

### GitHub Repository
- Media files are properly ignored and won't be pushed to GitHub
- Repository size remains manageable
- Only code, templates, and configuration files are version controlled

### Next Steps
1. Commit the updated `.gitignore`
2. Push code changes to GitHub
3. Set up media file deployment strategy
4. Configure production static/media file serving
