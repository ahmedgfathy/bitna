# Contaboo Real Estate Market Analyzer

This project extracts messages from WhatsApp group exports and stores them in a SQLite database for easy querying and analysis.

## Features

- Parses WhatsApp exported .txt files
- Extracts sender names, phone numbers, timestamps, and message content
- Handles Arabic text and special characters
- Stores data in SQLite database with proper schema
- Filters out system messages (group creation, join notifications, etc.)
- Supports multi-line messages

## Files

### Core Scripts
- `main.py` - Main extraction script
- `web_app.py` - Flask web application
- `view_db.py` - Command-line database viewer utility
- `start_web.sh` - Web interface startup script

### Web Interface
- `templates/` - HTML templates for web interface
  - `base.html` - Base template with navigation
  - `index.html` - Dashboard page
  - `search.html` - Advanced search interface  
  - `stats.html` - Statistics and analytics page

### Data & Configuration
- `messages.db` - SQLite database (created after extraction)
- `requirements.txt` - Python dependencies
- `venv/` - Python virtual environment
- `debug.py` - Debug utilities for troubleshooting

## Database Schema

The `messages` table contains:
- `id` - Primary key
- `sender_name` - Name of the person who sent the message
- `phone_number` - Phone number (if available in sender field)
- `message_date` - Date and time of the message
- `message_content` - The actual message text
- `file_source` - Which export file the message came from

## Usage

### 1. Extract Messages (Command Line)
```bash
python3 main.py
```
This will process all .txt files in `/Users/ahmedgomaa/Downloads/group/` and save to `messages.db`

### 2. View Messages (Command Line)
```bash
python3 view_db.py          # View first 20 messages
python3 view_db.py 50       # View first 50 messages
```

### 3. Web Interface (Recommended)
Start the web application:
```bash
./start_web.sh
```
Or manually:
```bash
source venv/bin/activate
python web_app.py
```

Then open http://127.0.0.1:5000 in your browser to access:
- **Dashboard**: Overview with statistics and recent messages
- **Search**: Advanced message search with filters
- **Statistics**: Interactive charts and sender analytics

## Results

Successfully extracted **108,601 messages** from **20 WhatsApp export files** including:
- Sender names (990 unique senders)
- Phone numbers when available
- Message timestamps
- Full message content
- Source file information

## Web Interface Features

The Flask web application provides:

### Dashboard
- Total message count and unique senders
- Recent messages display
- Top senders ranking
- Quick navigation to search and stats

### Advanced Search
- Search by message content (supports Arabic and English)
- Filter by sender name
- Real-time search with pagination
- Highlighted search results

### Statistics & Analytics
- Interactive charts showing top senders
- Messages per day timeline
- Detailed sender statistics table
- Visual progress bars and percentages

## Example Queries

You can query the database directly using SQLite:

```sql
-- Count messages per sender
SELECT sender_name, COUNT(*) as message_count 
FROM messages 
GROUP BY sender_name 
ORDER BY message_count DESC;

-- Find messages containing specific keywords
SELECT sender_name, message_date, message_content 
FROM messages 
WHERE message_content LIKE '%للبيع%'  -- Arabic for "for sale"
LIMIT 10;

-- Messages from specific date range
SELECT * FROM messages 
WHERE message_date LIKE '%2025%' 
ORDER BY rowid DESC;
```

## Technical Details

- Handles Windows-style line endings (`\r\n`)
- Processes Unicode characters and invisible formatting characters
- Uses regex pattern matching for reliable message parsing
- Supports both 12-hour (AM/PM) and 24-hour time formats
- Filters system notifications automatically

## Troubleshooting

### Web Interface Issues

1. **Template errors**: If you see Jinja2 template errors, restart the Flask app:
   ```bash
   # Stop the app with Ctrl+C, then restart
   source venv/bin/activate
   python web_app.py
   ```

2. **Search not working**: The search function looks in both message content and sender names. Try:
   - Searching for partial names (e.g., "Ahmed" instead of full name)
   - Using Arabic keywords for Arabic messages
   - Checking the sender dropdown for exact names

3. **Flask installation issues**: If Flask is not found:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  
   pip install flask
   ```

4. **HTTP 403 or connection issues**: 
   - Kill any existing processes: `pkill -f web_app.py`
   - The app will try different ports (5000, 5001, 8000, 8080, 3000)
   - Check the terminal output for the actual URL
   - Make sure you're using `http://127.0.0.1:PORT` not `localhost`

5. **Health Check**: Run the diagnostic script:
   ```bash
   source venv/bin/activate
   python health_check.py
   ```

### Performance Tips
- For large datasets, use specific search terms to get faster results
- The web interface paginates results automatically
- Direct SQLite queries can be used for complex analysis