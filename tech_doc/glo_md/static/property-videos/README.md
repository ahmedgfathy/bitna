# Property Videos Directory

This directory contains property videos used by the GLO property management system.

## Usage
- Videos are stored here with unique filenames
- Referenced in the database as JSON data
- Served via Django's static file handling

## Note
This directory is excluded from git repository due to large file sizes.
In production, these videos should be stored in a CDN or cloud storage service.

## File Structure
Videos are typically named with unique identifiers and various formats:
- .mp4
- .avi
- .mov
- etc.
