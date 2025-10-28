# Phase 1: Foundation & Role System

## 🎯 **Objectives**
1. Fix current action buttons (View, Edit, Delete leads)
2. Implement comprehensive role-based user system
3. Create user management interface
4. Set up basic permission framework

## 🔧 **Current Issues to Fix**

### **1. Lead Action Buttons**
- **View Button**: Not opening lead details modal
- **Edit Button**: Not opening edit form
- **Delete Button**: Not showing confirmation dialog
- **Add Lead**: May have form validation issues

### **2. Authentication Flow**
- First user registration should automatically become **Owner**
- Subsequent registrations need approval workflow
- Role assignment during user creation

## 🗄️ **Database Schema Updates**

### **New Tables to Create:**

#### **1. Roles Table**
```sql
roles {
  id: String (Primary Key)
  name: String (Owner, Manager, TeamLeader, Employee)
  description: String
  level: Int (1=Owner, 2=Manager, 3=TeamLeader, 4=Employee)
  permissions: Json (Array of permission strings)
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### **2. Departments Table**
```sql
departments {
  id: String (Primary Key)
  name: String (Sales, Marketing, Support, etc.)
  description: String
  managerId: String (Foreign Key to User)
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### **3. Teams Table**
```sql
teams {
  id: String (Primary Key)
  name: String
  departmentId: String (Foreign Key to Department)
  leaderId: String (Foreign Key to User)
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### **4. Updated User Table**
```sql
users {
  id: String (Primary Key)
  email: String (Unique)
  name: String
  password: String
  roleId: String (Foreign Key to Role)
  departmentId: String? (Foreign Key to Department)
  teamId: String? (Foreign Key to Team)
  managerId: String? (Foreign Key to User - their direct manager)
  isActive: Boolean (Default: false - needs approval)
  isFirstUser: Boolean (Default: false - first user becomes owner)
  createdAt: DateTime
  updatedAt: DateTime
}
```

## 🎭 **Role Definitions**

### **1. Owner (Level 1)**
- **Description**: Company owner/founder with full system access
- **Permissions**: ALL (Full CRUD on everything)
- **Can Manage**: Everyone in the system
- **Reports**: Complete system overview

### **2. Manager (Level 2)**
- **Description**: Department head managing teams and employees
- **Permissions**: Full CRUD within their department
- **Can Manage**: Team Leaders and Employees in their department
- **Reports**: Department-wide analytics

### **3. Team Leader (Level 3)**
- **Description**: Team supervisor managing a group of employees
- **Permissions**: CRUD on team resources, VIEW on department
- **Can Manage**: Employees in their team
- **Reports**: Team performance metrics

### **4. Employee (Level 4)**
- **Description**: Regular employees with limited access
- **Permissions**: CREATE/EDIT own leads, VIEW team leads
- **Can Manage**: Only their own assigned leads
- **Reports**: Personal performance metrics

## 🔐 **Permission System**

### **Permission Categories:**
- **LEADS**: `leads:view`, `leads:create`, `leads:edit`, `leads:delete`
- **USERS**: `users:view`, `users:create`, `users:edit`, `users:delete`
- **REPORTS**: `reports:view`, `reports:export`
- **SETTINGS**: `settings:view`, `settings:edit`
- **AUDIT**: `audit:view`

### **Permission Matrix:**
| Role | Leads | Users | Reports | Settings | Audit |
|------|-------|-------|---------|----------|-------|
| Owner | ALL | ALL | ALL | ALL | ALL |
| Manager | Department | Team Only | Department | Limited | Department |
| Team Leader | Team Only | Team Only | Team Only | None | Team Only |
| Employee | Own Only | View Only | Own Only | None | None |

## 🛠️ **Implementation Tasks**

### **Task 1: Fix Current Issues** (Priority: HIGH)
1. Debug and fix lead action buttons
2. Implement proper modal dialogs
3. Add form validation and error handling
4. Test CRUD operations

### **Task 2: Database Migration**
1. Create new role-based tables
2. Update existing User model
3. Create relationships between tables
4. Migrate existing data

### **Task 3: Authentication Enhancement**
1. Modify registration to handle roles
2. Implement first-user-becomes-owner logic
3. Add user approval workflow
4. Create role assignment interface

### **Task 4: Basic UI Updates**
1. Add role indicators to user interface
2. Create user management dashboard
3. Implement role-based navigation
4. Add permission checks to UI components

## 📱 **New UI Components Needed**

### **1. User Management Dashboard**
- List all users with roles
- Add/Edit/Delete users
- Approve pending registrations
- Assign roles and departments

### **2. Role Assignment Interface**
- Role selection dropdown
- Department assignment
- Team assignment
- Manager assignment

### **3. Enhanced Navigation**
- Role-based menu items
- Permission-aware buttons
- User profile with role indicator

## ✅ **Success Criteria**
- [ ] All lead action buttons work properly
- [ ] Role system is fully functional
- [ ] First user automatically becomes Owner
- [ ] New users require approval
- [ ] User management interface is complete
- [ ] Basic permissions are enforced

## 🔄 **Next Phase**
After Phase 1 completion, proceed to **Phase 2: Advanced Permissions (RBAC)**

---
*This phase establishes the foundation for the enterprise CRM system.*
