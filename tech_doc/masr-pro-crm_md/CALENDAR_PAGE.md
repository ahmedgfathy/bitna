# صفحة التقويم والأحداث - Calendar Page

## 📅 نظرة عامة

تم إنشاء صفحة التقويم الكاملة لإدارة الأحداث والمواعيد في نظام CRM العقاري.

## ✨ الميزات الرئيسية

### 1. **عرض التقويم الشهري**
- 📆 تقويم شهري كامل مع أيام الأسبوع بالعربية
- 🎨 تمييز اليوم الحالي بحدود زرقاء وخلفية مميزة
- 📊 عرض الأحداث على كل يوم (حتى 2 حدث)
- 🔢 عداد "+X المزيد" للأيام التي تحتوي أكثر من حدثين

### 2. **إحصائيات الأحداث**
أربع بطاقات إحصائية:
- 📋 **جميع الأحداث**: عدد الأحداث الكلي للشهر المحدد
- ⏰ **قادمة**: الأحداث التي لم تكتمل بعد
- ✅ **مكتملة**: الأحداث المنجزة
- 📆 **هذا الشهر**: عدد أحداث الشهر الحالي

### 3. **التنقل والفلترة**
- ⬅️➡️ أزرار التنقل بين الأشهر
- 📍 زر "اليوم" للعودة للتاريخ الحالي
- 🔍 **فلتر حسب النوع**: معاينة، اجتماع، مكالمة، متابعة، أخرى
- ⚙️ **فلتر حسب الحالة**: جميع الأحداث، قادمة، مكتملة

### 4. **الأحداث القادمة**
- 📋 قائمة بالأحداث القادمة (حتى 6 أحداث)
- 🎨 بطاقات ملونة حسب نوع الحدث
- 📅 عرض التاريخ والوقت والموقع
- 🖱️ قابلة للنقر لفتح التفاصيل

### 5. **إضافة حدث جديد**
نموذج كامل يحتوي على:
- ✏️ عنوان الحدث (مطلوب)
- 🏷️ نوع الحدث (معاينة/اجتماع/مكالمة/متابعة/أخرى)
- 🕐 وقت البداية والنهاية (datetime-local)
- 📍 الموقع (اختياري)
- 📝 الوصف (اختياري)
- ✅ التحقق: وقت النهاية > وقت البداية

### 6. **تعديل وحذف الأحداث**
- ✏️ تعديل جميع تفاصيل الحدث
- ✅ تبديل حالة الاكتمال
- 🗑️ حذف الحدث مع تأكيد بالعربية
- 🔄 تحديث تلقائي للبيانات بعد التعديل

### 7. **نظام الإشعارات** 🔔
في Header الرئيسي:
- 🔴 نقطة حمراء متحركة عند وجود أحداث قادمة
- 🔢 Badge يعرض عدد الأحداث القادمة
- 📋 قائمة منسدلة للإشعارات تحتوي على:
  - الأحداث القادمة خلال 7 أيام
  - وقت نسبي (بعد ساعة، غداً، بعد 3 أيام)
  - أيقونات مميزة لكل نوع حدث
  - الموقع إن وُجد
- 🔄 تحديث تلقائي كل 5 دقائق
- 🖱️ النقر على إشعار ينقلك لصفحة التقويم

## 📂 الملفات المنشأة

### 1. `/src/pages/Calendar.tsx` (450+ سطر)
الصفحة الرئيسية للتقويم:
```typescript
- State Management: events, filteredEvents, selectedDate, viewMode
- Fetch Functions: fetchEvents(), applyFilters()
- Calendar Logic: getDaysInMonth(), getEventsForDay()
- Navigation: goToPreviousMonth(), goToNextMonth(), goToToday()
- Formatters: formatTime(), formatDate(), formatEventTime()
```

### 2. `/src/components/calendar/AddEventDialog.tsx` (220 سطر)
نافذة إضافة حدث جديد:
```typescript
interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  leadId?: string;        // ربط بعميل (اختياري)
  propertyId?: string;    // ربط بعقار (اختياري)
}
```

