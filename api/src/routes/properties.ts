import { Router } from 'express';
import { tenantIsolation, requireOwnerOrManager } from '../middleware/tenantIsolation';
import * as db from '../services/database.service';

const router = Router();

/**
 * GET /api/properties
 * Get all properties for the authenticated user's tenant
 */
router.get('/', tenantIsolation, async (req, res) => {
  try {
    const properties = await db.getPropertiesByTenant(req.tenantId!);
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
 * POST /api/properties
 * Create a new property (tenant-scoped)
 */
router.post('/', tenantIsolation, async (req, res) => {
  try {
    const property = await db.createProperty({
      ...req.body,
      tenantId: req.tenantId!,
      createdById: req.user!.id,
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
 * PATCH /api/properties/:id/visibility
 * Toggle property public visibility (❤️ toggle)
 */
router.patch('/:id/visibility', tenantIsolation, async (req, res) => {
  try {
    const { isPublic } = req.body;

    const property = await db.togglePropertyVisibility(
      req.params.id,
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
      return res.status(400).json({
        status: 'error',
        message: 'Latitude and longitude are required',
      });
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
