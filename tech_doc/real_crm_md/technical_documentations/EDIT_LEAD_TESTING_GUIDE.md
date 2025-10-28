# Edit Lead Form - Translation Testing Guide

## Quick Test Instructions

### 1. Access the Edit Lead Page in Arabic

**URL Pattern**: `http://localhost:8000/ar/leads/<lead_id>/edit/`

**Example**: `http://localhost:8000/ar/leads/c746a186-87db-4697-b78b-3b0e4b77df7c/edit/`

### 2. What You Should See in Arabic

#### **Top Section** (Header & Navigation)
```
الرئيسية > العملاء المحتملين > [اسم العميل] > تعديل العميل المحتمل
                                                    ▲ Breadcrumb in Arabic

تعديل العميل المحتمل                               [◄ العميل السابق] [العميل التالي ►]
▲ Page title                                      ▲ Navigation arrows with Arabic tooltips

تحديث معلومات العميل المحتمل لـ [الاسم]
▲ Description

[👁 عرض العميل المحتمل]  [◄ العودة إلى العملاء المحتملين]
▲ Action buttons
```

#### **Form Sections** (Main Content)

##### Section 1: المعلومات الأساسية (Basic Information)
```
┌─ المعلومات الأساسية ────────────────────────────┐
│                                                  │
│  [الاسم الأول*]          [اسم العائلة*]         │
│  [رقم الجوال*]           [عنوان البريد الإلكتروني] │
│  [رقم الهاتف]            [الشركة]               │
│  [المسمى الوظيفي]                                │
│  [مصدر العميل المحتمل ▼] [نوع العميل المحتمل ▼]  │
│  [الحالة ▼]              [الأولوية ▼]           │
│  [تعيين إلى ▼]           [درجة الحرارة ▼]        │
│                                                  │
└──────────────────────────────────────────────────┘
```

##### Section 2: الاهتمامات العقارية (Property Interests)
```
┌─ الاهتمامات العقارية ───────────────────────────┐
│                                                  │
│  [نطاق الميزانية]        [نوع العقار]          │
│  [المواقع المفضلة]       (textarea)             │
│  [المتطلبات المحددة]     (textarea)             │
│  [ملاحظات عامة]          (textarea)             │
│                                                  │
└──────────────────────────────────────────────────┘
```

##### Section 3: تفضيلات التواصل (Communication Preferences)
```
┌─ تفضيلات التواصل ────────────────────────────────┐
│                                                  │
│  [طريقة الاتصال المفضلة ▼]  Options:            │
│    • البريد الإلكتروني                          │
│    • الهاتف                                     │
│    • رسالة نصية                                 │
│    • واتساب                                     │
│                                                  │
│  [أفضل وقت للاتصال]                             │
│  [نقاط العميل المحتمل (0-100)]                  │
│  [الوسوم]                                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

#### **Sidebar** (Right Side)

##### Actions Card
```
┌─ الإجراءات ──────────────────────┐
│                                  │
│  [✓ تحديث العميل المحتمل]       │
│  [👁 عرض العميل المحتمل]        │
│  [📋 جميع العملاء المحتملين]   │
│  [↻ إعادة التعيين]              │
│                                  │
└──────────────────────────────────┘
```

##### Lead Information Card
```
┌─ معلومات العميل المحتمل ─────────┐
│                                  │
│  رقم العميل المحتمل: c746a18     │
│  تم الإنشاء: 01 أكتوبر، 2025     │
│  آخر تحديث: 18 أكتوبر، 2025      │
│  أنشئ بواسطة: Ahmed Gomaa        │
│                                  │
└──────────────────────────────────┘
```

##### Tips Card
```
┌─ نصائح ──────────────────────────┐
│                                  │
│  ✓ قم بتحديث معلومات الاتصال    │
│    للحفاظ على سجلات دقيقة        │
│                                  │
│  ✓ اضبط الأولوية ودرجة الحرارة  │
│    بناءً على التفاعلات الأخيرة  │
│                                  │
│  ✓ أضف ملاحظات مفصلة لتتبع      │
│    تقدم العميل المحتمل           │
│                                  │
│  ✓ استخدم الوسوم لتصنيف العملاء │
│    المحتملين لتنظيم أفضل        │
│                                  │
└──────────────────────────────────┘
```

##### Activity Timeline Card
```
┌─ الجدول الزمني للأنشطة ──────────┐
│                                  │
│  [Timeline content here...]      │
│                                  │
└──────────────────────────────────┘
```

## Visual Comparison

### BEFORE (English) ❌
```
Edit Lead
Update lead information for John Doe

