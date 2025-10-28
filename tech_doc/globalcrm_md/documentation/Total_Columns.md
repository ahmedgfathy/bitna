Total Columns: 67 (LIVE APPWRITE DATABASE)

✅ REQUIRED FIELDS:
propertyOfferedBy (STRING) - Who offers the property
modifiedTime (DATETIME) - Automatic modification timestamp  
compoundName (STRING) - Compound/project name
createdTime (DATETIME) - Automatic creation timestamp
🔵 OPTIONAL FIELDS:
building - Building name
propertyNumber - Unique property identifier (UNIQUE INDEX)
theFloors - Floor information
finished - Finishing status
unitFeatures - Unit features description
phase - Development phase
note - Additional notes
inOrOutSideCompound - Location type
description - Property description
lastFollowIn - Last follow-up date
status - Property status
activity - Current activity
name - Property name
unitNo - Unit number
callUpdate - Call update info
forUpdate - Update purpose
handler - Assigned handler
sales - Sales person
landArea - Land area
currency - Currency type
rentFrom - Rent start date
rentTo - Rent end date
liked - Favorite status (BOOLEAN)
inHome - Featured on homepage (BOOLEAN)
rooms - Number of rooms (INTEGER)
mobileNo - Contact mobile
totalPrice - Total price (INTEGER)
PricePerMeter - Price per meter (INTEGER)
propertyImage - Property images (JSON array)
videos - Property videos (JSON array)
tel - Telephone number
users - Assigned users (ARRAY)
project - Associated project
installment - Installment details
payedEvery - Payment frequency
monthly - Monthly payment
📊 INDEXES:
search (FULLTEXT) on name
index_4 (FULLTEXT) on type
propertyNumber (UNIQUE)
created_time (UNIQUE) on $createdAt
🎯 KEY BUSINESS RULES:
Category: Main classification (Commercial, Residential)
Type: Specific property type within category
Commercial: Office, Retail, Industrial spaces
Residential: Apartments, Villas, Townhouses
🔗 RELATIONSHIPS:
Connected to Users table (user-property assignment)
Connected to Projects table [remove that connection]
Has FilterSettings for search functionality
That's the complete structure of the Properties table in your Appwrite database! Task completed.





node analyze-properties-config.js
📋 ANALYZING PROPERTIES TABLE FROM CONFIG...
================================================================================
Found 2 Properties collection(s):

🏢 PROPERTIES COLLECTION #1
   Collection ID: 6737698b000cccaf6f16
   Database ID: 67339a4f001e73dc2311
   Enabled: true
   Total Attributes: 44

📊 COLUMN STRUCTURE:
--------------------------------------------------------------------------------
01. building                  | string       | Optional | Single
    └─ Size: 100
02. unitFor                   | string       | Required | Single
    └─ Size: 100
03. propertyNumber            | string       | Optional | Single
    └─ Size: 100
04. theFloors                 | string       | Optional | Single
    └─ Size: 1000
05. area                      | string       | Required | Single
    └─ Size: 1000
06. finished                  | string       | Optional | Single
    └─ Size: 100
07. unitFeatures              | string       | Optional | Single
    └─ Size: 1000
08. phase                     | string       | Optional | Single
    └─ Size: 100
09. note                      | string       | Optional | Single
    └─ Size: 1000
10. inOrOutSideCompound       | string       | Optional | Single
    └─ Size: 30, Default: 1000
11. description               | string       | Optional | Single
    └─ Size: 100000
12. lastFollowIn              | datetime     | Optional | Single
13. status                    | string       | Optional | Single
    └─ Size: 100
14. activity                  | string       | Optional | Single
    └─ Size: 100
15. propertyOfferedBy         | string       | Required | Single
    └─ Size: 100
16. name                      | string       | Optional | Single
    └─ Size: 100
17. unitNo                    | string       | Optional | Single
    └─ Size: 100
18. callUpdate                | string       | Optional | Single
    └─ Size: 100
19. forUpdate                 | string       | Optional | Single
    └─ Size: 60
20. handler                   | string       | Optional | Single
    └─ Size: 50
21. sales                     | string       | Optional | Single
    └─ Size: 50
22. category                  | string       | Required | Single
    └─ Size: 30
23. modifiedTime              | datetime     | Required | Single
24. landArea                  | string       | Optional | Single
    └─ Size: 50
25. currency                  | string       | Optional | Single
    └─ Size: 20
26. rentFrom                  | datetime     | Optional | Single
27. rentTo                    | datetime     | Optional | Single
28. compoundName              | string       | Required | Single
    └─ Size: 60
29. type                      | string       | Required | Single
    └─ Size: 50
30. liked                     | boolean      | Optional | Single
    └─ Default: false
31. inHome                    | boolean      | Optional | Single
    └─ Default: false
