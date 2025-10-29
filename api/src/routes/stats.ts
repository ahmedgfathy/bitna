import { Router } from 'express';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/stats/dashboard
 * Get dashboard statistics for the authenticated user's tenant
 * Note: Returns empty stats if not authenticated (for demo purposes)
 */
router.get('/dashboard', async (req, res) => {
  try {
    // Check if authenticated
    if (!req.user || !req.user.tenantId) {
      // Return empty stats for demo/testing
      return res.json({
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
    }

    // Fetch all data in parallel for better performance
    const [propertiesCount, leads, users, recentProperties] = await Promise.all([
      db.countPropertiesByTenant(req.user.tenantId),
      db.getLeadsByTenant(req.user.tenantId),
      db.getUsersByTenant(req.user.tenantId),
      db.getRecentProperties(req.user.tenantId, 5), // Get 5 most recent properties
    ]);

    // Get counts for published properties
    const publishedCount = await db.countPublishedPropertiesByTenant(req.user.tenantId);

    // Calculate additional metrics
    const qualifiedLeads = leads.filter(l => l.status === 'QUALIFIED').length;

    res.json({
      status: 'success',
      data: {
        properties: {
          total: propertiesCount,
          public: publishedCount,
          private: propertiesCount - publishedCount,
          recent: recentProperties.map(p => ({
            id: p.id,
            name: p.property_name || p.title || 'Unnamed Property',
            price: p.sale_price || p.rental_price_monthly || 0,
            currency: p.currencies?.code || 'EGP',
            area: p.total_area || p.land_area || 0,
            region: p.regions?.display_name || p.regions?.name || 'No Region',
            type: p.property_types?.name || p.property_types?.display_name || '',
            status: p.property_statuses?.name || p.property_statuses?.display_name || '',
            createdAt: p.created_at,
          })),
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
