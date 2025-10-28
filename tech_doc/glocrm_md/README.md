# GloCRM - WhatsApp Chat Management System

A comprehensive WhatsApp chat management system with advanced phone extraction, Arabic text support, and full CRUD operations.

## Features

### 📱 **Advanced Phone Extraction (63.3% Coverage)**
- Extracts phone numbers from message content (59.1% success rate)
- Extracts phone numbers from sender names (7.8% additional coverage)
- Supports international formats including Egyptian mobile numbers
- Visual distinction between extracted vs. detected phones

### 🎨 **Enhanced UI Design**
- Modern Bootstrap 5 interface with improved statistics
- Comprehensive message type breakdown (apartment, land, etc.)
- Arabic RTL support with proper text rendering
- Interactive pagination and filtering
- Responsive design for mobile and desktop

### 💬 **Complete Modal Message System**
- Click any message row to open detailed view
- Left/Right arrow navigation between messages
- Keyboard shortcuts (←/→, Esc)
- Proper Arabic text rendering with connected letters

### 🔧 **Full CRUD Operations**
- **View**: Detailed message display with phone extraction
- **Copy**: Copy message content to clipboard
- **Edit**: In-place message editing with API integration
- **Delete**: Secure deletion with confirmation dialogs

### 🌐 **Arabic Language Support**
- Complete Arabic interface
- Proper RTL text direction
- Font ligatures for connected Arabic letters
- Unicode text handling throughout

## Technology Stack

- **Backend**: Python Flask with SQLite database
- **Frontend**: Bootstrap 5, JavaScript, HTML/CSS
- **Features**: RESTful API, Modal system, Phone extraction engine
- **Language Support**: Arabic RTL with proper Unicode rendering

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/glocrm.git
cd glocrm
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install flask
```

4. Run the application:
```bash
python app.py
```

5. Open your browser to `http://127.0.0.1:5000`

## Usage

### Browse Messages
Navigate through paginated chat data with filtering and sorting options.

### View Message Details
Click any message row to open the modal viewer with:
- Complete message content with Arabic text support
- Sender information including mobile numbers
- Categorized phone numbers (sender vs extracted)
- Navigation between messages

### Manage Messages
- **Copy**: Click "نسخ" to copy message content
- **Edit**: Click "تعديل" to modify message text
- **Delete**: Click "حذف" to remove messages (with confirmation)
- **View**: Click "عرض التفاصيل" for detailed information

### Phone Number Categories
- **Orange badges** (📱): Sender mobile numbers
- **Blue badges** (📞): Extracted from message content
- **Green badges**: Other detected phone numbers

## Project Structure

```
glocrm/
├── app.py                 # Flask application with API endpoints
├── chat_parser.py         # WhatsApp chat parsing with phone extraction
├── templates/
│   ├── base.html         # Base template with Arabic CSS
│   └── index.html        # Main interface with modal system
├── source/               # Chat source files
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## API Endpoints

- `GET /` - Main chat viewer interface
- `GET /statistics` - Chat statistics and analytics
- `GET /api/message/<id>` - Get specific message details
- `PUT /api/message/<id>` - Update message content
- `DELETE /api/message/<id>` - Delete message

## Performance Metrics

- **Phone Extraction**: 63.3% total coverage
- **Database**: SQLite with optimized queries
- **UI**: Responsive Bootstrap 5 with Arabic optimization
- **Navigation**: Smooth modal system with keyboard support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Author

Developed for comprehensive WhatsApp chat management with Arabic language support.