# 🏢 نظام CRM العقاري - السوق المصري

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**نظام إدارة علاقات العملاء احترافي للشركات العقارية المصرية**

[المميزات](#-المميزات) • [التثبيت](#-التثبيت) • [الاستخدام](#-الاستخدام) • [التوثيق](#-التوثيق)

</div>

---

## 📋 نظرة عامة

نظام CRM عقاري متكامل مصمم خصيصاً للسوق المصري، يوفر إدارة شاملة للعملاء المحتملين، العقارات، المواعيد، المستندات، والتقارير بواجهة عربية 100% وتصميم احترافي.

## ✨ المميزات

### 🎯 المميزات الأساسية

- ✅ **واجهة عربية كاملة** - بخط Cairo الاحترافي
- ✅ **نظام مصادقة آمن** - عبر Supabase Auth
- ✅ **نظام أدوار RCAB** - Owner, Manager, Team Leader, Sales
- ✅ **تصميم responsive** - يعمل على جميع الأجهزة
- ✅ **Dark Mode** - وضع داكن للعمل الليلي
- ✅ **Real-time Updates** - تحديثات فورية للبيانات

### 📊 الوحدات الرئيسية

#### 1️⃣ إدارة العملاء المحتملين (Leads) ✅
- إضافة وتعديل وحذف العملاء
- تتبع حالات العملاء (جديد → تم الاتصال → مؤهل → تفاوض → ناجح/مفقود)
- البحث والتصفية المتقدمة
- عرض تفاصيل شاملة للعميل
- إضافة ملاحظات وأحداث
- تحديد ميزانية وتفضيلات العميل

#### 2️⃣ إدارة العقارات (Properties) ⏳
- قائمة العقارات المتاحة
- تفاصيل كاملة لكل عقار
- رفع صور متعددة
- تتبع حالة العقار
- ربط العقارات بالعملاء

#### 3️⃣ التقويم والأحداث (Calendar) ⏳
- جدول المواعيد الشهري
- إنشاء أحداث (معاينات، اجتماعات، مكالمات)
- تذكيرات المواعيد
- ربط الأحداث بالعملاء والعقارات

#### 4️⃣ المستندات (Documents) ⏳
- رفع وإدارة المستندات
- قوالب عقود جاهزة
- ربط المستندات بالعملاء والعقارات
- تصنيف المستندات

#### 5️⃣ التقارير (Reports) ⏳
- تقارير مخصصة قابلة للتخصيص
- تصدير CSV/PDF
- إحصائيات الأداء
- رسوم بيانية تفاعلية

#### 6️⃣ سجلات التدقيق (Audit Logs) ⏳
- تسجيل جميع العمليات
- تتبع التعديلات
- IP Address & User tracking

---

## 🛠️ التقنيات المستخدمة

```
┌─────────────────────────────────────┐
│  Frontend Stack                     │
├─────────────────────────────────────┤
│  ⚛️  React 18.3.1                   │
│  📘 TypeScript 5.8.3                │
│  ⚡ Vite 5.4.19                     │
│  🎨 TailwindCSS 3.4.17              │
│  🧩 Shadcn UI                       │
│  📋 React Hook Form + Zod           │
│  🔄 TanStack Query (React Query)    │
│  🧭 React Router v6                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Backend & Database                 │
├─────────────────────────────────────┤
│  🗄️  Supabase (PostgreSQL)          │
│  🔐 Supabase Auth                   │
│  📁 Supabase Storage                │
│  🔒 Row Level Security (RLS)        │
└─────────────────────────────────────┘
```

---

## 🚀 التثبيت

### المتطلبات الأساسية

- Node.js 18+ 
- npm / pnpm / yarn / bun
- حساب Supabase (مجاني)

### خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/ahmedgfathy/masr-pro-crm.git
cd masr-pro-crm

# 2. تثبيت المكتبات
pnpm install
# أو
npm install

# 3. إعداد ملف البيئة
cp .env.example .env

# 4. تعديل ملف .env بمعلومات Supabase الخاصة بك
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_key

# 5. تشغيل المشروع
pnpm dev
# أو
npm run dev
```

### إعداد Supabase

1. إنشاء مشروع جديد على [supabase.com](https://supabase.com)
2. نسخ URL و API Key
3. تنفيذ SQL Migration من `supabase/migrations/`
4. تفعيل Email Auth في الإعدادات

---

## 💻 الاستخدام

### تشغيل المشروع

```bash
# بيئة التطوير
pnpm dev

# بناء للإنتاج
pnpm build

# معاينة البناء
pnpm preview

# فحص الأكواد
pnpm lint
```

### الصفحات المتاحة

```
/                → لوحة التحكم
/auth            → تسجيل الدخول/التسجيل
/leads           → إدارة العملاء ✅
/properties      → إدارة العقارات ⏳
/calendar        → التقويم ⏳
/reports         → التقارير ⏳
/settings        → الإعدادات ⏳
```

---

## 📚 التوثيق

### التوثيق الكامل
اقرأ [DOCS.md](./DOCS.md) للحصول على التوثيق الشامل للمشروع.

### آخر التحديثات
راجع [UPDATES.md](./UPDATES.md) لمعرفة آخر التحديثات والتحسينات.

### بنية المشروع

```
masr-pro-crm/
├── src/
│   ├── components/        # المكونات القابلة لإعادة الاستخدام
│   │   ├── dashboard/     # مكونات لوحة التحكم
│   │   ├── layout/        # Header, Sidebar
│   │   ├── leads/         # مكونات العملاء ✅
│   │   └── ui/            # Shadcn UI components
│   ├── pages/             # صفحات التطبيق
│   ├── hooks/             # Custom React Hooks
│   ├── integrations/      # Supabase integration
│   ├── lib/               # وظائف مساعدة
│   └── index.css          # Styles + Theme
├── supabase/
│   └── migrations/        # Database migrations
├── public/                # Static files
└── ...config files
```

---

## 🔐 نظام الصلاحيات

### الأدوار المتاحة

| الدور | الصلاحيات |
|------|-----------|
| **Owner (المالك)** | صلاحيات كاملة - إدارة المستخدمين والأدوار |
| **Manager (المدير)** | إدارة الفريق - حذف البيانات - عرض سجلات التدقيق |
| **Team Leader (قائد الفريق)** | إدارة فريقه - تعديل بيانات الفريق |
| **Sales (مسؤول مبيعات)** | إدارة عملائه فقط - إضافة بيانات جديدة |

---

## 🌟 المميزات القادمة

- [ ] 📱 تطبيق موبايل (React Native)
- [ ] 📧 نظام إشعارات Email/SMS
- [ ] 📊 رسوم بيانية متقدمة
- [ ] 🤖 تكامل AI لتحليل العملاء
- [ ] 💬 نظام محادثات داخلي
- [ ] 📍 تكامل خرائط Google
- [ ] 💳 نظام الفواتير والمدفوعات
- [ ] 🔗 API للتكامل مع أنظمة أخرى

---

## 🤝 المساهمة

نرحب بمساهماتكم! 

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

---

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT.

---

## 👨‍💻 المطور

**Ahmed Gomaa**
- GitHub: [@ahmedgfathy](https://github.com/ahmedgfathy)

---

## 🙏 شكر خاص

- [React](https://react.dev)
- [Supabase](https://supabase.com)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

<div align="center">

**⭐ إذا أعجبك المشروع، لا تنسَ إعطاءه نجمة! ⭐**

Made with ❤️ for the Egyptian Real Estate Market

</div>
