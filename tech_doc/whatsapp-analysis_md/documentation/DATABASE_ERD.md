# Database Entity Relationship Diagram (ERD)

## Visual Database Structure

```
                    ┌─────────────────────────────────────────────────────┐
                    │                    DATABASE                         │
                    │               whatsapp_analysis                     │
                    │                (MariaDB/MySQL)                      │
                    └─────────────────────────────────────────────────────┘
                                             │
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
                    ▼                        │                        ▼
    ┌─────────────────────────────┐          │          ┌─────────────────────────────┐
    │          USERS              │          │          │         MESSAGES            │
    │         (Authentication)    │          │          │      (Real Estate Data)     │
    ├─────────────────────────────┤          │          ├─────────────────────────────┤
    │ 🔑 id (INT, PK, AI)        │          │          │ 🔑 id (INT, PK, AI)        │
    │ 📱 mobile_number (VARCHAR)  │  Manages │          │ 👤 sender_name (VARCHAR)    │
    │ 🔒 password_hash (VARCHAR)  │    ═══════════════> │ 📞 phone_number (VARCHAR)   │
    │ 👤 full_name (VARCHAR)      │ Messages │          │ 📅 message_date (VARCHAR)   │
    │ 📧 email (VARCHAR)          │          │          │ 💬 message_content (TEXT)   │
    │ ⚡ is_admin (BOOLEAN)       │          │          │ 📁 file_source (VARCHAR)    │
    │ ✅ is_active (BOOLEAN)      │          │          │ 🏘️  area_number (INT)       │
    │ 📅 created_at (TIMESTAMP)   │          │          │ 🏢 sector_number (INT)      │
    │ 🕒 last_login (TIMESTAMP)   │          │          │ 📱 extracted_mobile (VARCHAR)|
    │ 🚫 login_attempts (INT)     │          │          │ 🏷️  transaction_type (VARCHAR)|
    │ 🔐 locked_until (TIMESTAMP) │          │          │ ⏰ datetime_parsed (DATETIME)|
    └─────────────────────────────┘          │          │ 📅 created_at (TIMESTAMP)   │
                    │                        │          └─────────────────────────────┘
                    │                        │                        │
                    ▼                        │                        ▼
    ┌─────────────────────────────┐          │          ┌─────────────────────────────┐
    │        INDEXES              │          │          │         INDEXES             │
    ├─────────────────────────────┤          │          ├─────────────────────────────┤
    │ • idx_mobile (mobile_number)│          │          │ • idx_sender (sender_name)  │
    │ • idx_email (email)         │          │          │ • idx_phone (phone_number)  │
    └─────────────────────────────┘          │          │ • idx_area (area_number)    │
                                             │          │ • idx_sector (sector_number)│
                                             │          │ • idx_mobile (extracted...)  │
                                             │          │ • idx_transaction (trans...) │
                                             │          │ • idx_datetime (datetime...) │
                                             │          └─────────────────────────────┘

                         ┌────────────────────────────────────────┐
                         │           RELATIONSHIPS                │
                         ├────────────────────────────────────────┤
                         │ ● No Direct Foreign Keys               │
                         │ ● Logical Relationship via Application │
                         │ ● Users manage Messages through UI     │
                         │ ● Admin users can CRUD operations     │
                         │ ● Regular users have read-only access │
                         └────────────────────────────────────────┘
```

## Data Flow Architecture

```
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   WhatsApp       │    │  File Upload    │    │  Data Processing │    │    Database      │
│   Export Files   │───▶│   & Parsing     │───▶│   & Analysis     │───▶│     Storage      │
│                  │    │                 │    │                  │    │                  │
│ • .zip archives  │    │ • Extract .txt  │    │ • Mobile Regex   │    │ • messages table │
│ • Chat .txt files│    │ • Parse format  │    │ • Area/Sector    │    │ • Indexed data   │
│ • Media files    │    │ • Clean Unicode │    │ • Type Analysis  │    │ • Search ready   │
└──────────────────┘    └─────────────────┘    └──────────────────┘    └──────────────────┘
         │                        │                        │                        │
         ▼                        ▼                        ▼                        ▼
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ Raw Text Data    │    │ Structured JSON │    │ Enhanced Data    │    │ Query Interface  │
│                  │    │                 │    │                  │    │                  │
│ • Timestamps     │    │ • Sender info   │    │ • Contact nums   │    │ • Search API     │
│ • Sender names   │    │ • Message text  │    │ • Location data  │    │ • Filter options │
│ • Message content│    │ • Source refs   │    │ • Transaction    │    │ • Bulk operations│
└──────────────────┘    └─────────────────┘    └──────────────────┘    └──────────────────┘
```

