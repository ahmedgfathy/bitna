# User Profile Management Guide

## Overview
This guide explains how user profiles work in the Contaboo CRM system, how they're created, stored, and how to modify them.

---

## Table of Contents
1. [User Profile Structure](#user-profile-structure)
2. [How Profiles Are Created](#how-profiles-are-created)
3. [Profile Storage](#profile-storage)
4. [Modifying User Profiles](#modifying-user-profiles)
5. [Role-Based Access Control](#role-based-access-control)
6. [API Endpoints](#api-endpoints)
7. [UI Components](#ui-components)

---

## User Profile Structure

### User Data Model
Located in: `/mobile/src/types/auth.ts`

```typescript
export interface User {
  id: string;              // Unique user identifier
  mobile: string;          // Mobile number (used for login)
  name: string;            // Full name
  email?: string;          // Optional email address
  role: UserRole;          // User role (owner, manager, employee, etc.)
  tenantId: string;        // Associated tenant/company ID
  status?: UserStatus;     // Account status (active, inactive, suspended)
}

export type UserRole = 'owner' | 'manager' | 'sales_agent' | 'marketer' | 'admin_assistant' | 'employee';
export type UserStatus = 'active' | 'inactive' | 'suspended';
```

### Database Schema
Located in: `/api/prisma/schema.prisma`

```prisma
model User {
  id              String      @id @default(uuid())
  mobile          String      @unique
  name            String
  email           String?
  role            UserRole    @default(EMPLOYEE)
  status          UserStatus  @default(ACTIVE)
  temporaryPin    String?     // For first-time login
  pinResetRequired Boolean    @default(false)
  
  // Multi-tenant relationship
  tenantId        String
  tenant          Tenant      @relation(fields: [tenantId], references: [id])
  
  // Relationships
  propertiesCreated Property[]
  leadsCreated      Lead[]
  activities        Activity[]
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum UserRole {
  OWNER
  MANAGER
  SALES_AGENT
  MARKETER
  ADMIN_ASSISTANT
  EMPLOYEE
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

---

## How Profiles Are Created

### 1. Owner Profile (First User)
When a new tenant/company is registered:

```typescript
// This happens during tenant registration (to be implemented)
const owner = await prisma.user.create({
  data: {
    mobile: '01002778090',
    name: 'Ahmed Gomaa',
    email: 'ahmed@example.com',
    role: 'OWNER',
    tenantId: tenant.id,
    status: 'ACTIVE',
  }
});
```

### 2. Employee Profiles (Created by Owners/Managers)
Via the Employee Management interface:

**Frontend:** `/mobile/src/components/settings/EmployeeFormModal.tsx`
```typescript
const handleCreate = async () => {
  const newEmployee = await employeeService.createEmployee({
    name: formData.name,
    mobile: formData.mobile,
    email: formData.email,
    role: formData.role,
    status: formData.status,
  });
};
```

**Backend:** `/api/src/routes/employees.ts`
```typescript
router.post('/', tenantIsolation, async (req, res) => {
  const { name, mobile, email, role, status } = req.body;
  
  // Generate temporary 6-digit PIN
  const temporaryPin = Math.floor(100000 + Math.random() * 900000).toString();
  
  const employee = await prisma.user.create({
    data: {
      name,
      mobile,
      email,
      role: role || 'EMPLOYEE',
      status: status || 'ACTIVE',
      temporaryPin,
      pinResetRequired: true,
      tenantId: req.user!.tenantId,
    }
  });
  
  res.json({ status: 'success', data: employee });
});
```

---

## Profile Storage

### Frontend Storage (React Native)
Located in: `/mobile/src/stores/authStore.ts`

**Using Zustand for State Management:**
```typescript
interface AuthStore extends AuthState {
  user: User | null;           // Current user profile
  tenant: Tenant | null;       // Company/tenant info
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (mobile: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}
```

**Persistent Storage (AsyncStorage):**
```typescript
// Keys used for storage
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@contaboo:auth_token',
  USER_DATA: '@contaboo:user_data',
  TENANT_ID: '@contaboo:tenant_id',
};

// Saving user data
await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

// Loading user data
const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
const user = JSON.parse(userJson);
```

### Backend Storage (Database)
- **Database:** MariaDB
- **ORM:** Prisma
- **Location:** Configured in `/api/prisma/schema.prisma`
- **Connection:** Set via `DATABASE_URL` in `/api/.env`

---

## Modifying User Profiles

### 1. Edit Own Profile (All Users)
Users can edit their own name and email (but NOT mobile number or role).

**UI Location:** Settings → Account Tab → Edit Profile button

**Implementation:**
```typescript
// Frontend: SettingsScreen.tsx
const handleEditProfile = () => {
  setEditName(user?.name || '');
  setEditEmail(user?.email || '');
  setShowEditProfileModal(true);
};

const handleSaveProfile = async () => {
  try {
    // TODO: Implement API call
    const updated = await userService.updateProfile({
      name: editName,
      email: editEmail,
    });
    
    // Update local state
    setUser(updated);
    Alert.alert('Success', 'Profile updated successfully');
  } catch (error) {
    Alert.alert('Error', 'Failed to update profile');
  }
};
```

**Backend API (to be implemented):**
```typescript
// POST /api/users/profile
router.put('/profile', authenticate, tenantIsolation, async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user!.id;
  
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });
  
  res.json({ status: 'success', data: updated });
});
```

### 2. Edit Employee Profiles (Owners/Managers Only)
Owners and managers can edit employee details including role and status.

**UI Location:** Settings → Team Tab → Employee Card → Edit button

**Implementation:**
```typescript
// Frontend: EmployeeFormModal.tsx
const handleUpdate = async () => {
  const updated = await employeeService.updateEmployee(employeeId, {
    name: formData.name,
    email: formData.email,
    role: formData.role,
    status: formData.status,
  });
};
```

**Backend API:**
```typescript
// PUT /api/employees/:id
router.put('/:id', authenticate, tenantIsolation, async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  
  // Verify user is owner or manager
  if (req.user!.role !== 'OWNER' && req.user!.role !== 'MANAGER') {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  
  const updated = await prisma.user.update({
    where: { 
      id,
      tenantId: req.user!.tenantId // Ensure tenant isolation
    },
    data: { name, email, role, status },
  });
  
  res.json({ status: 'success', data: updated });
});
```

### 3. Change Password
Users can change their own password.

**UI Location:** Settings → Account Tab → Security Card → Change Password

**Implementation:**
```typescript
// Frontend: SettingsScreen.tsx
const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }
  
  try {
    await authService.changePassword({
      currentPassword,
      newPassword,
    });
    
    Alert.alert('Success', 'Password changed successfully');
    setShowChangePasswordModal(false);
  } catch (error) {
    Alert.alert('Error', 'Failed to change password');
  }
};
```

**Backend API (to be implemented):**
```typescript
// POST /api/users/change-password
router.post('/change-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user!.id;
  
  // Verify current password
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const isValid = await bcrypt.compare(currentPassword, user.password);
  
  if (!isValid) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  
  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  
  res.json({ status: 'success', message: 'Password changed successfully' });
});
```

### 4. Reset Employee PIN (Owners/Managers Only)
Owners and managers can reset an employee's temporary PIN.

**UI Location:** Settings → Team Tab → Employee Card → Reset PIN button

**Implementation:**
```typescript
// Frontend: EmployeeManagement.tsx
const handleResetPin = async (employeeId: string) => {
  const newPin = await employeeService.resetPin(employeeId);
  Alert.alert(
    'PIN Reset Successful',
    `New temporary PIN: ${newPin}\nEmployee must change this on first login.`
  );
};
```

**Backend API:**
```typescript
// POST /api/employees/:id/reset-pin
router.post('/:id/reset-pin', authenticate, tenantIsolation, async (req, res) => {
  const { id } = req.params;
  
  // Generate new PIN
  const temporaryPin = Math.floor(100000 + Math.random() * 900000).toString();
  
  const updated = await prisma.user.update({
    where: { 
      id,
      tenantId: req.user!.tenantId 
    },
    data: { 
      temporaryPin,
      pinResetRequired: true,
    },
  });
  
  res.json({ 
    status: 'success', 
    data: { temporaryPin } 
  });
});
```

### 5. Deactivate/Activate Employee (Owners Only)
Owners can deactivate or activate employee accounts.

**UI Location:** Settings → Team Tab → Employee Card → Deactivate button

**Implementation:**
```typescript
// Frontend: EmployeeManagement.tsx
const handleDeactivate = async (employeeId: string) => {
  Alert.alert(
    'Confirm Deactivation',
    'Are you sure you want to deactivate this employee?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Deactivate',
        style: 'destructive',
        onPress: async () => {
          await employeeService.deactivateEmployee(employeeId);
          refreshEmployees();
        }
      }
    ]
  );
};
```

**Backend API:**
```typescript
// DELETE /api/employees/:id (Soft delete - change status to INACTIVE)
router.delete('/:id', authenticate, tenantIsolation, requireOwner, async (req, res) => {
  const { id } = req.params;
  
  const updated = await prisma.user.update({
    where: { 
      id,
      tenantId: req.user!.tenantId 
    },
    data: { status: 'INACTIVE' },
  });
  
  res.json({ status: 'success', data: updated });
});
```

---

## Role-Based Access Control

### Permission Matrix

| Action | Owner | Manager | Employee |
|--------|-------|---------|----------|
| Edit own profile | ✅ | ✅ | ✅ |
| Change own password | ✅ | ✅ | ✅ |
| View company profile | ✅ | ✅ | ❌ |
| Edit company profile | ✅ | ✅ | ❌ |
| View all employees | ✅ | ✅ | ❌ |
| Create employee | ✅ | ✅ | ❌ |
| Edit employee | ✅ | ✅ | ❌ |
| Reset employee PIN | ✅ | ✅ | ❌ |
| Deactivate employee | ✅ | ❌ | ❌ |
| Delete employee | ✅ | ❌ | ❌ |

### Implementation

**Frontend (React Native):**
```typescript
// In any component
const { user } = useAuthStore();
const isOwner = user?.role === 'owner';
const isManager = user?.role === 'manager';
const canManageEmployees = isOwner || isManager;

