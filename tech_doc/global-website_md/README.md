# Global Marketing Real Estate Platform

<div align="center">
  <img src="public/images/logo.png" alt="Global Marketing Real Estate" width="200">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC)](https://tailwindcss.com/)
  [![MariaDB](https://img.shields.io/badge/MariaDB-10.11-003545)](https://mariadb.org/)
  [![Production](https://img.shields.io/badge/Production-glomartrealestates.com-success)](https://www.glomartrealestates.com)
</div>

A modern, full-featured real estate platform built with Next.js, offering advanced property search, management, and user-friendly interface for property buyers, sellers, and renters in Egypt and globally.

## ✨ Features

### 🏠 Property Management
- **Advanced Search & Filtering**: Real-time database integration with location, price, type filters
- **Property Listings**: Comprehensive property details with image galleries
- **Interactive Maps**: Location-based property discovery
- **Compound Browsing**: Dedicated sections for residential compounds

### 🎯 User Experience
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Progressive Web App**: PWA support with offline capabilities
- **Multi-language Support**: English and Arabic language options
- **Google Roboto Typography**: Professional font implementation

### 📱 Pages & Sections
- **Home**: Hero section with video background, featured properties
- **Property Types**: Buy, Sell, Rent dedicated pages
- **About**: Company information and team details
- **Contact**: Contact forms and location information
- **Offers**: Special deals and promotions

### 🔧 Technical Features
- **Database Integration**: MariaDB with RESTful API endpoints
- **Server-Side Rendering**: Next.js App Router for optimal performance
- **Image Optimization**: Next.js Image component with lazy loading
- **SEO Optimized**: Meta tags and structured data
- **Mobile Responsive**: Fully responsive across all devices

## � Tech Stack

### Frontend
- **Framework**: Next.js 15.1.6 (App Router)
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.15
- **Icons**: React Icons (Feather, Material Design)
- **Components**: Custom UI components with shadcn/ui base
- **Fonts**: Google Roboto for optimal readability

### Backend & Database
- **Database**: MariaDB 10.11.13 for reliable data storage
- **API**: RESTful API endpoints with Next.js Route Handlers
- **Connection**: MySQL2 driver with connection pooling
- **File Storage**: Server-side storage for property images

### Development & Deployment
- **Package Manager**: PNPM for fast dependency management
- **Hosting**: Vercel for optimal Next.js performance
- **PWA**: Service Worker implementation
- **Build Tool**: Next.js built-in bundling and optimization

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.0.0 or higher)
- **PNPM** (recommended) or npm
- **MariaDB Server** (v10.11 or higher)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/global-website.git
cd global-website
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
# MariaDB Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="your_password"
DB_NAME=django_db_glomart_rs
DB_PORT=3306

# Additional Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. MariaDB Database Setup
1. Install MariaDB Server
2. Create the database:
   ```sql
   CREATE DATABASE django_db_glomart_rs;
   ```
3. Import the database schema (if provided)
4. Ensure user has proper permissions:
   ```sql
   GRANT ALL PRIVILEGES ON django_db_glomart_rs.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 5. Test Database Connection
```bash
# Test MariaDB connection
mysql -h localhost -u root -p django_db_glomart_rs -e "SELECT COUNT(*) FROM properties_property;"
```

### 6. Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Build & Deployment

### Production Build
```bash
pnpm build
pnpm start
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Manual deployment
npx vercel --prod
```

## 📁 Project Structure

```
global-website/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with fonts
│   ├── page.js                   # Landing page
│   ├── globals.css               # Global styles
│   ├── _components/              # Shared components
│   │   ├── Header.jsx            # Main navigation
│   │   ├── Footer.jsx            # Site footer
│   │   ├── SearchBar.jsx         # Search functionality
│   │   └── page_component/       # Page-specific components
│   ├── (pages)/                  # Page routes
│   │   ├── home/                 # Homepage
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── compound/             # Compound listings
│   │   ├── rent/                 # Rental properties
│   │   ├── sell/                 # Properties for sale
│   │   └── offers/               # Special offers
│   └── components/               # Reusable UI components
├── actions/                      # Server actions
│   ├── projectAction.js          # Project data fetching
│   ├── propertiesAction.js       # Property operations
│   └── crmActions.js             # CRM operations
├── lib/                          # Libraries and utilities
│   └── mcp/                      # MariaDB connection manager
├── components/ui/                # shadcn/ui components
├── lib/                          # Utility functions
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   ├── icons/                    # Icon assets
│   └── manifest.json             # PWA manifest
└── styles/                       # Additional styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10B981)
- **Secondary**: Blue gradients
- **Neutral**: Gray scale for text and backgrounds
- **Accent**: Gold for premium features

### Typography
- **Primary Font**: Google Roboto
- **Weights**: 300, 400, 500, 700, 900
- **Fallback**: System fonts (Inter, sans-serif)

### Components
- Consistent spacing using Tailwind CSS scale
- Responsive breakpoints: sm, md, lg, xl, 2xl
- Shadow system for depth and hierarchy
- Rounded corners for modern appearance

## 🔧 Configuration Files

### Next.js Configuration
- **next.config.js**: Basic Next.js setup
- **next.config.mjs**: ESM configuration with PWA
- **jsconfig.json**: Path aliases and compilation options

### Styling Configuration  
- **tailwind.config.js**: Custom colors, fonts, and utilities
- **postcss.config.mjs**: PostCSS plugins for Tailwind

### Component Library
- **components.json**: shadcn/ui configuration
- Custom component variants and styling

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images loaded on demand
- **Server-Side Rendering**: Improved SEO and initial load times
- **PWA Features**: Offline support and app-like experience
- **Font Optimization**: Google Fonts with display swap

## 🔒 Security Features

- **Environment Variables**: Sensitive data protection
- **Appwrite Security**: Built-in authentication and authorization
- **HTTPS Enforcement**: Secure data transmission
- **Input Validation**: Client and server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: [info@glomartrealestates.com](mailto:info@glomartrealestates.com)
- **Phone**: +20 10 1234 5678
- **Location**: New Cairo, Egypt

## 👨‍� Developer

**Designed and Developed by Ahmed Fathy**

Experienced Full-Stack Developer specializing in modern web technologies, user experience design, and scalable real estate platforms.

### Skills & Technologies
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Appwrite, Database Design
- **DevOps**: Vercel, CI/CD, Performance Optimization
- **Design**: UI/UX Design, Responsive Development

### Portfolio & Contact
- **GitHub**: [Ahmed Fathy's Profile](https://github.com/ahmed-fathy)
- **LinkedIn**: [Professional Profile](https://linkedin.com/in/ahmed-fathy)
- **Email**: [ahmedfathy@developer.com](mailto:ahmedfathy@developer.com)

---

<div align="center">
  <p>Built with ❤️ by Ahmed Fathy | © 2024 Global Marketing Real Estate</p>
  <p>Powered by Next.js • Styled with Tailwind CSS • Deployed on Vercel</p>
</div>

# ✅ CI/CD Pipeline Active - Auto-deploying to production
