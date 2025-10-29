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
            byType: [],
            byStatus: [],
            byRegion: [],
            valueStats: {
              total_value: 0,
              avg_value: 0,
              min_value: 0,
              max_value: 0,
            },
            recent: [],
          },
          leads: {
            total: 0,
            new: 0,
            contacted: 0,
            qualified: 0,
            negotiating: 0,
            won: 0,
            lost: 0,
            bySource: {},
          },
          team: {
            total: 0,
            employees: 0,
            managers: 0,
            owners: 0,
            active: 0,
          },
          recentActivities: [],
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
      valueStats,
      recentProperties,
      recentActivities,
    ] = await Promise.all([
      db.countPropertiesByTenant(tenantId),
      db.getLeadsByTenant(tenantId),
      db.getUsersByTenant(tenantId),
      db.getPropertyCountByType(tenantId),
      db.getPropertyCountByStatus(tenantId),
      db.getPropertyCountByRegion(tenantId),
      db.getPropertyValueStats(tenantId),
      db.getRecentPropertiesByTenant(tenantId, 5),
      db.getRecentActivitiesByTenant(tenantId, 10),
    ]);

    // Get counts for published properties
    const publishedCount = await db.countPublishedPropertiesByTenant(tenantId);

    // Lead statistics with source breakdown
    const leadsBySource = leads.reduce((acc: any, lead) => {
      const source = lead.source || 'UNKNOWN';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

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
          recent: recentProperties.map((p: any) => ({
            id: p.id,
            property_number: p.property_number,
            property_name: p.property_name,
            title: p.title,
            type: p.property_types?.name,
            region: p.regions?.name,
            status: p.property_statuses?.name,
            sale_price: p.sale_price,
            rental_price_monthly: p.rental_price_monthly,
            image: p.property_images?.[0]?.image_url || null,
            created_at: p.created_at,
          })),
        },
        leads: {
          total: leads.length,
          new: leads.filter((l) => l.status === 'NEW').length,
          contacted: leads.filter((l) => l.status === 'CONTACTED').length,
          qualified: leads.filter((l) => l.status === 'QUALIFIED').length,
          negotiating: leads.filter((l) => l.status === 'NEGOTIATING').length,
          won: leads.filter((l) => l.status === 'WON').length,
          lost: leads.filter((l) => l.status === 'LOST').length,
          bySource: leadsBySource,
        },
        team: {
          total: users.length,
          active: users.filter((u) => u.status === 'ACTIVE').length,
          employees: users.filter((u) => u.role === 'EMPLOYEE').length,
          managers: users.filter((u) => u.role === 'MANAGER').length,
          owners: users.filter((u) => u.role === 'OWNER').length,
        },
        recentActivities: recentActivities.map((a: any) => ({
          id: a.id,
          type: a.type,
          title: a.title,
          status: a.status,
          priority: a.priority,
          assignedTo: a.assignedTo?.name,
          createdBy: a.createdBy?.name,
          linkedType: a.linkedType,
          linkedId: a.linkedId,
          dateTime: a.dateTime,
        })),
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
