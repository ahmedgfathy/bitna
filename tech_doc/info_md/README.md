# ClientHub CRM System 🌟

<div align="center">

![Logo](https://raw.githubusercontent.com/yourusername/info/main/public/logo.png)

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive Client Relationship Management system built with Next.js and MySQL.

[Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

## ✨ Features

- 📱 Responsive modern UI with Shadcn components
- 📊 Client information management
- 🔍 Advanced search and filtering
- 📁 CSV import/export functionality
- 🎯 Type, Location, and State management
- 🔐 Data validation and error handling
- 📝 Notes and contact management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL Server
- pnpm package manager

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/info.git
cd info
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations
```bash
# Create database and tables
mysql -u YOUR_USER -p YOUR_DATABASE < db/schema.sql
```

5. Start the development server
```bash
pnpm dev
```

## 🏗️ Built With

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [MySQL](https://www.mysql.com/) - Database
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components

## 📖 Project Structure
