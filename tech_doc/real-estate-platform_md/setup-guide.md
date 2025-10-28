# Setup Guide: Real Estate Platform

This guide will walk you through setting up the Real Estate Platform project on your local machine.

## Prerequisites

*   **Node.js:** Version 18.x or later recommended (Specify your project's compatible versions). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **yarn:** npm is included with Node.js. Yarn can be installed from [yarnpkg.com](https://yarnpkg.com/).
*   **MariaDB:** A running instance of MariaDB. You can install it locally or use a cloud-based service. Ensure you have credentials (username, password, database name).
*   **Git:** For cloning the repository.

## 1. Clone the Repository

Clone the repository to your local machine using Git:
```bash
git clone https://github.com/your-repo/real-estate-platform.git
```

## 2. Install Dependencies

Navigate to the project directory and install the required npm packages:

```bash
cd real-estate-platform
npm install
# or
# yarn install
```

## 3. Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:
```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_PROJECT_ID="your_project_id"
NEXT_PUBLIC_PROPERTIES_BUCKET="your_bucket_id"
APPWRITE_API_KEY="your_api_key"
```

**Note:** Ensure your MariaDB server and Appwrite instance are running and accessible.

## 4. Prisma Setup

Prisma is used as the ORM for database interaction.

### a. Generate Prisma Client

After installing dependencies, generate the Prisma Client:
```bash
npx prisma generate
```
This command reads your `prisma/schema.prisma` file and generates the Prisma Client library tailored to your schema.

### b. Database Migration

Run the following command to apply database migrations:
```bash
npx prisma migrate dev
```
This will create the necessary tables in your database based on the `prisma/schema.prisma` file.

### c. (Optional) Seed the Database

If you have a seed script defined in `prisma/seed.ts` (or `.js`), you can populate your database with initial data:
```bash
npx prisma db seed
```
Make sure your `package.json` has a prisma seed script configured if you are using `npx prisma db seed` without a custom script path, e.g.:
```json
// package.json
// ...
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
// ...
```

## 5. Run the Application

The application includes new modules: "Opportunities," "Contacts," and "Documents." Ensure the database has sample data for these modules for testing.

To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 6. Building for Production (Optional)

If you want to build the application for production:
```bash
npm run build
```
And then to start the production server:
```bash
npm start
```

## Troubleshooting

*   **Prisma Client not found:** Ensure you've run `npx prisma generate`.
*   **Database connection issues:** Double-check your `DATABASE_URL` in the `.env` file. Verify that your MariaDB server is running and accessible. Check firewall rules if MariaDB is on a remote server.
*   **Migration errors:** Check the error messages. You might need to resolve conflicts in your schema or reset your database (use `npx prisma migrate reset` with caution, as it deletes data).

---

This setup should get you up and running. If you encounter any issues, please check the project's issue tracker or consult the documentation for Next.js, Prisma, and MariaDB.