32. rooms                     | integer      | Optional | Single
    └─ Range: 1 to 100
33. mobileNo                  | string       | Optional | Single
    └─ Size: 100
34. totalPrice                | integer      | Optional | Single
    └─ Range: 1 to 10000000000000000
35. PricePerMeter             | integer      | Optional | Single
    └─ Range: 1 to 9999999
36. propertyImage             | string       | Optional | Single
    └─ Size: 100000, Default: []
37. videos                    | string       | Optional | Single
    └─ Size: 2500, Default: []
38. tel                       | string       | Optional | Single
    └─ Size: 100
39. users                     | string       | Optional | Array
    └─ Size: 1000
40. project                   | string       | Optional | Single
    └─ Size: 40
41. installment               | string       | Optional | Single
    └─ Size: 15
42. payedEvery                | string       | Optional | Single
    └─ Size: 15
43. monthly                   | string       | Optional | Single
    └─ Size: 15
44. createdTime               | datetime     | Required | Single
--------------------------------------------------------------------------------

📊 COLUMN TYPES BREAKDOWN:
   string      : 34 column(s)
   datetime    : 5 column(s)
   boolean     : 2 column(s)
   integer     : 3 column(s)

🔑 REQUIRED FIELDS:
   ✓ unitFor (string)
   ✓ area (string)
   ✓ propertyOfferedBy (string)
   ✓ category (string)
   ✓ modifiedTime (datetime)
   ✓ compoundName (string)
   ✓ type (string)
   ✓ createdTime (datetime)

🔍 INDEXES:
   search (fulltext) - name
   index_4 (fulltext) - type
   propertyNumber (unique) - propertyNumber
   created_time (unique) - $createdAt

📈 SUMMARY:
   Total columns: 44
   Required: 8
   Optional: 36
   Indexes: 4

================================================================================

🏢 PROPERTIES COLLECTION #2
   Collection ID: 6737698b000cccaf6f16
   Database ID: 677a9e5c0014e2994c62
   Enabled: true
   Total Attributes: 52

📊 COLUMN STRUCTURE:
--------------------------------------------------------------------------------
01. building                  | string       | Optional | Single
    └─ Size: 100
02. propertyNumber            | string       | Optional | Single
    └─ Size: 100
03. theFloors                 | string       | Optional | Single
    └─ Size: 1000
04. unitFeatures              | string       | Optional | Single
    └─ Size: 1000
05. phase                     | string       | Optional | Single
    └─ Size: 100
06. note                      | string       | Optional | Single
    └─ Size: 1000
07. inOrOutSideCompound       | string       | Optional | Single
    └─ Size: 30, Default: 1000
08. description               | string       | Optional | Single
    └─ Size: 100000
09. lastFollowIn              | datetime     | Optional | Single
10. status                    | string       | Optional | Single
    └─ Size: 100
11. propertyOfferedBy         | string       | Required | Single
    └─ Size: 100
12. name                      | string       | Optional | Single
    └─ Size: 100
13. unitNo                    | string       | Optional | Single
    └─ Size: 100
14. callUpdate                | string       | Optional | Single
    └─ Size: 100
15. forUpdate                 | string       | Optional | Single
    └─ Size: 60
16. handler                   | string       | Optional | Single
    └─ Size: 50
17. sales                     | string       | Optional | Single
    └─ Size: 50
18. modifiedTime              | datetime     | Required | Single
19. landArea                  | string       | Optional | Single
    └─ Size: 50
20. rentFrom                  | datetime     | Optional | Single
21. rentTo                    | datetime     | Optional | Single
22. compoundName              | string       | Required | Single
    └─ Size: 60
23. liked                     | boolean      | Optional | Single
    └─ Default: false
24. inHome                    | boolean      | Optional | Single
    └─ Default: false
25. rooms                     | integer      | Optional | Single
    └─ Range: 1 to 100
26. mobileNo                  | string       | Optional | Single
    └─ Size: 100
27. totalPrice                | integer      | Optional | Single
    └─ Range: 1 to 10000000000000000
28. PricePerMeter             | integer      | Optional | Single
    └─ Range: 1 to 9999999
29. propertyImage             | string       | Optional | Single
    └─ Size: 100000, Default: []
30. videos                    | string       | Optional | Single
    └─ Size: 2500, Default: []
31. tel                       | string       | Optional | Single
    └─ Size: 100
32. users                     | string       | Optional | Array
    └─ Size: 1000
33. project                   | string       | Optional | Single
    └─ Size: 40
34. installment               | string       | Optional | Single
    └─ Size: 15
35. payedEvery                | string       | Optional | Single
    └─ Size: 15
36. monthly                   | string       | Optional | Single
    └─ Size: 15
37. createdTime               | datetime     | Required | Single
38. downPayment               | integer      | Optional | Single
    └─ Range: -9223372036854776000 to 9223372036854776000, Default: 0
