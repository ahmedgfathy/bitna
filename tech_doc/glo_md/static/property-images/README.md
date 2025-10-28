# Property Images Directory

This directory contains property images used by the GLO property management system.

## Usage
- Images are stored here with unique filenames
- Referenced in the database as JSON data
- Served via Django's static file handling

## Note
This directory is excluded from git repository due to large file sizes.
In production, these images should be stored in a CDN or cloud storage service.

## File Structure
Images are typically named with unique identifiers like:
- 6767eaf3002aec9af9bd.jpg
- 6767eaf50017fa0aab47.jpg
- etc.