// Conditional rendering
{canManageEmployees && <EmployeeManagement />}
```

**Backend (Express Middleware):**
```typescript
// Middleware: requireRole
export const requireOwner = requireRole('OWNER');
export const requireOwnerOrManager = requireRole('OWNER', 'MANAGER');

// Usage in routes
router.post('/employees', authenticate, requireOwnerOrManager, async (req, res) => {
  // Only owners and managers can access this endpoint
});
```

---

## API Endpoints

### User Profile Endpoints (To Be Implemented)

```typescript
// Get current user profile
GET /api/users/profile
Headers: Authorization: Bearer {token}
Response: { status: 'success', data: User }

// Update current user profile
PUT /api/users/profile
Headers: Authorization: Bearer {token}
Body: { name: string, email?: string }
Response: { status: 'success', data: User }

// Change password
POST /api/users/change-password
Headers: Authorization: Bearer {token}
Body: { currentPassword: string, newPassword: string }
Response: { status: 'success', message: string }
```

### Employee Management Endpoints (Already Implemented)

```typescript
// Get all employees
GET /api/employees
Headers: Authorization: Bearer {token}
Query: ?role=SALES_AGENT&status=ACTIVE
Response: { status: 'success', data: User[] }

// Create employee
POST /api/employees
Headers: Authorization: Bearer {token}
Body: { name: string, mobile: string, email?: string, role: string, status: string }
Response: { status: 'success', data: User }

