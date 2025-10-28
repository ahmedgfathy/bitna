# 📘 التوثيق الكامل لنظام CRM العقاري - مصر

## 🎯 نظرة عامة

نظام CRM عقاري متكامل موجه للسوق المصري، مصمم خصيصاً لإدارة العملاء المحتملين والعقارات والمستندات والتقارير بشكل احترافي.

### ✨ المميزات الرئيسية

- ✅ واجهة عربية 100% مع خط Cairo
- ✅ نظام مصادقة آمن عبر Supabase
- ✅ نظام أدوار RCAB هرمي (Owner → Manager → Team Leader → Sales)
- ✅ إدارة شاملة للعملاء المحتملين (Leads)
- ✅ إدارة العقارات (Properties)
- ✅ نظام المستندات والعقود
- ✅ التقويم والأحداث
- ✅ الملاحظات والمتابعة
- ✅ سجلات التدقيق (Audit Logs)
- ✅ تصميم responsive متوافق مع الجوال

---

## 🏗️ البنية التقنية

### التقنيات المستخدمة

```
Frontend: React 18 + TypeScript + Vite
Styling: TailwindCSS + Shadcn UI
Backend: Supabase (PostgreSQL + Auth + Storage)
Forms: React Hook Form + Zod
State Management: React Query
Routing: React Router v6
Icons: Lucide React
```

### هيكل المشروع

```
masr-pro-crm/
├── src/
│   ├── components/
│   │   ├── dashboard/       # مكونات لوحة التحكم
│   │   ├── layout/          # Header & Sidebar
│   │   ├── leads/           # مكونات العملاء
│   │   └── ui/              # مكونات UI من Shadcn
│   ├── pages/               # صفحات التطبيق
│   ├── integrations/        # Supabase
│   ├── hooks/               # React Hooks
│   └── lib/                 # وظائف مساعدة
├── supabase/
│   └── migrations/          # ملفات SQL
└── public/                  # ملفات ثابتة
```

---

## 📊 قاعدة البيانات - Supabase

### الجداول الرئيسية

#### 1. **profiles** - الملفات الشخصية
```sql
- id: UUID (Primary Key)
- full_name: TEXT (الاسم الكامل)
- email: TEXT (البريد الإلكتروني)
- phone: TEXT (رقم الهاتف)
- avatar_url: TEXT (صورة الملف الشخصي)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 2. **user_roles** - أدوار المستخدمين
```sql
- id: UUID (Primary Key)
- user_id: UUID (FK → auth.users)
- role: ENUM ('owner', 'manager', 'team_leader', 'sales')
- created_at: TIMESTAMP
```

#### 3. **leads** - العملاء المحتملون
```sql
- id: UUID (Primary Key)
- full_name: TEXT (الاسم الكامل) *
- phone: TEXT (رقم الهاتف) *
- email: TEXT (البريد الإلكتروني)
- city: TEXT (المدينة) *
- source: TEXT (المصدر) *
- status: ENUM ('new', 'contacted', 'qualified', 'negotiation', 'won', 'lost')
- budget_min: DECIMAL (الميزانية الدنيا)
- budget_max: DECIMAL (الميزانية القصوى)
- preferred_property_type: TEXT (نوع العقار المفضل)
- notes: TEXT (ملاحظات)
- assigned_to: UUID (FK → users)
- created_by: UUID (FK → users) *
- last_contact_date: TIMESTAMP
- next_followup_date: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 4. **properties** - العقارات
```sql
- id: UUID (Primary Key)
- title: TEXT (العنوان) *
- property_type: ENUM ('apartment', 'villa', 'land', 'commercial', 'chalet')
- address: TEXT (العنوان التفصيلي) *
- city: TEXT (المدينة) *
- district: TEXT (الحي) *
- price: DECIMAL (السعر) *
- area_sqm: DECIMAL (المساحة بالمتر المربع) *
- bedrooms: INTEGER (عدد الغرف)
- bathrooms: INTEGER (عدد الحمامات)
- description: TEXT (الوصف)
- status: ENUM ('available', 'under_offer', 'sold', 'rented')
- images: TEXT[] (مصفوفة روابط الصور)
- owner_name: TEXT (اسم المالك)
- owner_phone: TEXT (هاتف المالك)
- owner_email: TEXT (بريد المالك)
- created_by: UUID (FK → users) *
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 5. **documents** - المستندات
```sql
- id: UUID (Primary Key)
- title: TEXT (العنوان) *
- document_type: ENUM ('sale_contract', 'rent_contract', 'booking_receipt', 'commission_invoice', 'ownership_deed', 'other')
- file_url: TEXT (رابط الملف) *
- file_size: BIGINT (حجم الملف)
- mime_type: TEXT (نوع الملف)
- related_lead_id: UUID (FK → leads)
- related_property_id: UUID (FK → properties)
- notes: TEXT (ملاحظات)
- uploaded_by: UUID (FK → users) *
- created_at: TIMESTAMP
```

#### 6. **events** - الأحداث والمواعيد
```sql
- id: UUID (Primary Key)
- title: TEXT (العنوان) *
- event_type: ENUM ('viewing', 'meeting', 'call', 'followup', 'other')
- description: TEXT (الوصف)
- start_time: TIMESTAMP *
- end_time: TIMESTAMP *
- location: TEXT (الموقع)
- related_lead_id: UUID (FK → leads)
- related_property_id: UUID (FK → properties)
- assigned_to: UUID (FK → users)
- created_by: UUID (FK → users) *
- completed: BOOLEAN (مكتمل)
- created_at: TIMESTAMP
```

#### 7. **notes** - الملاحظات
```sql
- id: UUID (Primary Key)
- content: TEXT (المحتوى) *
- tags: TEXT[] (الوسوم)
- related_lead_id: UUID (FK → leads)
- related_property_id: UUID (FK → properties)
- is_private: BOOLEAN (خاص)
- created_by: UUID (FK → users) *
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 8. **audit_logs** - سجلات التدقيق
```sql
- id: UUID (Primary Key)
- table_name: TEXT (اسم الجدول) *
- record_id: UUID (معرف السجل) *
- action: ENUM ('create', 'update', 'delete', 'view')
- old_data: JSONB (البيانات القديمة)
- new_data: JSONB (البيانات الجديدة)
- user_id: UUID (FK → users)
- user_email: TEXT (بريد المستخدم)
- ip_address: TEXT (عنوان IP)
- created_at: TIMESTAMP
```

