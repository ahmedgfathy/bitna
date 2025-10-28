# JSON Configuration Files

This folder contains JSON configuration files for the Appwrite backend setup.

## Files Overview

### `appwrite.json`
Main Appwrite project configuration file containing:
- Project settings
- Database configuration
- Collection definitions
- Function configurations (if any)

### `appwrite.config.json`
Appwrite CLI configuration file containing:
- Project connection settings
- Authentication tokens
- Deployment configurations

### `appwrite-schema.json`
Complete database schema export containing:
- All collection definitions
- Attribute configurations
- Index definitions
- Security rules

## Usage

These files are used for:
- **Deployment**: Deploying the database schema to new environments
- **Backup**: Maintaining a backup of the database structure
- **Version Control**: Tracking changes to the database schema
- **Migration**: Moving the schema between different Appwrite instances

## Commands

To use these configuration files:

```bash
# Deploy schema to Appwrite
appwrite deploy

# Pull latest schema
appwrite pull

# Push local changes
appwrite push
```

## Note

These files contain the complete configuration for the Contaboo Real Estate CRM database schema as implemented in Appwrite Cloud.
