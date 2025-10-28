# 🚀 MASR PRO CRM - دليل التشغيل النهائي

## ✅ النظام يعمل الآن!

### 🎯 كيف تشغل النظام

#### 1️⃣ تشغيل API Server (البورت 3000)

```bash
# الطريقة المضمونة (تعمل في الخلفية)
nohup node server/index.js > api.log 2>&1 &

# أو باستخدام npm
npm run server

# أو باستخدام السكريبت
./start-api.sh
```

**✅ تأكد من أنه يعمل:**
```bash
curl http://localhost:3000/api/health
```

يجب أن يرجع: `{"status":"ok","database":"connected"}`

---

#### 2️⃣ تشغيل Frontend (البورت 8080)

```bash
# في تيرمينال جديد
pnpm dev
```

---

#### 3️⃣ فتح المتصفح

```
http://localhost:8080
```

---

## 🛑 إيقاف السيرفرات

```bash
# إيقاف API Server
pkill -f 'node server/index.js'

# أو
./stop-api.sh

# إيقاف Frontend
# اضغط Ctrl+C في تيرمينال pnpm dev
```

---

## 📊 عرض Logs

```bash
# عرض API logs مباشرة
tail -f api.log

# أو باستخدام npm
npm run server:logs
```

---

## 🏗️ البنية الحالية

### ✅ ما يعمل الآن:

| الصفحة | مصدر البيانات | الحالة |
|--------|---------------|--------|
| **Dashboard** | Supabase + MariaDB | ✅ يعمل |
| **Leads** | Supabase | ✅ يعمل (بياناتك الحقيقية) |
| **Properties** | MariaDB via API | ✅ يعمل (2 عقار تجريبي) |
| **Calendar** | Supabase | ✅ يعمل |

---

## 📝 الأوامر السريعة

```bash
# التشغيل
npm run server              # تشغيل API
pnpm dev                    # تشغيل Frontend

# الإيقاف
npm run server:stop         # إيقاف API

# المراقبة
npm run server:logs         # عرض logs
lsof -i :3000              # تحقق من API port
lsof -i :8080              # تحقق من Frontend port

# الاختبار
curl http://localhost:3000/api/health
curl http://localhost:3000/api/properties
curl http://localhost:3000/api/property-types
```

---

## 🎯 الخطوات التالية

1. ✅ **النظام يعمل** - API على 3000، Frontend على 8080
2. ⏳ **استيراد البيانات** - استيراد 129K عقار من CSV
3. ⏳ **المزيد من الميزات** - تفاصيل العقار، نموذج إضافة

---

## ❓ حل المشاكل

### مشكلة: "حدث خطأ أثناء تحميل قائمة العقارات"

**الحل:**
```bash
# 1. تأكد من أن API يعمل
curl http://localhost:3000/api/health

# إذا لم يعمل، شغله:
nohup node server/index.js > api.log 2>&1 &

# 2. تحقق من logs
tail -f api.log
```

---

### مشكلة: API يتوقف بعد التشغيل

**الحل:** استخدم `nohup` دائماً:
```bash
nohup node server/index.js > api.log 2>&1 &
```

هذا الأمر:
- `nohup` - يمنع إيقاف العملية عند إغلاق التيرمينال
- `> api.log` - يحفظ المخرجات في ملف
- `2>&1` - يحفظ الأخطاء أيضاً
- `&` - يشغل في الخلفية

---

### مشكلة: لا يظهر أي بيانات في Properties

**الحل:**
```bash
# تحقق من MariaDB
mysql -u root -pzerocall masr_pro_crm -e "SELECT COUNT(*) FROM properties"

# يجب أن يرجع: 2 (العقارين التجريبيين)
```

---

## 🎊 النظام جاهز تماماً!

✅ API Server يعمل على البورت **3000**  
✅ Frontend يعمل على البورت **8080**  
✅ Leads من **Supabase** (بياناتك الحقيقية)  
✅ Properties من **MariaDB** (جاهز للاستيراد)

**كل شيء يعمل! 🚀**

افتح: **http://localhost:8080**
