# API Documentation

## Authentication Endpoints

### POST /login
Login user with phone number and password.

**Request:**
```json
{
    "phone": "01234567890",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "تم تسجيل الدخول بنجاح"
}
```

### POST /register
Register new user (requires admin approval).

**Request:**
```json
{
    "phone": "01234567890", 
    "password": "password123",
    "full_name": "Ahmed Mohamed"
}
```

### POST /logout
Logout current user.

## Search API

### GET /api/search
Search messages with advanced filtering.

**Parameters:**
- `query` - Search text
- `sender` - Filter by sender name
- `area_number` - Filter by area number
- `sector_number` - Filter by sector number  
- `mobile_filter` - Mobile number filter (has_mobile, no_mobile, prefix_XXX)
- `transaction_type` - Filter by transaction type
- `page` - Page number (default: 1)
- `per_page` - Results per page (default: 20)

**Response:**
```json
{
    "messages": [...],
    "total_count": 1500,
    "page": 1,
    "per_page": 20
}
```

## Message Management (Admin Only)

### PUT /api/messages/{id}
Update message content and metadata.

### DELETE /api/messages/{id}  
Delete single message.

### POST /admin/bulk-delete
Delete multiple messages by IDs.

**Request:**
```json
{
    "message_ids": [123, 456, 789]
}
```

## File Upload (Admin Only)

### POST /upload
Upload WhatsApp chat export file.

**Form Data:**
- `file` - ZIP/RAR file containing chat export
- `groupName` - Group name for identification

**Response:**
```json
{
    "success": true,
    "message": "تم رفع الملف بنجاح",
    "total_messages": 1250
}
```

## Statistics

### GET /api/stats/messages-per-day
Get message count per day (last 30 days).

**Response:**
```json
[
    {"date": "2025-01-01", "count": 45},
    {"date": "2025-01-02", "count": 62}
]
```