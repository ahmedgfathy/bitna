import { Router } from 'express';
import { tenantIsolation } from '../middleware/tenantIsolation';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/properties
 * Get all properties for the authenticated user's tenant with pagination
 */
router.get('/', tenantIsolation, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      db.getPropertiesByTenant(req.tenantId!, skip, limit),
      db.countPropertiesByTenant(req.tenantId!)
    ]);

    res.json({
      status: 'success',
      data: properties,
      count: properties.length,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + properties.length < total,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch properties',
    });
  }
});

/**
 * POST /api/properties
 * Create a new property (tenant-scoped)
 */
router.post('/', tenantIsolation, async (req, res) => {
  try {
    const property = await db.createProperty({
      ...req.body,
      company_id: req.tenantId!,
      created_by_id: req.user!.id,
    });

    res.status(201).json({
      status: 'success',
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create property',
    });
  }
});

/**
 * POST /api/properties/bulk
 * Bulk import properties from CSV (tenant-scoped)
 */
router.post('/bulk', tenantIsolation, async (req, res) => {
  try {
    const { properties: propertiesData } = req.body;
    
    if (!Array.isArray(propertiesData) || propertiesData.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid properties data. Expected an array of properties.',
      });
      return;
    }

    // Create all properties in bulk
    const createdProperties = await Promise.all(
      propertiesData.map(propertyData =>
        db.createProperty({
          ...propertyData,
          company_id: req.tenantId!,
          created_by_id: req.user!.id,
        })
      )
    );

    res.status(201).json({
      status: 'success',
      data: createdProperties,
      count: createdProperties.length,
      message: `Successfully imported ${createdProperties.length} properties`,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to bulk import properties',
    });
  }
});

/**
 * PATCH /api/properties/:id/visibility
 * Toggle property public visibility (❤️ toggle)
 */
router.patch('/:id/visibility', tenantIsolation, async (req, res) => {
  try {
    const { isPublic } = req.body;
    const propertyId = req.params.id;

    if (!propertyId) {
      res.status(400).json({
        status: 'error',
        message: 'Property ID is required',
      });
      return;
    }

    const property = await db.togglePropertyVisibility(
      propertyId,
      req.tenantId!,
      isPublic
    );

    res.json({
      status: 'success',
      data: property,
      message: `Property is now ${isPublic ? 'public' : 'private'}`,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update property',
    });
  }
});

/**
 * GET /api/properties/public
 * Get public properties (no authentication required)
 */
router.get('/public', async (req, res) => {
  try {
    const { propertyTypeId, regionId, categoryId, minPrice, maxPrice } = req.query;

    const properties = await db.getPublicProperties({
      propertyTypeId: propertyTypeId as string,
      regionId: regionId as string,
      categoryId: categoryId as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });

    res.json({
      status: 'success',
      data: properties,
      count: properties.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch properties',
    });
  }
});

/**
 * GET /api/properties/nearby
 * Get properties near a location (no authentication required)
 */
router.get('/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude) {
      res.status(400).json({
        status: 'error',
        message: 'Latitude and longitude are required',
      });
      return;
    }

    const properties = await db.getNearestProperties(
      Number(latitude),
      Number(longitude),
      radius ? Number(radius) : 10
    );

    res.json({
      status: 'success',
      data: properties,
      count: properties.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch properties',
    });
  }
});

export default router;
