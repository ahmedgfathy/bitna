# 📋 LEADS Permissions System Explained

## 🎯 **Understanding Lead Permissions for Sales Profile**

When you see these permissions in a sales profile, here's what each one means:

### 📊 **Permission Scope Explanation**

#### **"Own" vs "Team" vs "All"**
- **OWN**: Only leads assigned to YOU specifically
- **TEAM**: All leads assigned to anyone in your team
- **ALL**: Every lead in the entire company/system

---

## 🔐 **Lead Permissions Breakdown**

### 1. **All leads (all)** 
- **What it means**: Can view EVERY lead in the entire company
- **Who typically has this**: OWNER, ADMIN, MANAGER
- **Sales profile**: ❌ Usually NOT granted (too broad access)

### 2. **Assign leads (team)**
- **What it means**: Can assign leads to other team members
- **Who typically has this**: TEAM_LEADER, MANAGER
- **Sales profile**: ❌ Usually NOT granted (management function)

### 3. **Create leads (own)**
- **What it means**: Can create new leads that get assigned to themselves
- **Who typically has this**: SALES, MARKETER, TEAM_LEADER
- **Sales profile**: ✅ **ESSENTIAL** - Sales people need to create leads

### 4. **Create leads (team)** 
- **What it means**: Can create leads and assign them to any team member
- **Who typically has this**: TEAM_LEADER, MANAGER
- **Sales profile**: ❌ Usually NOT granted (management function)

### 5. **Edit leads (own)**
- **What it means**: Can modify/update leads assigned to themselves
- **Who typically has this**: SALES, MARKETER, TEAM_LEADER
- **Sales profile**: ✅ **ESSENTIAL** - Sales people need to update their leads

### 6. **Edit leads (team)**
- **What it means**: Can modify any lead assigned to team members
- **Who typically has this**: TEAM_LEADER, MANAGER
- **Sales profile**: ❌ Usually NOT granted (management function)

### 7. **View leads (own)**
- **What it means**: Can see/read leads assigned to themselves
- **Who typically has this**: SALES, MARKETER, TEAM_LEADER
- **Sales profile**: ✅ **ESSENTIAL** - Must see their own leads

### 8. **View leads (team)**
- **What it means**: Can see all leads assigned to team members
- **Who typically has this**: TEAM_LEADER, MANAGER
- **Sales profile**: ⚠️ **OPTIONAL** - Depends on company policy

---

## 🏷️ **Missing Permission: DELETE**

You asked about **delete** permissions - this is handled by:
- **Delete leads (own)**: Delete leads assigned to themselves
- **Delete leads (team)**: Delete any team member's leads
- **Delete leads (all)**: Delete any lead in the system

**Note**: Delete permissions are typically restricted to MANAGER level and above for data security.

---

## 🎯 **Recommended Sales Profile Setup**

For a **SALES** role that can view, edit, and create leads:

### ✅ **GRANT These Permissions:**
```
✓ create leads (own)     - Create new leads for themselves
✓ edit leads (own)       - Update their own leads
✓ view leads (own)       - See their assigned leads
✓ view leads (team)      - OPTIONAL: See team leads for collaboration
```

### ❌ **DO NOT Grant:**
```
✗ All leads (all)        - Too broad access
✗ assign leads (team)    - Management function
✗ create leads (team)    - Management function  
✗ edit leads (team)      - Management function
✗ delete leads (*)       - Security risk
```

---

## 🛠️ **How to Configure a Sales Profile**

### **Step 1: Access Role Management**
1. Go to **Settings** → **Role Management**
2. Find the **SALES** role or create a new role

### **Step 2: Configure Lead Permissions**
```yaml
SALES Role Permissions:
  leads.view: ✓ (own scope)
  leads.create: ✓ (own scope)  
  leads.update: ✓ (own scope)
  leads.delete: ❌ (not granted)
  leads.assign: ❌ (not granted)
```

### **Step 3: Optional Team Collaboration**
If you want sales people to see team leads for collaboration:
```yaml
Additional Permission:
  leads.view: ✓ (team scope)
```

---

## 📊 **Permission Hierarchy Examples**

### **SALES (Level 4)**
```
✓ View own leads
✓ Create own leads  
✓ Edit own leads
✗ Delete any leads
✗ Assign leads
✗ View all leads
```

### **TEAM_LEADER (Level 3)**
```
✓ View team leads
✓ Create team leads
✓ Edit team leads
✓ Assign leads to team
✓ Delete own leads
✗ View all company leads
```

### **MANAGER (Level 2)**
```
✓ View department leads
✓ Create department leads
✓ Edit department leads
✓ Delete team leads
✓ Assign leads to department
✗ View other departments
```

### **ADMIN/OWNER (Level 1)**
```
✓ View all leads
✓ Create any leads
✓ Edit any leads
✓ Delete any leads
✓ Assign any leads
✓ Manage all users
```

---

## 🔍 **Current System Behavior**

Based on the code analysis, here's what actually happens:

### **SALES Role Currently Gets:**
- ✅ `leads.view` (own leads only)
- ✅ `leads.create` (own leads only)
- ✅ `leads.update` (own leads only)
- ✅ `leads.export` (own leads only)
- ❌ NO delete permissions
- ❌ NO team-level permissions

### **To Enable Team Collaboration:**
You would need to modify the SALES role to include:
- `leads.view` with team scope
- Possibly `leads.update` with team scope

---

## ⚡ **Quick Setup Commands**

If you want to modify roles programmatically, you can use the admin interface or API calls to update permissions for specific roles.

The system is designed to be **secure by default** - sales people only see their own leads unless explicitly granted broader access.
