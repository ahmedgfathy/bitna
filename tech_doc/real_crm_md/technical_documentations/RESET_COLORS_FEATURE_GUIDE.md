# Reset to Default Colors - Feature Guide

## 🎨 New Feature: Reset Button

### What It Does
The **"Reset to Default Colors"** button restores your brand colors to the original default values that came with the system.

### Default Colors
- **Primary Color**: `#1877f2` (Facebook Blue)
- **Secondary Color**: `#2563eb` (Bright Blue)

---

## 📍 Location
The reset button is located in the **Company Branding** section, next to the "Save Branding" button:

```
┌──────────────────────────────────────────────────────┐
│  Company Branding                                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Logo Upload Area]                                  │
│                                                      │
│  Company Name: [______________]                      │
│                                                      │
│  Primary Color:   [🎨] [#FF5733]  [→]               │
│  Secondary Color: [🎨] [#900C3F]  [←]               │
│                                                      │
│  [↻ Reset to Default Colors]  [✓ Save Branding]    │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 How to Use

### Step 1: Click the Reset Button
Click the **"Reset to Default Colors"** button (with the ↻ icon)

### Step 2: Confirm Your Choice
A confirmation dialog will appear:
```
┌─────────────────────────────────────┐
│  Are you sure you want to reset    │
│  to default colors? This will not   │
│  save automatically - you need to   │
│  click Save Branding after.         │
│                                     │
│         [Cancel]  [OK]              │
└─────────────────────────────────────┘
```

### Step 3: See the Change
After clicking OK:
- ✅ Both color pickers update to default colors
- ✅ Both text fields update to show hex codes
- ✅ A success toast appears at top-right
- ⚠️ **Changes are NOT saved yet!**

### Step 4: Save to Apply
Click **"Save Branding"** to permanently save the reset colors

### Step 5: Refresh to See Site-Wide
After saving, refresh the page to see the default colors applied throughout the CRM

---

## 💡 Use Cases

### Scenario 1: Testing Different Colors
You're experimenting with different brand colors and want to go back to the starting point:
1. Try various colors
2. Don't like them
3. Click "Reset to Default Colors"
4. Back to the original look!

### Scenario 2: Mistake Correction
You accidentally changed colors and can't remember the originals:
1. Click "Reset to Default Colors"
2. Instantly back to defaults
3. Save if you want to keep them

### Scenario 3: Multiple Companies
Using the CRM for different brands and want to clear customization:
1. Reset colors to neutral defaults
2. Start fresh with new brand colors
3. No need to remember previous settings

---

## 🔄 Button Behavior

### What Happens When You Click:

```javascript
1. Confirmation dialog appears
   ↓
2. If user clicks Cancel → Nothing changes
   ↓
3. If user clicks OK:
   ↓
4. Primary color picker → #1877f2
   ↓
5. Primary text field → #1877F2
   ↓
6. Secondary color picker → #2563eb
   ↓
7. Secondary text field → #2563EB
   ↓
8. Toast notification appears
   ↓
9. Colors NOT yet saved to database
   ↓
10. User must click "Save Branding"
```

### Safety Features:
- ✅ **Confirmation required** - Prevents accidental resets
- ✅ **No automatic save** - You control when to apply
- ✅ **Visual feedback** - Toast notification confirms action
- ✅ **Reminder message** - Tells you to save after reset

---

## 🎨 Visual Example

### Before Reset (Custom Colors):
```
Primary Color:   [🎨 Orange] [#FF5733]
Secondary Color: [🎨 Red]    [#900C3F]
```

### After Reset (Default Colors):
```
Primary Color:   [🎨 Blue] [#1877F2]
Secondary Color: [🎨 Blue] [#2563EB]
```

### Interface Changes After Save + Refresh:
- Buttons: Orange/Red gradient → Blue gradient ✓
- Links: Orange → Blue ✓
- Active menu: Orange/Red → Blue ✓
- Badges: Orange → Blue ✓

---

## 📱 Button Styling

### Normal State:
```
┌──────────────────────────────────┐
│ ↻ Reset to Default Colors        │ ← Gray outline
└──────────────────────────────────┘
```

### Hover State:
```
┌──────────────────────────────────┐
│ ↻ Reset to Default Colors        │ ← Darker background
└──────────────────────────────────┘
```

---

## ⚙️ Technical Details

### Default Values (from Django model):
```python
primary_color = models.CharField(
    default="#1877f2",  # Facebook blue
)
secondary_color = models.CharField(
    default="#2563eb",  # Bright blue
)
```

### JavaScript Implementation:
```javascript
function resetToDefaultColors() {
    const defaultPrimary = '#1877f2';
    const defaultSecondary = '#2563eb';
    
    // Ask for confirmation
    const confirmReset = confirm('Are you sure...?');
    
    if (confirmReset) {
        // Update color pickers
        document.getElementById('primary_color').value = defaultPrimary;
        document.getElementById('secondary_color').value = defaultSecondary;
        
        // Update text fields
        document.getElementById('primary_color_text').value = defaultPrimary.toUpperCase();
        document.getElementById('secondary_color_text').value = defaultSecondary.toUpperCase();
        
        // Show confirmation
        showColorCopyMessage('Colors reset!');
    }
}
```

---

## ❓ FAQ

**Q: Will this reset my logo too?**
A: No, only the colors. Your logo stays unchanged.

**Q: Can I undo after saving?**
A: Yes! Just set your colors again or use the reset button to go back to defaults.

**Q: Do I need to refresh the page?**
A: Not to see the color change in the form, but yes to see the colors applied throughout the CRM interface.

**Q: What if I click reset by mistake?**
A: You'll see a confirmation dialog. Click "Cancel" to abort. Even if you click OK, the colors aren't saved until you click "Save Branding".

**Q: Can I customize the default colors?**
A: Yes, a developer can change the default values in the Django model (`authentication/models.py`).

**Q: Does this affect other users?**
A: Once you save, the colors apply to ALL users (company-wide setting).

**Q: What happens if I reset then close the page without saving?**
A: Nothing. Your current saved colors remain unchanged.

---

## 🎯 Quick Reference

| Action | Button | Saves? | Refresh Needed? |
|--------|--------|--------|-----------------|
| Click Reset | ↻ Reset to Default Colors | ❌ No | ❌ No |
| After Reset, Click Save | ✓ Save Branding | ✅ Yes | ✅ Yes |
| See Colors in Form | - | - | ❌ No |
| See Colors Site-Wide | - | - | ✅ Yes |

---

## 🌟 Pro Tips

1. **Test First**: Reset and see the preview in the form before saving
2. **Screenshot**: Take a screenshot of your custom colors before resetting (in case you want them back)
3. **Copy Codes**: Copy your current hex codes to a text file for safekeeping
4. **Refresh After Save**: Always refresh the page after saving to see colors applied
5. **Clear Cache**: If colors don't update, try hard refresh (Ctrl+Shift+R)

---

## 🎉 Summary

**The Reset Button**:
- ✅ Restores original blue colors (`#1877f2` and `#2563eb`)
- ✅ Requires confirmation before action
- ✅ Shows toast notification
- ✅ Doesn't auto-save (you control it)
- ✅ Safe to use (can always change again)
- ✅ Helpful when testing or making mistakes

**Perfect for**: Testing colors, recovering from mistakes, starting fresh with new branding!
