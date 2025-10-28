# Contributing to Contaboo CRM

Thank you for considering contributing to Contaboo CRM! This document outlines the process for contributing to this project.

## 🤝 How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide detailed information** including:
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Environment details (OS, browser, Node.js version)
   - Screenshots if applicable

### Suggesting Features

1. **Create an issue** with the "enhancement" label
2. **Describe the feature** in detail
3. **Explain the use case** and benefits
4. **Consider the implementation** complexity

### Code Contributions

#### Prerequisites

- Node.js 18+ installed
- Git knowledge
- TypeScript familiarity
- Next.js understanding

#### Development Setup

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/contaboo.git
cd contaboo
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp .env.example .env
# Edit .env with your database settings
```

4. **Set up database**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. **Start development server**
```bash
npm run dev
```

#### Making Changes

1. **Create a new branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make your changes**
   - Follow the existing code style
   - Add TypeScript types for new code
   - Update tests if applicable
   - Update documentation if needed

3. **Test your changes**
```bash
npm run type-check
npm run test:api
```

4. **Commit your changes**
```bash
git add .
git commit -m "feat: add amazing new feature"
# or
git commit -m "fix: resolve authentication issue"
```

5. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description
   - Include screenshots for UI changes

## 📝 Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React/Next.js
- Use functional components with hooks
- Follow Next.js App Router conventions
- Implement proper error boundaries
- Use server components when possible

### Database
- Use Prisma for all database operations
- Create proper migrations for schema changes
- Follow naming conventions for tables and fields
- Add proper indexes for performance

### API Routes
- Implement proper error handling
- Use Zod for request validation
- Follow REST conventions
- Add proper authentication checks

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic HTML elements

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main application
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── forms/            # Form components
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication config
│   ├── database.ts       # Database utilities
│   └── permissions.ts    # RBAC definitions
└── types/                # TypeScript type definitions
```

## ✅ Pull Request Guidelines

### Before Submitting
- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] Documentation is updated
- [ ] Commit messages are clear

### PR Description Should Include
- **Summary** of changes made
- **Motivation** for the changes
- **Testing** steps performed
- **Screenshots** for UI changes
- **Breaking changes** if any

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in development environment
4. **Approval** and merge

## 🐛 Debugging Tips

### Common Issues
- **Database connection**: Check DATABASE_URL in .env
- **Authentication**: Verify NEXTAUTH_SECRET and NEXTAUTH_URL
- **TypeScript errors**: Run `npm run type-check`
- **Build issues**: Clear cache with `npm run clean`

### Development Tools
- **Prisma Studio**: `npm run db:studio`
- **API Testing**: Use the test scripts in `/scripts`
- **Database Reset**: `npm run db:reset` (caution: deletes data)

## 🎯 Areas for Contribution

### High Priority
- [ ] Mobile responsive improvements
- [ ] Performance optimizations
- [ ] Accessibility enhancements
- [ ] Test coverage expansion

### Feature Requests
- [ ] Email notifications
- [ ] File upload system
- [ ] Advanced reporting
- [ ] Integration with external APIs
- [ ] Mobile app

### Documentation
- [ ] API documentation
- [ ] Deployment guides
- [ ] Video tutorials
- [ ] Translation support

## 📞 Getting Help

- **GitHub Discussions**: Ask questions and discuss ideas
- **Issues**: Report bugs and request features
- **Email**: contact@contaboo-crm.com for private inquiries

## 🙏 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Given contributor badge
- Invited to our Discord community (coming soon)

---

**Thank you for contributing to Contaboo CRM!** 🚀
