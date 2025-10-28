import { Router } from 'express';
import { tenantIsolation } from '../middleware/tenantIsolation';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/activities
 * Get all activities for the authenticated user's tenant (with optional filters)
 */
router.get('/', tenantIsolation, async (req, res) => {
  try {
    const { linkedType, linkedId, assignedToId, status, type } = req.query;
    
    const activities = await db.getActivitiesByTenant(req.tenantId!, {
      ...(linkedType && { linkedType: linkedType as 'LEAD' | 'PROPERTY' }),
      ...(linkedId && { linkedId: linkedId as string }),
      ...(assignedToId && { assignedToId: assignedToId as string }),
      ...(status && { status: status as 'PENDING' | 'COMPLETED' | 'CANCELLED' }),
      ...(type && { type: type as 'TASK' | 'NOTE' | 'MEETING' }),
    });

    res.json({
      status: 'success',
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch activities',
    });
  }
});

/**
 * GET /api/activities/upcoming
 * Get upcoming activities for notifications (next 24 hours by default)
 */
router.get('/upcoming', tenantIsolation, async (req, res) => {
  try {
    const { assignedToId, hoursAhead } = req.query;
    
    const activities = await db.getUpcomingActivities(
      req.tenantId!,
      assignedToId as string | undefined,
      hoursAhead ? parseInt(hoursAhead as string) : 24
    );

    res.json({
      status: 'success',
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch upcoming activities',
    });
  }
});

/**
 * GET /api/activities/overdue
 * Get overdue activities
 */
router.get('/overdue', tenantIsolation, async (req, res) => {
  try {
    const { assignedToId } = req.query;
    
    const activities = await db.getOverdueActivities(
      req.tenantId!,
      assignedToId as string | undefined
    );

    res.json({
      status: 'success',
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch overdue activities',
    });
  }
});

/**
 * GET /api/activities/:id
 * Get a specific activity by ID
 */
router.get('/:id', tenantIsolation, async (req, res) => {
  try {
    const activity = await db.getActivityById(req.params.id, req.tenantId!);
    
    if (!activity) {
      return res.status(404).json({
        status: 'error',
        message: 'Activity not found',
      });
    }

    res.json({
      status: 'success',
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch activity',
    });
  }
});

/**
 * POST /api/activities
 * Create a new activity
 */
router.post('/', tenantIsolation, async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      status,
      priority,
      dateTime,
      reminderTime,
      linkedType,
      linkedId,
      assignedToId,
    } = req.body;

    // Validation
    if (!type || !title || !linkedType || !linkedId) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: type, title, linkedType, linkedId',
      });
    }

    const activity = await db.createActivity({
      type,
      title,
      description,
      status,
      priority,
      dateTime: dateTime ? new Date(dateTime) : undefined,
      reminderTime: reminderTime ? new Date(reminderTime) : undefined,
      linkedType,
      linkedId,
      tenantId: req.tenantId!,
      assignedToId,
      createdById: req.user!.id,
    });

    res.status(201).json({
      status: 'success',
      data: activity,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create activity',
    });
  }
});

/**
 * PUT /api/activities/:id
 * Update an activity
 */
router.put('/:id', tenantIsolation, async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      status,
      priority,
      dateTime,
      reminderTime,
      assignedToId,
    } = req.body;

    const activity = await db.updateActivity(req.params.id, req.tenantId!, {
      type,
      title,
      description,
      status,
      priority,
      dateTime: dateTime ? new Date(dateTime) : undefined,
      reminderTime: reminderTime ? new Date(reminderTime) : undefined,
      assignedToId,
    });

    res.json({
      status: 'success',
      data: activity,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update activity',
    });
  }
});

/**
 * DELETE /api/activities/:id
 * Delete an activity
 */
router.delete('/:id', tenantIsolation, async (req, res) => {
  try {
    await db.deleteActivity(req.params.id, req.tenantId!);

    res.json({
      status: 'success',
      message: 'Activity deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to delete activity',
    });
  }
});

export default router;