Basic Information
  First Name*
  Last Name*
  Mobile Number*
  ...
```

### AFTER (Arabic) ✅
```
تعديل العميل المحتمل
تحديث معلومات العميل المحتمل لـ جون دو

المعلومات الأساسية
  الاسم الأول*
  اسم العائلة*
  رقم الجوال*
  ...
```

## Dropdown Placeholders in Arabic

| English | Arabic |
|---------|--------|
| Choose source... | اختر المصدر... |
| Choose type... | اختر النوع... |
| Choose status... | (No translation needed - populated from DB) |
| Choose priority... | اختر الأولوية... |
| Choose temperature... | اختر درجة الحرارة... |
| Unassigned | غير مُعيّن |

## Contact Method Options in Arabic

| English | Arabic |
|---------|--------|
| Email | البريد الإلكتروني |
| Phone | الهاتف |
| SMS | رسالة نصية |
| WhatsApp | واتساب |

## Navigation Tooltips

| English | Arabic |
|---------|--------|
| Previous Lead | العميل السابق |
| No Previous Lead | لا يوجد عميل سابق |
| Next Lead | العميل التالي |
| No Next Lead | لا يوجد عميل تالٍ |

## Testing Checklist

### Visual Elements
- [ ] Page title is in Arabic
- [ ] Breadcrumb navigation is in Arabic (except lead name)
- [ ] All section headers are in Arabic
- [ ] All form labels are in Arabic
- [ ] All buttons are in Arabic
- [ ] All placeholders are in Arabic
- [ ] Tooltips on navigation arrows are in Arabic
- [ ] Tips content is in Arabic
- [ ] Sidebar headers are in Arabic

### Functionality
- [ ] Form submits correctly with Arabic interface
- [ ] Required field validation works
- [ ] Dropdown selections work
- [ ] Navigation between leads works
- [ ] "Update Lead" button updates the lead
- [ ] "Reset Changes" button resets the form
- [ ] "View Lead" button navigates to detail page
- [ ] "Back to Leads" button returns to list

### RTL (Right-to-Left) Layout
Note: The form fields should maintain LTR input but the labels should be RTL.
- [ ] Labels align correctly (right-to-left)
- [ ] Input fields work correctly
- [ ] Buttons align correctly
- [ ] Sidebar is on the correct side

## Common Issues to Check

### ❌ Not Translated
If you see English text, check:
1. Browser cache - hard refresh (Cmd+Shift+R)
2. Django static files - run `collectstatic`
3. Language switcher - ensure Arabic is selected
4. URL - must start with `/ar/`

### ❌ Missing Translations
If you see translation keys like `msgid "..."`, check:
1. django.mo is compiled - run `compilemessages -l ar`
2. Django server is restarted
3. Translation exists in django.po

### ❌ Layout Issues
If layout looks broken:
1. Check RTL CSS is loaded
2. Verify Bootstrap RTL support
3. Test on different browsers

## Screenshots Expected

Take screenshots of:
1. ✅ Full page view showing Arabic header and form
2. ✅ Basic Information section with Arabic labels
3. ✅ Property Interests section with Arabic labels
4. ✅ Communication Preferences section with Arabic options
5. ✅ Sidebar with Actions, Lead Info, and Tips in Arabic
6. ✅ Navigation arrows with Arabic tooltips (hover to show)

## Success Criteria

The translation is successful if:
- ✅ **Zero English text** appears on the page (except user data like names)
- ✅ All form labels display in Arabic
- ✅ All buttons display in Arabic
- ✅ All placeholders display in Arabic
- ✅ All tooltips display in Arabic
- ✅ Tips content displays in Arabic
- ✅ Form functionality works correctly

---

**Ready to test!** 🚀

Navigate to: `http://localhost:8000/ar/leads/<lead_id>/edit/`
