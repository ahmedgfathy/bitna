# Phase 2: Advanced Permissions (RBAC)

## 🎯 **Objectives**
1. Implement granular Role-Based Access Control (RBAC)
2. Create permission inheritance system
3. Build dynamic role assignment workflows
4. Develop access control middleware

## 🔐 **Granular Permission System**

### **Resource-Based Permissions**
Each permission follows the pattern: `resource:action:scope`

#### **Lead Permissions**
- `leads:view:own` - View only own leads
- `leads:view:team` - View team leads
- `leads:view:department` - View department leads
- `leads:view:all` - View all leads
- `leads:create:own` - Create leads for self
- `leads:create:team` - Create leads for team members
- `leads:edit:own` - Edit own leads
- `leads:edit:team` - Edit team leads
- `leads:delete:own` - Delete own leads
- `leads:delete:team` - Delete team leads

#### **User Management Permissions**
- `users:view:team` - View team members
- `users:view:department` - View department users
- `users:create:employee` - Create employee accounts
- `users:edit:team` - Edit team member profiles
- `users:delete:employee` - Remove employee accounts
- `users:assign:roles` - Assign roles to users

#### **Report Permissions**
- `reports:view:personal` - View personal metrics
- `reports:view:team` - View team reports
- `reports:view:department` - View department reports
- `reports:export:team` - Export team data
- `reports:export:department` - Export department data

#### **System Permissions**
- `system:settings:department` - Manage department settings
- `system:audit:team` - View team activity logs
- `system:audit:department` - View department audit trail
- `system:backup:create` - Create data backups

## 👥 **Role Definitions with Detailed Permissions**

### **Owner (Level 1)**
```json
{
  "role": "owner",
  "level": 1,
  "permissions": [
    "leads:*:*",
    "users:*:*", 
    "reports:*:*",
    "system:*:*",
    "audit:*:*"
  ],
  "inherits": []
}
```

### **Manager (Level 2)**
```json
{
  "role": "manager",
  "level": 2,
  "permissions": [
    "leads:view:department",
    "leads:create:department",
    "leads:edit:department",
    "leads:delete:team",
    "users:view:department",
    "users:create:employee",
    "users:edit:team",
    "users:assign:teamleader",
    "reports:view:department",
    "reports:export:department",
    "system:settings:department",
    "audit:view:department"
  ],
  "inherits": ["teamleader"]
}
```

### **Team Leader (Level 3)**
```json
{
  "role": "teamleader", 
  "level": 3,
  "permissions": [
    "leads:view:team",
    "leads:create:team",
    "leads:edit:team",
    "leads:delete:own",
    "users:view:team",
    "users:edit:team",
    "reports:view:team",
    "reports:export:team",
    "audit:view:team"
  ],
  "inherits": ["employee"]
}
```

### **Employee (Level 4)**
```json
{
  "role": "employee",
  "level": 4, 
  "permissions": [
    "leads:view:own",
    "leads:create:own",
    "leads:edit:own",
    "users:view:team",
    "reports:view:personal"
  ],
  "inherits": []
}
```

## 🔄 **Permission Inheritance System**

### **Inheritance Rules**
1. **Higher roles inherit lower role permissions**
2. **Explicit permissions override inherited ones**
3. **Deny permissions can block inherited permissions**
4. **Scope expansion**: Higher roles get broader scopes

### **Dynamic Permission Calculation**
```typescript
function calculateUserPermissions(user: User): string[] {
  const role = user.role;
  const permissions = [...role.permissions];
  
  // Add inherited permissions
  role.inherits.forEach(inheritedRole => {
    permissions.push(...getInheritedPermissions(inheritedRole));
  });
  
  // Apply scope expansions based on role level
  return expandPermissionScopes(permissions, role.level);
}
```

## 🛡️ **Access Control Middleware**

### **Route Protection**
```typescript
// Middleware to check permissions for API routes
export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getCurrentUser(req);
    
    if (!hasPermission(user, permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}
```

### **Component-Level Access Control**
```typescript
// React component for permission-based rendering
export function PermissionGate({ 
  permission, 
  children, 
  fallback 
}: PermissionGateProps) {
  const { user } = useSession();
  
  if (!hasPermission(user, permission)) {
    return fallback || null;
  }
  
  return children;
}
```

## 🔧 **Role Assignment Workflows**

### **1. New Employee Onboarding**
```
1. Manager creates employee account
2. Assigns initial role (Employee)
3. Assigns to department and team
4. Sets direct manager
5. Employee receives welcome email
6. Employee completes profile setup
```

### **2. Role Promotion Workflow**
```
1. Manager initiates promotion request
2. Higher-level approval required
3. Permission transition handled gracefully
4. Audit trail logged
5. User notified of new permissions
```

### **3. Department Transfer**
```
1. Request department transfer
2. Current manager approval
3. New manager acceptance
4. Permission recalculation
5. Data access transfer
```

## 📊 **Permission Audit System**

### **Permission Changes Log**
```sql
permission_changes {
  id: String
  userId: String
  changedBy: String
  oldPermissions: Json
  newPermissions: Json
  reason: String
  timestamp: DateTime
}
```

### **Access Attempts Log**
```sql
access_attempts {
  id: String
  userId: String
  resource: String
  action: String
  permission: String
  allowed: Boolean
  ipAddress: String
  userAgent: String
  timestamp: DateTime
}
```

## 🛠️ **Implementation Tasks**

### **Task 1: Permission Engine**
1. Create permission calculation engine
2. Implement inheritance system
3. Build permission checking utilities
4. Create role transition handlers

### **Task 2: Middleware Development**
1. API route protection middleware
2. Component-level access control
3. Database query access control
4. File access permissions

### **Task 3: Role Management Interface**
1. Advanced role editor
2. Permission matrix view
3. Role assignment workflows
4. Permission testing interface

### **Task 4: Audit Implementation**
1. Permission change tracking
2. Access attempt logging
3. Audit trail visualization
4. Compliance reporting

## 🧪 **Testing Strategy**

### **Permission Testing Matrix**
- Test each role against each permission
- Verify inheritance works correctly
- Test permission denials
- Validate scope restrictions

### **Security Testing**
- Attempt privilege escalation
- Test role boundary violations
- Verify audit trail integrity
- Test permission bypass attempts

## ✅ **Success Criteria**
- [ ] Granular permissions working correctly
- [ ] Permission inheritance functional
- [ ] Role assignment workflows complete
- [ ] Access control middleware active
- [ ] Audit system tracking all changes
- [ ] Security testing passed

## 🔄 **Next Phase**
After Phase 2 completion, proceed to **Phase 3: Audit & Logging System**

---
*This phase creates a robust, enterprise-grade permission system.*