### 3. `/src/components/calendar/EditEventDialog.tsx` (294 سطر)
نافذة تعديل وحذف الأحداث:
```typescript
interface EditEventDialogProps {
  event: Event;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
```

### 4. `/src/components/layout/Header.tsx` (محدّث)
إضافة نظام الإشعارات:
```typescript
- upcomingEvents: Event[]
- notificationOpen: boolean
- fetchUpcomingEvents(): يجلب الأحداث القادمة خلال 7 أيام
- formatEventTime(): تنسيق الوقت النسبي
- Popover: قائمة الإشعارات المنسدلة
```

### 5. `/src/App.tsx` (محدّث)
إضافة المسار `/calendar`

## 🎨 أنواع الأحداث وألوانها

```typescript
const eventTypeLabels = {
  viewing: "معاينة عقار",    // 🏠 أزرق
  meeting: "اجتماع",         // 🤝 بنفسجي
  call: "مكالمة",            // 📞 أخضر
  followup: "متابعة",        // 🔄 برتقالي
  other: "أخرى",             // 📌 رمادي
};

const eventTypeColors = {
  viewing: "bg-blue-100 text-blue-800",
  meeting: "bg-purple-100 text-purple-800",
  call: "bg-green-100 text-green-800",
  followup: "bg-orange-100 text-orange-800",
  other: "bg-gray-100 text-gray-800",
};
```

## 🔗 الربط مع الوحدات الأخرى

### من صفحة Leads:
```typescript
// في LeadDetails.tsx - تبويب الأحداث
<AddEventDialog 
  leadId={lead.id}      // ربط الحدث بالعميل
  onSuccess={fetchLeadData} 
/>
```

### من صفحة Properties (مستقبلاً):
```typescript
<AddEventDialog 
  propertyId={property.id}  // ربط الحدث بالعقار
  onSuccess={fetchPropertyData} 
/>
```

## 📊 مخطط قاعدة البيانات

```sql
CREATE TABLE public.events (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  event_type event_type NOT NULL,
  description TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  location TEXT,
  related_lead_id UUID REFERENCES leads(id),
  related_property_id UUID REFERENCES properties(id),
  assigned_to UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);
```

## 🚀 كيفية الاستخدام

### 1. الوصول للصفحة:
```
http://localhost:8080/calendar
```

### 2. إضافة حدث:
1. اضغط "إضافة حدث جديد"
2. املأ عنوان الحدث (مطلوب)
3. اختر نوع الحدث
4. حدد وقت البداية والنهاية
5. أضف الموقع والوصف (اختياري)
6. اضغط "إضافة الحدث"

### 3. عرض الأحداث:
- في التقويم: انقر على أي حدث في اليوم
- في القائمة: انقر على بطاقة الحدث
- من الإشعارات: انقر على الإشعار

### 4. تعديل حدث:
1. انقر على الحدث لفتح نافذة التعديل
2. عدّل البيانات المطلوبة
3. يمكنك تحديده كمكتمل
4. اضغط "حفظ التعديلات"
5. أو اضغط "حذف الحدث" للحذف (يطلب تأكيد)

### 5. الفلترة:
- **حسب النوع**: اختر معاينة/اجتماع/مكالمة/إلخ
- **حسب الحالة**: اختر قادمة/مكتملة/الكل
- **حسب التاريخ**: انتقل بين الأشهر

### 6. الإشعارات:
- انقر على أيقونة الجرس 🔔 في Header
- شاهد الأحداث القادمة خلال 7 أيام
- انقر على إشعار للانتقال للتقويم
- تحديث تلقائي كل 5 دقائق

## 🎯 الميزات التقنية

### State Management:
```typescript
const [events, setEvents] = useState<Event[]>([]);
const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
const [selectedDate, setSelectedDate] = useState(new Date());
const [currentMonth, setCurrentMonth] = useState(new Date());
const [filterType, setFilterType] = useState<EventType | "all">("all");
const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
```

