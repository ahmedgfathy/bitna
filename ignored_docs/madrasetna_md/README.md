<div align="center">
  <picture>
    <img src="https://raw.githubusercontent.com/yourusername/madrasetna/main/frontend/public/images/branding/logo-dark.png" alt="Madrasetna Logo" width="200" />
  </picture>

  <h1>🎓 Madrasetna</h1>
  <p>A Modern Online Learning Platform Connecting Students with Qualified Teachers</p>

  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org/)
</div>

## ✨ Features

- 🌐 Bilingual Support (English/Arabic)
- 👥 Multi-user Roles (Students/Teachers/Vendors/Couriers)
- 📚 School Supplies Marketplace
- 📅 Online Lesson Booking
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🌙 RTL Support

## 💫 Demo

<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/madrasetna/main/docs/demo/home-light.png" width="45%" alt="Home Page Light" />
  &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/yourusername/madrasetna/main/docs/demo/home-dark.png" width="45%" alt="Home Page Dark" />
</div>

<div align="center">
  <p><strong>Modern, Responsive Design with Dark Mode Support</strong></p>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/madrasetna/main/docs/demo/teacher-dashboard.png" width="90%" alt="Teacher Dashboard" />
</div>

<div align="center">
  <p><strong>Comprehensive Teacher Dashboard</strong></p>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/madrasetna/main/docs/demo/mobile-views.png" width="60%" alt="Mobile Views" />
</div>

<div align="center">
  <p><strong>Fully Responsive Mobile Experience</strong></p>
</div>

## 🏗 Project Structure

```bash
madrasetna/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/      # Next.js 13+ app directory
│   │   ├── components/
│   │   └── contexts/ # Global state management
│   └── public/       # Static assets
└── backend/          # Express.js API
    ├── src/
    │   ├── controllers/
    │   ├── models/   # Sequelize models
    │   └── routes/   # API endpoints
    └── config/       # Database configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MariaDB/MySQL
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/madrasetna.git
cd madrasetna
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Frontend
cp frontend/.env.local.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
# Update the database credentials in backend/.env
```

4. **Initialize the database**
```bash
cd backend
npm run db:init
```

5. **Start development servers**
```bash
# From root directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 🖥 Screenshots

<div align="center">
  <img src="frontend/public/images/screenshots/home.png" alt="Home Page" width="400"/>
  <img src="frontend/public/images/screenshots/dashboard.png" alt="Dashboard" width="400"/>
</div>

## 🛠 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- RTL Support

### Backend
- Express.js
- TypeScript
- MariaDB
- Sequelize ORM
- JWT Authentication

## 📱 Mobile Support

<div align="center">
  <img src="frontend/public/images/screenshots/mobile.png" alt="Mobile View" width="200"/>
</div>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Website: [madrasetna.com](https://madrasetna.com)
- Email: support@madrasetna.com
- Twitter: [@madrasetna](https://twitter.com/madrasetna)

<div align="center">
  <sub>Built with ❤️ by the Madrasetna Team</sub>
</div>
