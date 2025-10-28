# PyCRM - Python Desktop Real Estate Application

## Description
A desktop real estate CRM application built with Python and Tkinter, featuring a modern GUI and MariaDB database integration.

## Features
- User authentication system
- Modern dashboard interface
- MariaDB database connectivity
- Real estate property management
- Customer relationship management

## Requirements
- Python 3.8+
- MariaDB Server
- See requirements.txt for Python packages

## Setup
1. Create and activate virtual environment
2. Install requirements: `pip install -r requirements.txt`
3. Configure database settings in config/database.ini
4. Run the application: `python main.py`

## Database Setup
- Server: localhost
- Username: root
- Password: zerocall
- Database: pycrm

## Project Structure
```
pycrm/
├── main.py              # Application entry point
├── src/
│   ├── gui/            # GUI components
│   ├── database/       # Database modules
│   └── utils/          # Utility functions
├── config/             # Configuration files
└── assets/             # Images and resources
```