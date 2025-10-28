# 🤝 Contributing to Real Estate CRM

Thank you for your interest in contributing to our Real Estate CRM project! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on what's best for the community
- ✅ Show empathy towards others
- ❌ No harassment, trolling, or discriminatory language
- ❌ No personal or political attacks

## 🚀 Getting Started

### Prerequisites

- Python 3.11+ 
- MariaDB/MySQL
- Git
- Virtual environment tool (venv/conda)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/real_crm.git
   cd real_crm
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements-local.txt
   pip install -r requirements-mcp.txt
   ```

4. **Configure database**
   ```bash
   # Copy example settings
   cp real_estate_crm/settings_local.example.py real_estate_crm/settings_local.py
   
   # Update database credentials in settings_local.py
   # Run migrations
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Workflow Steps

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow coding standards
   - Add tests for new features

3. **Test your changes**
   ```bash
   python manage.py test
   python manage.py check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## 📝 Coding Standards

### Python Style Guide

We follow [PEP 8](https://pep8.org/) with some modifications:

- **Line length**: 120 characters max
- **Indentation**: 4 spaces (no tabs)
- **Imports**: Group by standard library, third-party, local
- **Quotes**: Single quotes for strings, double for docstrings

### Code Formatting

We use **Black** and **isort** for automatic formatting:

```bash
# Format code
black .
isort .

# Check formatting
black --check .
isort --check-only .
```

### Naming Conventions

- **Variables/Functions**: `snake_case`
- **Classes**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Private methods**: `_leading_underscore`
- **Django models**: Singular names (e.g., `Lead`, not `Leads`)

### Example

```python
from django.db import models
from django.utils.translation import gettext_lazy as _


class Lead(models.Model):
    """
    Represents a potential real estate client.
    """
    
    # Constants
    STATUS_NEW = 'new'
    STATUS_CONTACTED = 'contacted'
    
    STATUS_CHOICES = [
        (STATUS_NEW, _('New')),
        (STATUS_CONTACTED, _('Contacted')),
    ]
    
    # Fields
    first_name = models.CharField(_('First Name'), max_length=100)
    status = models.CharField(
        _('Status'),
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_NEW
    )
    
    class Meta:
        verbose_name = _('Lead')
        verbose_name_plural = _('Leads')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def _calculate_score(self):
        """Private method to calculate lead score."""
        # Implementation
        pass
```

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
# Simple commit
git commit -m "feat: add property search filter"

# With scope
git commit -m "fix(leads): resolve duplicate entry error"

# With body
git commit -m "feat(rbac): implement role-based permissions

- Add Permission model
- Implement role checking decorator
- Update admin interface

Closes #123"
```

## 🔍 Pull Request Process

### Before Submitting

- ✅ Code follows style guidelines
- ✅ Self-review completed
- ✅ Comments added where needed
- ✅ Documentation updated
- ✅ No new warnings
- ✅ Tests added/updated
- ✅ All tests pass

### PR Template Checklist

1. Fill in all sections of the PR template
2. Link related issues
3. Add screenshots for UI changes
4. Mark breaking changes
5. Request review from maintainers

### Review Process

1. **Automated Checks** - CI/CD must pass
2. **Code Review** - At least 1 approval required
3. **Testing** - Reviewer tests changes locally
4. **Merge** - Squash and merge to main

## 🧪 Testing

### Running Tests

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test leads

# Run with coverage
pytest --cov=. --cov-report=html
```

### Writing Tests

```python
from django.test import TestCase
from leads.models import Lead


class LeadModelTest(TestCase):
    """Test cases for Lead model."""
    
    def setUp(self):
        """Set up test data."""
        self.lead = Lead.objects.create(
            first_name='Ahmed',
            last_name='Gomaa',
            email='ahmed@example.com'
        )
    
    def test_lead_creation(self):
        """Test lead is created correctly."""
        self.assertEqual(self.lead.first_name, 'Ahmed')
        self.assertTrue(isinstance(self.lead, Lead))
    
    def test_lead_str(self):
        """Test string representation."""
        self.assertEqual(str(self.lead), 'Ahmed Gomaa')
```

## 📚 Documentation

### Docstrings

Use Google-style docstrings:

```python
def create_lead(first_name, last_name, email, phone=None):
    """
    Create a new lead in the CRM system.
    
    Args:
        first_name (str): Lead's first name
        last_name (str): Lead's last name
        email (str): Lead's email address
        phone (str, optional): Lead's phone number
    
    Returns:
        Lead: The created lead instance
    
    Raises:
        ValidationError: If email is invalid
    
    Examples:
        >>> lead = create_lead('Ahmed', 'Gomaa', 'ahmed@example.com')
        >>> lead.full_name
        'Ahmed Gomaa'
    """
    # Implementation
    pass
```

### Updating Documentation

When making changes, update:

- `README.md` - For user-facing changes
- `technical_documentations/` - For technical details
- Inline comments - For complex logic
- Docstrings - For all public functions/classes

## ❓ Questions?

- 💬 Open a [Discussion](https://github.com/ahmedgfathy/real_crm/discussions)
- 🐛 Report bugs via [Issues](https://github.com/ahmedgfathy/real_crm/issues)
- 📧 Email: ahmed@example.com

## 🙏 Thank You!

Your contributions make this project better for everyone!

---

**Happy Coding! 🚀**
