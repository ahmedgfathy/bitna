import { Router } from 'express';
import { tenantIsolation } from '../middleware/tenantIsolation';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/leads
 * Get all leads for the authenticated user's tenant
 */
router.get('/', tenantIsolation, async (req, res) => {
  try {
    const leads = await db.getLeadsByTenant(req.tenantId!);
    res.json({
      status: 'success',
      data: leads,
      count: leads.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch leads',
    });
  }
});

/**
 * GET /api/leads/my-leads
 * Get leads assigned to the authenticated user
 */
router.get('/my-leads', tenantIsolation, async (req, res) => {
  try {
    const leads = await db.getLeadsByUser(req.user!.id, req.tenantId!);
    res.json({
      status: 'success',
      data: leads,
      count: leads.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch leads',
    });
  }
});

/**
 * POST /api/leads
 * Create a new lead (tenant-scoped)
 */
router.post('/', tenantIsolation, async (req, res) => {
  try {
    const lead = await db.createLead({
      ...req.body,
      tenantId: req.tenantId!,
    });

    res.status(201).json({
      status: 'success',
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create lead',
    });
  }
});

export default router;
