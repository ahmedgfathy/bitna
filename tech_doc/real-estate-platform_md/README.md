# Real Estate Platform

This is a real estate platform built with Next.js, TypeScript, and connected to a MariaDB database via Prisma. It integrates with a CRM to manage properties and client interactions.

<div align="center">

![Real Estate Platform](https://img.shields.io/badge/🏢_Real_Estate-Platform-blue)

A modern real estate listing and CRM platform built with Next.js 13+, Prisma, and MariaDB. Manage properties, leads, and projects with multi-language support.

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-007ACC?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?logo=prisma)](https://www.prisma.io/)
[![MariaDB](https://img.shields.io/badge/MariaDB-10.5+-003545?logo=mariadb)](https://mariadb.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

## Overview

A modern real estate platform designed to streamline property management and client interactions.

## ✨ Features

- 🏠 **Property Listings**
  - Advanced search and filtering
  - Image galleries
  - Detailed property information

- 🌐 **Multi-language Support**
  - English and Arabic interfaces
  - RTL support for Arabic

- 📊 **CRM Features**
  - Lead management
  - Property inventory tracking
  - Project management
  - User role management
  - **Opportunities Management**
  - **Contacts Management**
  - **Documents Management**

- 🔒 **Authentication & Authorization**
  - Role-based access control
  - Permission management
  - Secure authentication with NextAuth.js

- 📊 **Reports**
  - Generate sales and performance reports
  - Export reports as PDF or CSV
  - Visualize data with charts and graphs

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 8.0.0
MariaDB >= 10.5
```

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd real-estate-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. (Optional) Seed the database
```bash
npx prisma db seed
```

6. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
real-estate-platform/
├── src/
│   ├── app/                  # Next.js 13+ App Router
│   ├── components/           # React Components
│   ├── lib/                  # Utility functions
│   │   ├── auth.ts          # Authentication setup
│   │   ├── db.ts            # Database client
│   │   └── permissions.ts    # Permission helpers
│   └── translations/         # i18n files
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static files
└── scripts/                # Utility scripts
```

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 13+ (App Router)
  - React 18+
  - TailwindCSS
  - Headless UI

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - MariaDB
  - NextAuth.js
  - Appwrite (File Storage)

- **DevOps**
  - TypeScript
  - ESLint
  - Git

## 📸 Screenshots

<details>
<summary>View Screenshots</summary>

### Dashboard
[Screenshot placeholder]

### Property Management
[Screenshot placeholder]

### Lead Management
[Screenshot placeholder]

</details>

## API Endpoints

- **GET /api/areas**: Fetches a list of areas.
- **POST /api/users**: Creates a new user.
- **GET /api/roles**: Fetches available roles.
- **GET /api/reports**: Fetches a list of reports.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 🔗 Links

- [Documentation](docs/README.md)
- [Migration Guide](migration-instructions.md)
- [Setup Guide](setup-guide.md)

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your_username/your_repository](https://github.com/your_username/your_repository)

---
<div align="center">
Made with ❤️ by [Your Name/Company]
</div>
