# 🏢 Contaboo CRM - Multi-Tenant Real Estate Platform

<div align="center">

![Contaboo CRM Logo](https://via.placeholder.com/200x80/2563eb/ffffff?text=CONTABOO+CRM)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ahmedgfathy/contaboo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/ahmedgfathy/contaboo)](https://github.com/ahmedgfathy/contaboo/issues)
[![GitHub stars](https://img.shields.io/github/stars/ahmedgfathy/contaboo)](https://github.com/ahmedgfathy/contaboo/stargazers)

**A professional, scalable multi-tenant CRM platform built specifically for real estate companies. Features advanced team management, property sharing, and comprehensive role-based access control.**

[🚀 Live Demo](https://contaboo-crm.vercel.app) • [📖 Full Documentation](./documentation/) • [🐛 Report Bug](https://github.com/ahmedgfathy/contaboo/issues) • [✨ Request Feature](https://github.com/ahmedgfathy/contaboo/issues)

</div>

---

## 📸 **Application Screenshots**

<div align="center">

### 🏠 **Dashboard Overview**
*Complete real estate business overview with analytics, performance metrics, and team insights*

![Dashboard Overview](./assets/dashboard-main.png)

### 🔐 **User Interface**
*Clean, modern interface with comprehensive navigation and user management*

![Dashboard Interface](./assets/dashboard-login.png)

</div>

---

## 🌟 **Core Features**

<table>
<tr>
<td width="50%">

### 🏠 **Property Management**
- 🏘️ **Property Listings** - Comprehensive property database
- 📊 **Market Analytics** - Real-time market insights  
- 🤝 **Team Sharing** - Collaborative property management
- 🔍 **Advanced Search** - Smart filtering and discovery
- 📸 **Media Gallery** - High-quality property photos
- 📍 **Location Mapping** - Interactive property maps

</td>
<td width="50%">

### 👥 **Team Collaboration**
- 🏢 **Multi-Tenant Architecture** - Isolated company environments
- 👤 **User Management** - Comprehensive user profiles
- 🔐 **Role-Based Access** - Granular permission control
- 📧 **Team Invitations** - Seamless user onboarding
- 💬 **Internal Communication** - Team messaging system
- 📈 **Performance Tracking** - Agent productivity metrics

</td>
</tr>
</table>

---

## 🛠️ **Technology Stack**

<table>
<tr>
<th width="25%">🎨 Frontend</th>
<th width="25%">⚙️ Backend</th>
<th width="25%">🗄️ Database</th>
<th width="25%">🔧 DevOps</th>
</tr>
<tr>
<td>

- **⚛️ React 19** - Latest React features
- **🔷 Next.js 15** - App Router & Server Components  
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **🎯 Lucide Icons** - Beautiful icon library
- **📱 Responsive Design** - Mobile-first approach

</td>
<td>

- **🚀 Next.js API** - Serverless functions
- **🔒 NextAuth.js** - Secure authentication
- **🛡️ CASL** - Permission-based authorization
- **✅ Zod** - Runtime schema validation
- **📧 Email System** - Automated notifications

</td>
<td>

- **🐘 PostgreSQL** - Primary database
- **⚡ Prisma ORM** - Type-safe database access
- **🔄 Migration System** - Schema versioning
- **📊 Database Studio** - Visual data management
- **🔐 Row-Level Security** - Multi-tenant isolation

</td>
<td>

- **☁️ Vercel** - Deployment platform
- **⚡ GitHub Actions** - CI/CD pipeline
- **🔍 ESLint** - Code quality
- **🎯 Prettier** - Code formatting
- **🧪 Jest** - Testing framework

</td>
</tr>
</table>

---

## 🚀 **Quick Start Guide**

### **📋 Prerequisites**

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MySQL 8+** - [Download here](https://dev.mysql.com/downloads/mysql/) or use Docker
- **Git** - [Download here](https://git-scm.com/)

### **⚡ Automated Setup (Recommended)**

```bash
# 1️⃣ Clone the repository
git clone https://github.com/ahmedgfathy/contaboo.git
cd contaboo

# 2️⃣ Run the automated setup script
chmod +x scripts/setup-dev-environment.sh
./scripts/setup-dev-environment.sh

# 3️⃣ Start development server
npm run dev
```

### **🐳 Docker Setup (Alternative)**

If you prefer using Docker for the database:

```bash
# 1️⃣ Clone and setup
git clone https://github.com/ahmedgfathy/contaboo.git
cd contaboo

# 2️⃣ Run Docker setup
chmod +x scripts/setup-docker.sh
./scripts/setup-docker.sh

# 3️⃣ Start development server
npm run dev
```

### **🛠️ Manual Setup**

<details>
<summary>Click to expand manual setup steps</summary>

```bash
# 1️⃣ Clone and install
git clone https://github.com/ahmedgfathy/contaboo.git
cd contaboo
npm install

# 2️⃣ Environment configuration
cp .env.example .env
# Edit .env with your MySQL credentials:
# DATABASE_URL="mysql://username:password@localhost:3306/contaboo_crm"

# 3️⃣ Generate NextAuth secret
openssl rand -base64 32
# Add the generated secret to NEXTAUTH_SECRET in .env

# 4️⃣ Database setup
npx prisma generate
npx prisma db push
npm run db:seed

# 5️⃣ Create admin user
node -e "
import('bcrypt').then(bcrypt => {
  import('@prisma/client').then(({ PrismaClient }) => {
    const prisma = new PrismaClient();
    bcrypt.hash('admin123', 10).then(hash => {
      prisma.company.upsert({
        where: { name: 'Contaboo' },
        create: { name: 'Contaboo', isPlatformOwner: true },
        update: {}
      }).then(company => {
        prisma.user.create({
          data: {
            email: 'admin@contaboo.com',
            passwordHash: hash,
            fullName: 'Admin User',
            companyId: company.id
          }
        }).then(() => console.log('Admin user created')).finally(() => prisma.\$disconnect());
      });
    });
  });
});
"

# 6️⃣ Setup subscription plans
npx tsx scripts/create-real-estate-plans-clean.ts

# 7️⃣ Start development server
npm run dev
```

</details>

### **🌐 Access the Application**

- **🏠 Application**: http://localhost:3000
- **� Login Email**: `admin@contaboo.com`
- **🔑 Password**: `admin123` (change after first login)
- **🗄️ Database Studio**: `npx prisma studio`
- **📊 PhpMyAdmin** (Docker only): http://localhost:8080

### **✅ Verify Setup**

1. Navigate to http://localhost:3000
2. Login with the admin credentials
3. You should see the dashboard with sample data (see screenshots above)
4. Change the default password in settings

**Expected Result**: After successful login, you'll see the comprehensive dashboard shown in the screenshots above, with analytics cards, property insights, team performance metrics, and a clean navigation sidebar.

---

## 🔐 **Security Features**

### **🛡️ Multi-Layer Security**

- **NextAuth.js** - Industry standard authentication
- **CASL Framework** - Permission-based access control
- **JWT Tokens** - Stateless session management
- **Multi-Tenant** - Company data isolation
- **Role Hierarchy** - Flexible role system
- **Audit Logging** - Complete activity tracking

### **👥 Default User Roles**

| Role | Permissions | Description |
|------|-------------|-------------|
| **Super Admin** | System-wide access | Contaboo administrators only |
| **Company Owner** | Full company control | Complete company management |
| **Manager** | Team management | Supervise teams and properties |
| **Agent** | Property & leads | Handle properties and clients |
| **Viewer** | Read-only access | View company data only |

---

## 🚀 **Deployment**

### **☁️ Vercel Deployment (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ahmedgfathy/contaboo)

```bash
# One-click deployment
vercel --prod
```

### **🐳 Docker Deployment**

```bash
docker build -t contaboo-crm .
docker run -p 3000:3000 contaboo-crm
```

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **🎯 Ways to Contribute**

- 🐛 **Bug Reports** - Use issue templates with reproduction steps
- ✨ **Feature Requests** - Describe use cases and benefits
- 💻 **Code Contributions** - Fork, create branch, submit PR
- 📚 **Documentation** - Improve docs and add examples

---

## � **Complete Documentation**

For comprehensive documentation, guides, and technical references, visit our documentation folder:

### 📁 [Documentation Directory](./documentation/)

**Essential Documents:**
- 📋 [Comprehensive README](./documentation/README-COMPREHENSIVE.md) - Complete project guide
- 🗺️ [Project Roadmap](./documentation/ROADMAP.md) - Future plans and milestones  
- 🤝 [Contributing Guide](./documentation/CONTRIBUTING.md) - How to contribute
- 🔧 [Technical Documentation](./documentation/DOCUMENTATION.md) - API and architecture
- 🗄️ [Database Schema](./documentation/schema.sql) - Complete database structure
- 🔌 [MCP Setup Guide](./documentation/MCP-SETUP.md) - AI integration setup

**Implementation Guides:**
- ⚙️ [CRUD Implementation](./documentation/CRUD_IMPLEMENTATION_COMPLETE.md)
- 🏗️ [Implementation Details](./documentation/IMPLEMENTATION_DOCS.md)
- 👑 [Super Admin Setup](./documentation/SUPER_ADMIN_SETUP_COMPLETE.md)

---

## �📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author & Support**

<div align="center">

**Created with ❤️ by [Ahmed Goma](https://github.com/ahmedgfathy)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmedgfathy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ahmedgfathy)

### **💬 Get Support**

- 📖 [Documentation](https://github.com/ahmedgfathy/contaboo/wiki)
- 🐛 [Issue Tracker](https://github.com/ahmedgfathy/contaboo/issues)
- 💬 [Discussions](https://github.com/ahmedgfathy/contaboo/discussions)

### **⭐ Show Your Support**

If this project helped you, please consider giving it a ⭐ star on GitHub!

</div>

---

<div align="center">

**Built with Next.js 15 • TypeScript • Tailwind CSS • Prisma • PostgreSQL**

*Making real estate management simple, secure, and scalable* 🏠

</div>
