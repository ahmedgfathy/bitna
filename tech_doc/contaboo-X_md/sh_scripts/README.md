# Shell Scripts

This folder contains all the shell scripts used to set up the Appwrite database schema for the Contaboo Real Estate CRM system.

## Scripts Overview

### Database Setup Scripts
- `add_attributes.sh` - Adds core attributes to collections
- `create_indexes.sh` - Creates database indexes for performance optimization

### Collection Attribute Scripts
- `properties_attributes.sh` - Sets up property-related attributes
- `locations_features_attributes.sh` - Configures location and feature attributes
- `features_junctions_attributes.sh` - Sets up feature junction table attributes
- `financial_status_attributes.sh` - Configures financial and status attributes
- `media_crm_attributes.sh` - Sets up media and CRM tracking attributes
- `user_management_attributes.sh` - Configures user management attributes
- `audit_attributes.sh` - Sets up audit logging attributes

## Usage

These scripts were used to initialize the Appwrite database schema. They should be run in the following order:

1. First, run the main attributes script:
   ```bash
   ./add_attributes.sh
   ```

2. Then run the specific collection scripts:
   ```bash
   ./properties_attributes.sh
   ./locations_features_attributes.sh
   ./features_junctions_attributes.sh
   ./financial_status_attributes.sh
   ./media_crm_attributes.sh
   ./user_management_attributes.sh
   ./audit_attributes.sh
   ```

3. Finally, create the indexes:
   ```bash
   ./create_indexes.sh
   ```

## Note

These scripts have already been executed to set up the production database. They are kept here for reference and potential future database migrations or redeployments.