// Update employee
PUT /api/employees/:id
Headers: Authorization: Bearer {token}
Body: { name?: string, email?: string, role?: string, status?: string }
Response: { status: 'success', data: User }

// Reset employee PIN
POST /api/employees/:id/reset-pin
Headers: Authorization: Bearer {token}
Response: { status: 'success', data: { temporaryPin: string } }

// Deactivate employee
DELETE /api/employees/:id
Headers: Authorization: Bearer {token}
Response: { status: 'success', data: User }
```

---

## UI Components

### 1. Settings Screen
**Location:** `/mobile/src/screens/dashboard/SettingsScreen.tsx`

**Features:**
- Tabbed interface (Account, Company, Team, Preferences)
- Profile header with avatar
- Edit profile modal
- Change password modal
- Role-based tab visibility

### 2. Employee Management Component
**Location:** `/mobile/src/components/settings/EmployeeManagement.tsx`

**Features:**
- List all employees with cards
- Search by name or mobile
- Filter by role and status
- Create new employee
- Edit employee
- Reset PIN
- Deactivate/activate

### 3. Employee Form Modal
**Location:** `/mobile/src/components/settings/EmployeeFormModal.tsx`

**Features:**
- Create/edit employee form
- Role picker dropdown
- Status toggle
- Auto-generate 6-digit PIN
- Validation

---

## Best Practices

### 1. Security
- **Never** allow users to change their own mobile number (used for login)
- **Never** allow users to change their own role
- **Always** validate permissions on both frontend and backend
- **Always** use tenant isolation to prevent cross-tenant data access
- **Always** hash passwords using bcrypt with salt rounds ≥ 10

### 2. Data Validation
```typescript
// Validate mobile number format (Egyptian)
const isValidMobile = (mobile: string) => /^01[0-9]{9}$/.test(mobile);

