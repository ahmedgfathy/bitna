# How to Run the Appwrite to MariaDB Migration

The migration is not a background service; it's a script that needs to be manually executed. Follow these steps:

## Prerequisites

1. Make sure MariaDB is running and accessible with the credentials in your `.env` file
2. Install the required dependencies:

```bash
npm install node-fetch@2 dotenv
```

## Running the Migration

1. Make sure your `.env` file is correctly set up with all Appwrite credentials
2. Run the migration script:

```bash
npm run migrate-appwrite
```

3. The script will:
   - Create directories for storing images
   - Update your Prisma schema if needed
   - Fetch Projects, Properties, and Leads from Appwrite
   - Download all associated images
   - Insert the data into your local MariaDB

4. Check the console output for any errors
5. Verify the data was imported by:
   - Checking your database tables
   - Checking the `public/images` directory for downloaded images

## Troubleshooting

If you encounter errors:

1. **Authentication errors**: Make sure your Appwrite credentials in `.env` are correct
2. **Database errors**: Verify MariaDB is running and accessible
3. **Schema errors**: Try running `npx prisma db push` manually
4. **Image download errors**: Check your internet connection and Appwrite storage permissions

## Note

The migration is one-way only (from Appwrite to MariaDB). It doesn't sync data back to Appwrite.
