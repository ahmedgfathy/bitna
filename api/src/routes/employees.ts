import express from 'express';
import { tenantIsolation } from '../middleware/tenantIsolation';
import {
  getUsersByTenant,
  createEmployee,
  updateEmployee,
  deactivateEmployee,
  resetEmployeePin
} from '../services/database.service';

const router = express.Router();

/**
 * GET /api/employees
 * Get all employees for the tenant (owners and managers only)
 */
router.get('/', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can view employees'
      });
      return;
    }
    
    const { role, status } = req.query;
    
    let employees = await getUsersByTenant(tenantId);
    
    // Filter by role if provided
    if (role) {
      employees = employees.filter(emp => emp.role === role);
    }
    
    // Filter by status if provided
    if (status) {
      employees = employees.filter(emp => emp.status === status);
    }
    
    res.json({
      status: 'success',
      data: employees
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch employees'
    });
  }
});

/**
 * POST /api/employees
 * Create new employee (owners and managers only)
 */
router.post('/', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can create employees'
      });
      return;
    }
    
    const { name, mobile, email, role, status } = req.body;
    
    // Validate required fields
    if (!name || !mobile || !role) {
      res.status(400).json({
        status: 'error',
        message: 'Name, mobile, and role are required'
      });
      return;
    }
    
    // Generate temporary PIN (6 digits)
    const temporaryPin = Math.floor(100000 + Math.random() * 900000).toString();
    
    const newEmployee = await createEmployee({
      name,
      mobile,
      email,
      role,
      status: status || 'ACTIVE',
      tenantId,
      temporaryPin,
      pinResetRequired: true
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        ...newEmployee,
        temporaryPin // Return PIN only on creation for owner to share
      }
    });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    
    // Handle duplicate mobile number
    if (error.code === 'P2002') {
      res.status(400).json({
        status: 'error',
        message: 'Mobile number already exists'
      });
      return;
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to create employee'
    });
  }
});

/**
 * PUT /api/employees/:id
 * Update employee details (owners and managers only)
 */
router.put('/:id', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const id = req.params.id as string;
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can update employees'
      });
      return;
    }
    
    const { name, mobile, email, role, status } = req.body;
    
    const updatedEmployee = await updateEmployee(id, tenantId, {
      name,
      mobile,
      email,
      role,
      status
    });
    
    if (!updatedEmployee) {
      res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
      return;
    }
    
    res.json({
      status: 'success',
      data: updatedEmployee
    });
  } catch (error: any) {
    console.error('Error updating employee:', error);
    
    if (error.code === 'P2002') {
      res.status(400).json({
        status: 'error',
        message: 'Mobile number already exists'
      });
      return;
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to update employee'
    });
  }
});

/**
 * DELETE /api/employees/:id
 * Deactivate employee (owners only)
 */
router.delete('/:id', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const id = req.params.id as string;
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission (only owners can delete)
    if (userRole !== 'OWNER') {
      res.status(403).json({
        status: 'error',
        message: 'Only owners can deactivate employees'
      });
      return;
    }
    
    const result = await deactivateEmployee(id, tenantId);
    
    if (!result) {
      res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
      return;
    }
    
    res.json({
      status: 'success',
      message: 'Employee deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating employee:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to deactivate employee'
    });
  }
});

/**
 * POST /api/employees/:id/reset-pin
 * Reset employee PIN (owners and managers only)
 */
router.post('/:id/reset-pin', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const id = req.params.id as string;
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can reset PINs'
      });
      return;
    }
    
    // Generate new temporary PIN
    const newPin = Math.floor(100000 + Math.random() * 900000).toString();
    
    const result = await resetEmployeePin(id, tenantId, newPin);
    
    if (!result) {
      res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
    }
    
    res.json({
      status: 'success',
      data: {
        temporaryPin: newPin
      },
      message: 'PIN reset successfully'
    });
  } catch (error) {
    console.error('Error resetting PIN:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reset PIN'
    });
  }
});

export default router;
