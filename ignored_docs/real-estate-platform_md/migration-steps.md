# Migration from Appwrite to MariaDB Steps

Follow these steps to fix the errors and run the migration:

1. First, ensure you have all required dependencies:
   ```bash
   npm install dotenv node-fetch@2
   ```

2. Apply the Prisma schema changes by running:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. Run the migration:
   ```bash
   npm run migrate-appwrite
   ```

## Common Issues

1. If you see errors about missing fields in Prisma models:
   - Make sure you've run `npx prisma generate` after updating the schema
   - Ensure the fields in the migration script match the schema

2. If you see connection errors to Appwrite:
   - Verify your Appwrite credentials in the .env file
   - Check that Appwrite is accessible and the collections exist

3. For database access issues:
   - Verify MariaDB is running
   - Check your DATABASE_URL in the .env file is correct
