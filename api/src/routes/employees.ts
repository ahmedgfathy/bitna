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
router.get('/', tenantIsolation, async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      return res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can view employees'
      });
    }
    
    const { role, status } = req.query;
    
    const employees = await getUsersByTenant(tenantId, {
      role: role as string,
      status: status as string
    });
    
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
router.post('/', tenantIsolation, async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      return res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can create employees'
      });
    }
    
    const { name, mobile, email, role, status } = req.body;
    
    // Validate required fields
    if (!name || !mobile || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, mobile, and role are required'
      });
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
      return res.status(400).json({
        status: 'error',
        message: 'Mobile number already exists'
      });
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
router.put('/:id', tenantIsolation, async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      return res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can update employees'
      });
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
      return res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
    }
    
    res.json({
      status: 'success',
      data: updatedEmployee
    });
  } catch (error: any) {
    console.error('Error updating employee:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        status: 'error',
        message: 'Mobile number already exists'
      });
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
router.delete('/:id', tenantIsolation, async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission (only owners can delete)
    if (userRole !== 'OWNER') {
      return res.status(403).json({
        status: 'error',
        message: 'Only owners can deactivate employees'
      });
    }
    
    const result = await deactivateEmployee(id, tenantId);
    
    if (!result) {
      return res.status(404).json({
        status: 'error',
        message: 'Employee not found'
      });
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
router.post('/:id/reset-pin', tenantIsolation, async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      return res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can reset PINs'
      });
    }
    
    // Generate new temporary PIN
    const newPin = Math.floor(100000 + Math.random() * 900000).toString();
    
    const result = await resetEmployeePin(id, tenantId, newPin);
    
    if (!result) {
      return res.status(404).json({
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