#### 9. **static_data** - البيانات الثابتة
```sql
- id: UUID (Primary Key)
- category: TEXT (الفئة: governorate, lead_source, إلخ) *
- value_ar: TEXT (القيمة بالعربية) *
- value_en: TEXT (القيمة بالإنجليزية)
- display_order: INTEGER (ترتيب العرض)
- is_active: BOOLEAN (نشط)
- created_at: TIMESTAMP
```

---

## 🔐 نظام الأدوار والصلاحيات (RCAB)

### الأدوار المتاحة

1. **Owner (المالك)** - صلاحيات كاملة
   - إدارة المستخدمين والأدوار
   - الوصول لجميع البيانات
   - تعديل البيانات الثابتة
   - عرض سجلات التدقيق

2. **Manager (المدير)**
   - إدارة الفريق
   - حذف العملاء والعقارات
   - عرض سجلات التدقيق
   - الوصول لجميع البيانات

3. **Team Leader (قائد الفريق)**
   - إدارة فريقه
   - تعديل بيانات الفريق
   - عرض بيانات الفريق فقط

4. **Sales (مسؤول مبيعات)**
   - إضافة وتعديل عملائه فقط
   - عرض العقارات المتاحة
   - إضافة ملاحظات وأحداث

### الصلاحيات الهرمية

```
Owner
  └── Manager
       └── Team Leader
            └── Sales
```

**ملاحظة**: كل مستوى أعلى يرث صلاحيات المستوى الأدنى.

---

## 📝 دليل الاستخدام

### 1. صفحة العملاء المحتملين (Leads)

#### إضافة عميل جديد

```typescript
// الحقول المطلوبة (*)
full_name: "محمد أحمد علي"
phone: "01012345678"
city: "القاهرة"
source: "إعلان فيسبوك"
status: "new" (افتراضي)

// الحقول الاختيارية
email: "mohamed@example.com"
budget_min: 1000000
budget_max: 5000000
preferred_property_type: "apartment"
notes: "العميل مهتم بشقة في التجمع الخامس"
next_followup_date: "2025-10-20"
```

#### حالات العميل (Lead Status)

- **جديد (new)**: عميل جديد لم يتم الاتصال به
- **تم الاتصال (contacted)**: تم التواصل مع العميل
- **مؤهل (qualified)**: عميل مؤهل للشراء
- **تفاوض (negotiation)**: جاري التفاوض
- **ناجح (won)**: صفقة ناجحة ✅
- **مفقود (lost)**: العميل غير مهتم ❌

#### البحث والتصفية

يمكنك البحث عن العملاء باستخدام:
- الاسم
- رقم الهاتف
- البريد الإلكتروني
- المدينة

كما يمكنك تصفية العملاء حسب:
- الحالة (Status)
- المدينة
- المصدر

#### عرض تفاصيل العميل

عند النقر على "عرض"، ستظهر نافذة تحتوي على:
- **المعلومات الأساسية**: البيانات الشخصية ومعلومات الاتصال
- **الملاحظات**: جميع الملاحظات المرتبطة بالعميل
- **الأحداث**: المواعيد والاجتماعات

---

## 🎨 دليل التصميم

### نظام الألوان

```css
/* الألوان الأساسية */
--primary: #1a73e8 (أزرق مهني)
--secondary: #f59e0b (ذهبي للعقارات)
--success: #16a34a (أخضر للنجاح)
--warning: #f97316 (برتقالي للتحذير)
--destructive: #dc2626 (أحمر للخطر)

/* الألوان الثانوية */
--background: #ffffff (أبيض)
--foreground: #1e293b (رمادي داكن)
--muted: #f1f5f9 (رمادي فاتح)
--accent: #e0f2fe (أزرق فاتح)
```

