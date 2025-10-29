import { Router } from 'express';
import { tenantIsolation, requireOwnerOrManager } from '../middleware/tenantIsolation';
import * as db from '../services/database.service';

const router = Router();

/**
 * Property Types Routes
 */
router.get('/property-types', tenantIsolation, async (req, res) => {
  try {
    const types = await db.getPropertyTypes(req.tenantId!);
    res.json({ status: 'success', data: types });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch property types',
    });
  }
});

router.post('/property-types', tenantIsolation, requireOwnerOrManager, async (req, res) => {
  try {
    const { name } = req.body;
    const type = await db.createPropertyType(name, req.tenantId!);
    res.status(201).json({ status: 'success', data: type });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create property type',
    });
  }
});

/**
 * Regions Routes
 */
router.get('/regions', tenantIsolation, async (req, res) => {
  try {
    const regions = await db.getRegions(req.tenantId!);
    res.json({ status: 'success', data: regions });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch regions',
    });
  }
});

router.post('/regions', tenantIsolation, requireOwnerOrManager, async (req, res) => {
  try {
    const { name } = req.body;
    const region = await db.createRegion(name, req.tenantId!);
    res.status(201).json({ status: 'success', data: region });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create region',
    });
  }
});

/**
 * Categories Routes
 */
router.get('/categories', tenantIsolation, async (req, res) => {
  try {
    const categories = await db.getCategories(req.tenantId!);
    res.json({ status: 'success', data: categories });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch categories',
    });
  }
});

router.post('/categories', tenantIsolation, requireOwnerOrManager, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await db.createCategory(name, req.tenantId!);
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create category',
    });
  }
});

/**
 * Listing Statuses Routes
 */
router.get('/listing-statuses', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const statuses = await db.getPropertyStatuses(req.tenantId!);
    res.json({ status: 'success', data: statuses });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to fetch listing statuses',
    });
  }
});

router.post('/listing-statuses', tenantIsolation, requireOwnerOrManager, async (req, res): Promise<void> => {
  try {
    const { name } = req.body;
    const status = await db.createPropertyStatus(name, req.tenantId!);
    res.status(201).json({ status: 'success', data: status });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create listing status',
    });
  }
});

export default router;
