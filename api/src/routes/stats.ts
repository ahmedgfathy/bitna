import { Router } from 'express';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/stats/dashboard
 * Get dashboard statistics for the authenticated user's tenant
 * Note: Returns empty stats if not authenticated (for demo purposes)
 */
router.get('/dashboard', async (req, res): Promise<void> => {
  try {
    // Check if authenticated
    if (!req.user || !req.user.tenantId) {
      // Return empty stats for demo/testing
      res.json({
        status: 'success',
        data: {
          properties: {
            total: 0,
            public: 0,
            private: 0,
          },
          leads: {
            total: 0,
            new: 0,
            contacted: 0,
            qualified: 0,
            negotiating: 0,
            won: 0,
            lost: 0,
          },
          team: {
            total: 0,
            employees: 0,
            managers: 0,
            owners: 0,
          },
        },
      });
      return;
    }

    const tenantId = req.user.tenantId;

    // Fetch all data in parallel for better performance
    const [
      propertiesCount,
      leads,
      users,
      propertyByType,
      propertyByStatus,
      propertyByRegion,
      valueStats
    ] = await Promise.all([
      db.countPropertiesByTenant(tenantId),
      db.getLeadsByTenant(tenantId),
      db.getUsersByTenant(tenantId),
      db.getPropertyCountByType(tenantId),
      db.getPropertyCountByStatus(tenantId),
      db.getPropertyCountByRegion(tenantId),
      db.getPropertyValueStats(tenantId),
    ]);

    // Get counts for published properties
    const publishedCount = await db.countPublishedPropertiesByTenant(tenantId);

    // Calculate additional metrics
    const qualifiedLeads = leads.filter(l => l.status === 'QUALIFIED').length;

    res.json({
      status: 'success',
      data: {
        properties: {
          total: propertiesCount,
          public: publishedCount,
          private: propertiesCount - publishedCount,
          byType: propertyByType,
          byStatus: propertyByStatus,
          byRegion: propertyByRegion,
          valueStats: valueStats,
        },
        leads: {
          total: leads.length,
          new: leads.filter(l => l.status === 'NEW').length,
          contacted: leads.filter(l => l.status === 'CONTACTED').length,
          qualified: qualifiedLeads,
          negotiating: leads.filter(l => l.status === 'NEGOTIATING').length,
          won: leads.filter(l => l.status === 'WON').length,
          lost: leads.filter(l => l.status === 'LOST').length,
        },
        team: {
          total: users.length,
          employees: users.filter(u => u.role === 'EMPLOYEE').length,
          managers: users.filter(u => u.role === 'MANAGER').length,
          owners: users.filter(u => u.role === 'OWNER').length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch dashboard stats',
    });
  }
});

export default router;