### Real-time Updates:
- تحديث فوري بعد الإضافة/التعديل/الحذف
- جلب البيانات من Supabase مع relations
- تحديث الإشعارات كل 5 دقائق

### Responsive Design:
- Grid متجاوب للإحصائيات (1-4 أعمدة)
- Grid متجاوب للأحداث القادمة (1-3 أعمدة)
- تقويم يعمل على جميع الأحجام
- فلاتر متجاوبة للموبايل

### Validation:
```typescript
const eventSchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  event_type: z.string(),
  start_time: z.string().min(1, "وقت البداية مطلوب"),
  end_time: z.string().min(1, "وقت النهاية مطلوب"),
  // + التحقق من end_time > start_time
});
```

## 🔒 الأمان

- **RLS Policies**: المستخدمون يرون أحداثهم وما تم تعيينه لهم
- **Authentication**: جميع العمليات تتطلب تسجيل دخول
- **Validation**: التحقق من البيانات قبل الحفظ
- **Confirmation**: تأكيد الحذف لمنع الأخطاء

## 📈 التحسينات المستقبلية

- [ ] **Drag & Drop**: سحب وإفلات الأحداث لتغيير التاريخ
- [ ] **تصدير**: تصدير الأحداث لـ Google Calendar / iCal
- [ ] **تذكيرات**: إرسال تنبيهات عبر البريد/الواتساب
- [ ] **أحداث متكررة**: دعم الأحداث المتكررة (يومي/أسبوعي/شهري)
- [ ] **عرض أسبوعي**: إضافة View mode للأسبوع واليوم
- [ ] **مشاركة**: مشاركة الأحداث مع أعضاء الفريق
- [ ] **ملاحظات الحدث**: إضافة ملاحظات لكل حدث
- [ ] **مرفقات**: رفع ملفات للأحداث
- [ ] **تقارير**: تقارير عن الأحداث المكتملة

## ✅ الاختبار

### قائمة الاختبار:
- [x] عرض التقويم الشهري بشكل صحيح
- [x] إضافة حدث جديد
- [x] تعديل حدث موجود
- [x] حذف حدث مع تأكيد
- [x] الفلترة حسب النوع
- [x] الفلترة حسب الحالة
- [x] التنقل بين الأشهر
- [x] زر "اليوم" يعمل
- [x] تمييز اليوم الحالي
- [x] عرض الأحداث على التقويم
- [x] النقر على حدث يفتح التفاصيل
- [x] عداد "+X المزيد" للأيام المزدحمة
- [x] الإحصائيات تحسب بشكل صحيح
- [x] الإشعارات تظهر الأحداث القادمة
- [x] Badge العداد على أيقونة الجرس
- [x] الوقت النسبي (بعد ساعة/غداً)
- [x] النقر على إشعار ينقل للتقويم
- [x] التحديث التلقائي كل 5 دقائق
- [x] Validation للأوقات (end > start)
- [x] حالات التحميل والأخطاء
- [x] Responsive على جميع الأحجام

## 📝 ملاحظات

1. **الإشعارات**: تظهر الأحداث القادمة خلال 7 أيام فقط
2. **الأداء**: جلب البيانات يتم مرة عند فتح الصفحة
3. **التقويم**: يبدأ الأسبوع من الأحد (محلي عربي)
4. **الوقت**: جميع الأوقات بتوقيت المستخدم المحلي
5. **الألوان**: متوافقة مع Dark Mode

## 🎉 الخلاصة

تم إنشاء صفحة تقويم كاملة مع:
- ✅ عرض تقويم شهري تفاعلي
- ✅ إدارة كاملة للأحداث (CRUD)
- ✅ نظام إشعارات متكامل
- ✅ فلترة وبحث متقدم
- ✅ تكامل مع وحدة Leads
- ✅ تصميم responsive وجميل
- ✅ توثيق شامل

**الحالة**: ✨ جاهز للإنتاج

---

**تاريخ الإنشاء**: 13 أكتوبر 2025
**الإصدار**: 1.0.0