// Validate email format
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validate password strength
const isValidPassword = (password: string) => password.length >= 6;
```

### 3. Error Handling
```typescript
try {
  const result = await userService.updateProfile(data);
  Alert.alert('Success', 'Profile updated successfully');
} catch (error) {
  if (error.response?.status === 403) {
    Alert.alert('Error', 'You do not have permission to perform this action');
  } else if (error.response?.status === 404) {
    Alert.alert('Error', 'User not found');
  } else {
    Alert.alert('Error', 'An unexpected error occurred');
  }
}
```

### 4. UI/UX Guidelines
- Show loading states during API calls
- Provide clear feedback for success/error
- Disable form fields that cannot be edited
- Use confirmation dialogs for destructive actions
- Display user roles with color-coded badges
- Show "Coming Soon" badges for unimplemented features

---

## Migration Guide

### Adding New User Fields

**Step 1: Update Prisma Schema**
```prisma
// In /api/prisma/schema.prisma
model User {
  // ... existing fields
  
  // New field
  department  String?
  phoneExt    String?
}
```

**Step 2: Run Migration**
```bash
cd api
npx prisma db push
npx prisma generate
```

**Step 3: Update TypeScript Types**
```typescript
// In /mobile/src/types/auth.ts
export interface User {
  // ... existing fields
  
  department?: string;
  phoneExt?: string;
}
```

**Step 4: Update API Endpoints**
```typescript
// In /api/src/routes/employees.ts
router.put('/:id', async (req, res) => {
  const { name, email, role, status, department, phoneExt } = req.body;
  
  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: { name, email, role, status, department, phoneExt },
  });
  
  res.json({ status: 'success', data: updated });
});
```

**Step 5: Update UI Components**
```typescript
// In EmployeeFormModal.tsx
<View style={styles.formGroup}>
  <Text style={styles.formLabel}>Department</Text>
  <TextInput
    style={styles.formInput}
    value={formData.department}
    onChangeText={(text) => setFormData({ ...formData, department: text })}
    placeholder="Enter department"
  />
</View>
```

---

## Troubleshooting

### Common Issues

**1. Profile Not Updating**
- Check if API endpoint is correctly implemented
- Verify authentication token is being sent
- Check browser/console for error messages
- Verify database connection

**2. Permission Denied Errors**
- Verify user role in auth store
- Check if role-based middleware is applied correctly
- Ensure tenant isolation is working

**3. Data Not Persisting**
- Check if Prisma migration has been run
- Verify database connection string in `.env`
- Check if data is being saved to AsyncStorage

**4. Modal Not Showing**
- Verify modal state (`showEditProfileModal`) is set to `true`
- Check if Modal component is properly imported
- Ensure SafeAreaView is wrapping modal content

---

## Next Steps

### Planned Features
1. **Profile Photos:** Upload and display user profile pictures
2. **Email Verification:** Send verification emails for new email addresses
3. **Two-Factor Authentication:** Add 2FA for enhanced security
4. **Activity Logs:** Track profile changes and login history
5. **Bulk Employee Import:** CSV import for multiple employees
6. **Advanced Permissions:** Granular permissions per user

---

## Support

For questions or issues related to user profile management, contact the development team or refer to:
- Main README: `/README.md`
- API Reference: `/docs/API_REFERENCE.md`
- Setup Guide: `/docs/SETUP_COMPLETE.md`
- Multi-Tenant Architecture: `/docs/MULTI_TENANT_ARCHITECTURE.md`
