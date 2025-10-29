import { Router } from 'express';
import { tenantIsolation, requireOwner } from '../middleware/tenantIsolation';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/users
 * Get all users in the tenant
 */
router.get('/', tenantIsolation, async (req, res) => {
  try {
    const users = await db.getUsersByTenant(req.tenantId!);
    res.json({
      status: 'success',
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch users',
    });
  }
});

/**
 * POST /api/users/employee
 * Add a new employee (owner only)
 */
router.post('/employee', tenantIsolation, requireOwner, async (req, res): Promise<void> => {
  try {
    const { name, mobile, role } = req.body;

    if (!name || !mobile) {
      res.status(400).json({
        status: 'error',
        message: 'Name and mobile are required',
      });
      return;
    }

    const user = await db.addEmployeeToTenant({
      name,
      mobile,
      role: role || 'EMPLOYEE',
      tenantId: req.tenantId!,
    });

    res.status(201).json({
      status: 'success',
      data: user,
      message: 'Employee added successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to add employee',
    });
  }
});

export default router;