### حالات الحالة (Status Badges)

```css
.status-new        → أزرق فاتح
.status-contacted  → بنفسجي فاتح
.status-qualified  → أخضر فاتح
.status-negotiation → أصفر فاتح
.status-won        → أخضر زمردي
.status-lost       → أحمر فاتح
```

### الخطوط

```css
font-family: 'Cairo', sans-serif;
/* الأوزان المستخدمة: 300, 400, 500, 600, 700, 800 */
```

---

## 🚀 التشغيل والتطوير

### المتطلبات

- Node.js 18+
- npm أو pnpm أو bun
- حساب Supabase

### التثبيت

```bash
# 1. نسخ المشروع
git clone <repository-url>
cd masr-pro-crm

# 2. تثبيت المكتبات
npm install
# أو
pnpm install

# 3. إعداد ملف البيئة
cp .env.example .env

# 4. تعديل ملف .env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key

# 5. تشغيل المشروع
npm run dev
```

### الأوامر المتاحة

```bash
npm run dev        # تشغيل بيئة التطوير
npm run build      # بناء المشروع للإنتاج
npm run preview    # معاينة البناء
npm run lint       # فحص الأكواد
```

---

## 🔧 إعداد Supabase

### 1. إنشاء مشروع جديد

1. سجل دخول إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. انسخ URL و API Key

### 2. تطبيق Migrations

```bash
# من مجلد المشروع
supabase init
supabase link --project-ref your-project-ref
supabase db push
```

أو قم بنسخ محتوى ملف SQL من:
```
supabase/migrations/20251013014228_*.sql
```

ولصقه في SQL Editor في لوحة تحكم Supabase.

### 3. تفعيل Auth

في لوحة تحكم Supabase:
1. اذهب إلى Authentication
2. فعّل Email Auth
3. قم بإضافة المستخدمين أو السماح بالتسجيل

---

## 📱 الصفحات والمسارات

```
/                → لوحة التحكم (Dashboard)
/auth            → تسجيل الدخول والتسجيل
/leads           → إدارة العملاء المحتملين
/properties      → إدارة العقارات
/calendar        → التقويم والمواعيد
/reports         → التقارير
/settings        → الإعدادات
```

---

## 🎯 المرحلة الحالية: **✅ مكتملة**

### ما تم إنجازه:

✅ نظام المصادقة الكامل (Login/Register)
✅ لوحة التحكم مع الإحصائيات
✅ قاعدة البيانات الكاملة مع RLS
✅ صفحة العملاء المحتملين (Leads) - **كاملة**
  - نموذج إضافة/تعديل عميل
  - عرض قائمة العملاء (Grid/List)
  - البحث والتصفية المتقدمة
  - عرض تفاصيل العميل
  - الحذف مع تأكيد
✅ التصميم العربي الاحترافي
✅ نظام الأدوار RCAB

### المراحل القادمة:

⏳ صفحة العقارات (Properties)
⏳ صفحة التقويم (Calendar)
⏳ صفحة المستندات (Documents)
⏳ صفحة التقارير (Reports)
⏳ صفحة الإعدادات (Settings)
⏳ نظام الإشعارات
⏳ Dashboard متقدم مع رسوم بيانية

---

## 💡 نصائح للتطوير

### 1. إضافة صفحة جديدة

```typescript
// 1. إنشاء ملف الصفحة
src/pages/NewPage.tsx

// 2. إضافة المسار في App.tsx
<Route path="/new-page" element={<NewPage />} />

// 3. إضافة الرابط في Sidebar.tsx
{ icon: Icon, label: "الصفحة الجديدة", path: "/new-page" }
```

### 2. إضافة مكون جديد

```typescript
// src/components/category/ComponentName.tsx
import { FC } from "react";

interface ComponentProps {
  // props here
}

const ComponentName: FC<ComponentProps> = ({ props }) => {
  return (
    // JSX here
  );
};

export default ComponentName;
```

### 3. استخدام Supabase

```typescript
// جلب البيانات
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);

// إضافة بيانات
const { data, error } = await supabase
  .from('table_name')
  .insert([{ column: value }]);

// تحديث بيانات
const { data, error } = await supabase
  .from('table_name')
  .update({ column: value })
  .eq('id', id);

// حذف بيانات
const { data, error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', id);
```

---

## 📞 الدعم والمساعدة

### الموارد

- [React Documentation](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 📄 الرخصة

هذا المشروع مرخص تحت MIT License.

---

## 👨‍💻 المساهمة

نرحب بمساهماتكم! يرجى:
1. عمل Fork للمشروع
2. إنشاء branch جديد
3. إجراء التعديلات
4. عمل Pull Request

---

**🎉 مبروك! لقد أكملت قراءة التوثيق. الآن يمكنك البدء في التطوير!**

---

تم التوثيق بواسطة: GitHub Copilot
التاريخ: 13 أكتوبر 2025