## Transaction Type Classification

```
                          ┌─────────────────────────────┐
                          │      Message Analysis       │
                          │        (AI Processing)      │
                          └─────────────────────────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
                    ▼                    ▼                    ▼
        ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
        │      للبيع       │  │      مطلوب       │  │     غير محدد      │
        │   (For Sale)     │  │   (Wanted/Buy)   │  │   (Unspecified)  │
        ├──────────────────┤  ├──────────────────┤  ├──────────────────┤
        │ Keywords:        │  │ Keywords:        │  │ No clear         │
        │ • للبيع          │  │ • مطلوب          │  │ indicators       │
        │ • للإيجار        │  │ • أبحث           │  │                  │
        │ • متاح           │  │ • أريد           │  │ Default when     │
        │ • عرض            │  │ • احتاج          │  │ no match found   │
        │ • Contact info   │  │ • looking for    │  │                  │
        │ • Price mentions │  │ • need           │  │                  │
        └──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Area & Sector Mapping

```
                    ┌─────────────────────────────────────────┐
                    │           Location Extraction           │
                    │         (Arabic Text Processing)        │
                    └─────────────────────────────────────────┘
                                        │
                        ┌───────────────┼───────────────┐
                        │               │               │
                        ▼               ▼               ▼
            ┌──────────────────┐ ┌─────────────┐ ┌─────────────────┐
            │  Area Numbers    │ │   Sectors   │ │   Validation    │
            │     (الحي)       │ │  (مجاورة)   │ │    & Cleanup    │
            ├──────────────────┤ ├─────────────┤ ├─────────────────┤
            │ Patterns:        │ │ Patterns:   │ │ • Range check   │
            │ • الحي \d+       │ │ • مج \d+    │ │ • Data typing   │
            │ • حي \d+         │ │ • مجاورة \d+│ │ • Null handling │
            │ • الحى \d+       │ │ • المجاورة  │ │ • Index creation│
            │                  │ │             │ │                 │
            │ Range: 1-50      │ │ Range: 1-100│ │ Ready for       │
            └──────────────────┘ └─────────────┘ │ search & stats  │
                                                └─────────────────┘
```

## Mobile Number Extraction Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Mobile Number Processing Pipeline                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                   ┌───────────────────┼───────────────────┐
                   │                   │                   │
                   ▼                   ▼                   ▼
       ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
       │ Arabic Numerals  │ │ Egyptian Mobile  │ │ International    │
       │   Conversion     │ │    Patterns      │ │    Formats       │
       ├──────────────────┤ ├──────────────────┤ ├──────────────────┤
       │ ٠١٢٣٤٥٦٧٨٩      │ │ 01[0125]XXXXXXXX │ │ +20XXXXXXXXXX    │
       │      ↓           │ │                  │ │ 002XXXXXXXXXX    │
       │ 0123456789       │ │ Validation:      │ │ 2XXXXXXXXXX      │
       │                  │ │ • Length = 11    │ │                  │
       │ Clean & Convert  │ │ • Starts with 01 │ │ Clean & Validate │
       └──────────────────┘ │ • Valid prefix   │ └──────────────────┘
                            └──────────────────┘
                                       │
                            ┌──────────┼──────────┐
                            │          │          │
                            ▼          ▼          ▼
                    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                    │    010      │ │    011      │ │    012/015  │
                    │  Vodafone   │ │   Etisalat  │ │   Orange/We │
                    └─────────────┘ └─────────────┘ └─────────────┘
```

## Database Performance Schema

```
                    ┌─────────────────────────────────────────┐
                    │            Query Optimization           │
                    └─────────────────────────────────────────┘
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            │                           │                           │
            ▼                           ▼                           ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│      Indexes        │    │   Query Patterns    │    │   Caching Strategy  │
├─────────────────────┤    ├─────────────────────┤    ├─────────────────────┤
│ B-Tree Indexes:     │    │ • Text Search       │    │ • Application Level │
│ • Primary Keys      │    │ • Filter Combos     │    │ • Query Result Cache│
│ • Foreign Keys      │    │ • Pagination        │    │ • Session Storage   │
│ • Search Columns    │    │ • Aggregations      │    │ • Static Data Cache │
│                     │    │ • Admin Operations  │    │                     │
│ Composite Indexes:  │    │                     │    │ Cache Invalidation: │
│ • area + sector     │    │ Optimized for:      │    │ • On data changes   │
│ • sender + date     │    │ • Fast searches     │    │ • Time-based expiry │
│ • transaction + area│    │ • Quick stats       │    │ • User sessions     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```