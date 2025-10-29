import express from 'express';
import { tenantIsolation } from '../middleware/tenantIsolation';
import { 
  getTenantProfile, 
  updateTenantProfile 
} from '../services/database.service';

const router = express.Router();

/**
 * GET /api/company/profile
 * Get company profile for authenticated tenant
 */
router.get('/profile', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const tenantId = req.user!.tenantId;
    
    const profile = await getTenantProfile(tenantId);
    
    if (!profile) {
      res.status(404).json({
        status: 'error',
        message: 'Company profile not found'
      });
      return;
    }
    
    res.json({
      status: 'success',
      data: profile
    });
  } catch (error) {
    console.error('Error fetching company profile:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch company profile'
    });
  }
});

/**
 * PUT /api/company/profile
 * Update company profile (owners and managers only)
 */
router.put('/profile', tenantIsolation, async (req, res): Promise<void> => {
  try {
    const tenantId = req.user!.tenantId;
    const userRole = req.user!.role;
    
    // Check permission (only owners and managers can update company profile)
    if (userRole !== 'OWNER' && userRole !== 'MANAGER') {
      res.status(403).json({
        status: 'error',
        message: 'Only owners and managers can update company profile'
      });
      return;
    }
    
    const {
      companyName,
      address,
      city,
      region,
      country,
      phone,
      email,
      website,
      description,
      logoUrl
    } = req.body;
    
    const updatedProfile = await updateTenantProfile(tenantId, {
      companyName,
      address,
      city,
      region,
      country,
      phone,
      email,
      website,
      description,
      logoUrl
    });
    
    res.json({
      status: 'success',
      data: updatedProfile
    });
  } catch (error) {
    console.error('Error updating company profile:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update company profile'
    });
  }
});

export default router;