39. spaceEerth                | string       | Optional | Single
    └─ Size: 1073741824, Default: 0
40. spaceUnit                 | string       | Optional | Single
    └─ Size: 1073741824, Default: 0
41. spaceGuard                | string       | Optional | Single
    └─ Size: 1073741824, Default: 0
42. title                     | string       | Optional | Single
    └─ Size: 255
43. price                     | integer      | Optional | Single
    └─ Range: -9223372036854776000 to 9223372036854776000
44. location                  | string       | Optional | Single
    └─ Size: 500
45. images                    | string       | Optional | Single
    └─ Size: 5000
46. region_id_new             | string       | Optional | Single
    └─ Size: 36
47. property_type_id_new      | string       | Optional | Single
    └─ Size: 36
48. finishing_level_id_new    | string       | Optional | Single
    └─ Size: 36
49. currency_id_new           | string       | Optional | Single
    └─ Size: 36
50. category_id_new           | string       | Optional | Single
    └─ Size: 36
51. unit_facility_id_new      | string       | Optional | Single
    └─ Size: 36
52. unit_purpose_id_new       | string       | Optional | Single
    └─ Size: 36
--------------------------------------------------------------------------------

📊 COLUMN TYPES BREAKDOWN:
   string      : 40 column(s)
   datetime    : 5 column(s)
   boolean     : 2 column(s)
   integer     : 5 column(s)

🔑 REQUIRED FIELDS:
   ✓ propertyOfferedBy (string)
   ✓ modifiedTime (datetime)
   ✓ compoundName (string)
   ✓ createdTime (datetime)

🔍 INDEXES:
   created_time (unique) - $createdAt
   search (fulltext) - name
   propertyNumber (unique) - propertyNumber
   status_index_1754766870815 (key) - status
   compoundName_index_1754766872424 (key) - compoundName
   totalPrice_index_1754766873178 (key) - totalPrice

📈 SUMMARY:
   Total columns: 52
   Required: 4
   Optional: 48
   Indexes: 6

✅ ANALYSIS COMPLETE!
ahmedgomaa@Ahmeds-MacBook-Air globalcrm % 









that from appwrite properties tables


Create column


Column name
Indexed
Default value


$id


NULL



building
Size: 100





propertyNumber
Size: 100


NULL



theFloors
Size: 1000


NULL



unitFeatures
Size: 1000


NULL



phase
Size: 100


NULL



note
Size: 1000


NULL



inOrOutSideCompound
Size: 30


1000



description
Size: 100000





lastFollowIn


NULL



status
Size: 100


NULL



propertyOfferedBy
required
Size: 100


NULL



name
Size: 100


NULL



unitNo
Size: 100


NULL



callUpdate
Size: 100


NULL



forUpdate
Size: 60


NULL



handler
Size: 50


NULL



sales
Size: 50


NULL



modifiedTime
required


NULL



landArea
Size: 50


NULL



rentFrom


NULL



rentTo


NULL



compoundName
required
Size: 60


NULL



liked


false



inHome


false



rooms
Min: 1, Max: 100


NULL



mobileNo
Size: 100


NULL



totalPrice
Min: 1


NULL



PricePerMeter
Min: 1, Max: 9999999


NULL



propertyImage
Size: 100000


[]



videos
Size: 2500


[]



tel
Size: 100


NULL



users []
Size: 1000


NULL



project
Size: 40


NULL



installment
Size: 15


NULL



payedEvery
Size: 15


NULL



monthly
Size: 15


NULL



createdTime
required


NULL



downPayment


0



spaceEerth
Size: 1073741824


0



spaceUnit
Size: 1073741824


0



spaceGuard
Size: 1073741824


0



title
Size: 255


NULL



price


NULL



location
Size: 500


NULL



images
Size: 5000


NULL



region_id_new
Size: 36


NULL



property_type_id_new
Size: 36


NULL



finishing_level_id_new
Size: 36


NULL



currency_id_new
Size: 36


NULL



category_id_new
Size: 36


NULL



unit_facility_id_new
Size: 36


NULL



unit_purpose_id_new
Size: 36


NULL



region_name
Size: 255


NULL



country_name
Size: 255


NULL



property_type_name
Size: 255


NULL



unit_type_name
Size: 255


NULL



category_name
Size: 255


NULL



property_purpose_name
Size: 255


NULL



currency_name
Size: 10


NULL



currency_symbol
Size: 10


NULL



payment_type_name
Size: 255


NULL



finishing_level_name
Size: 255


NULL



development_phase_name
Size: 255


NULL



activity
Size: 50


NULL



land_area
Size: 255


NULL



built_area
Size: 255


NULL



bedrooms_count
Size: 255


NULL



$createdAt


NULL



$updatedAt


NULL


70 columns