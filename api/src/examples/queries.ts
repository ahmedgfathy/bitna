import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

/**
 * BITNA MULTI-TENANT EXAMPLE QUERIES
 * 
 * This file demonstrates how to use the Bitna database with proper tenant isolation
 */

async function exampleQueries() {
  console.log('🚀 Bitna Multi-Tenant Example Queries\n');

  try {
    // ============================================
    // 1. CREATE A NEW FREELANCER TENANT
    // ============================================
    console.log('1️⃣  Creating a freelancer tenant...');
    
    const freelancerTenant = await prisma.tenant.create({
      data: {
        name: 'Ahmed Real Estate',
        mobile: '+201234567890',
        type: 'FREELANCER',
        subscriptionStatus: 'TRIAL',
      },
    });
    
    console.log('✅ Freelancer tenant created:', freelancerTenant.id);

    // Create owner user for freelancer
    const freelancerOwner = await prisma.user.create({
      data: {
        name: 'Ahmed Gomaa',
        mobile: '+201234567890',
        role: 'OWNER',
        tenantId: freelancerTenant.id,
      },
    });
    
    console.log('✅ Owner user created:', freelancerOwner.id);

    // ============================================
    // 2. CREATE A COMPANY TENANT WITH EMPLOYEES
    // ============================================
    console.log('\n2️⃣  Creating a company tenant...');
    
    const companyTenant = await prisma.tenant.create({
      data: {
        name: 'Premium Properties LLC',
        mobile: '+201098765432',
        type: 'COMPANY',
        subscriptionStatus: 'ACTIVE',
        subscriptionStart: new Date(),
        subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      },
    });
    
    console.log('✅ Company tenant created:', companyTenant.id);

    // Create owner
    const companyOwner = await prisma.user.create({
      data: {
        name: 'Sarah Johnson',
        mobile: '+201098765432',
        role: 'OWNER',
        tenantId: companyTenant.id,
      },
    });
    
    console.log('✅ Company owner created:', companyOwner.id);

    // Add manager
    const manager = await prisma.user.create({
      data: {
        name: 'Mohammed Ali',
        mobile: '+201234567891',
        role: 'MANAGER',
        tenantId: companyTenant.id,
      },
    });
    
    console.log('✅ Manager added:', manager.id);

    // Add employees
    const employee1 = await prisma.user.create({
      data: {
        name: 'Fatima Ahmed',
        mobile: '+201234567892',
        role: 'EMPLOYEE',
        tenantId: companyTenant.id,
      },
    });
    
    const employee2 = await prisma.user.create({
      data: {
        name: 'Omar Hassan',
        mobile: '+201234567893',
        role: 'EMPLOYEE',
        tenantId: companyTenant.id,
      },
    });
    
    console.log('✅ Employees added:', employee1.id, employee2.id);

    // ============================================
    // 3. CREATE TENANT-SCOPED STATIC DATA (Dropdowns)
    // ============================================
    console.log('\n3️⃣  Creating static data for company tenant...');
    
    // Property Types
    const propertyTypes = await prisma.propertyType.createMany({
      data: [
        { name: 'Apartment', tenantId: companyTenant.id },
        { name: 'Villa', tenantId: companyTenant.id },
        { name: 'Office', tenantId: companyTenant.id },
        { name: 'Land', tenantId: companyTenant.id },
      ],
    });
    
    console.log('✅ Property types created:', propertyTypes.count);

    // Regions
    const regions = await prisma.region.createMany({
      data: [
        { name: 'Downtown', tenantId: companyTenant.id },
        { name: 'New Cairo', tenantId: companyTenant.id },
        { name: '6th October', tenantId: companyTenant.id },
      ],
    });
    
    console.log('✅ Regions created:', regions.count);

    // Categories
    const categories = await prisma.category.createMany({
      data: [
        { name: 'For Sale', tenantId: companyTenant.id },
        { name: 'For Rent', tenantId: companyTenant.id },
        { name: 'Commercial', tenantId: companyTenant.id },
      ],
    });
    
    console.log('✅ Categories created:', categories.count);

    // Listing Statuses
    const statuses = await prisma.listingStatus.createMany({
      data: [
        { name: 'Available', tenantId: companyTenant.id },
        { name: 'Under Offer', tenantId: companyTenant.id },
        { name: 'Sold', tenantId: companyTenant.id },
      ],
    });
    
    console.log('✅ Listing statuses created:', statuses.count);

    // Get the created static data for use in properties
    const apartmentType = await prisma.propertyType.findFirst({
      where: { name: 'Apartment', tenantId: companyTenant.id },
    });
    
    const downtownRegion = await prisma.region.findFirst({
      where: { name: 'Downtown', tenantId: companyTenant.id },
    });
    
    const forSaleCategory = await prisma.category.findFirst({
      where: { name: 'For Sale', tenantId: companyTenant.id },
    });
    
    const availableStatus = await prisma.listingStatus.findFirst({
      where: { name: 'Available', tenantId: companyTenant.id },
    });

    // ============================================
    // 4. CREATE PROPERTIES
    // ============================================
    console.log('\n4️⃣  Creating properties...');
    
    // Private property (not public)
    const privateProperty = await prisma.property.create({
      data: {
        title: 'Luxury Downtown Apartment',
        description: '3-bedroom apartment in the heart of Cairo',
        price: 2500000,
        latitude: 30.0444,
        longitude: 31.2357,
        address: '123 Tahrir Street, Downtown Cairo',
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        isPublic: false, // Not visible to public
        tenantId: companyTenant.id,
        createdById: employee1.id,
        propertyTypeId: apartmentType?.id,
        regionId: downtownRegion?.id,
        categoryId: forSaleCategory?.id,
        listingStatusId: availableStatus?.id,
      },
    });
    
    console.log('✅ Private property created:', privateProperty.id);

    // Public property (visible to everyone)
    const publicProperty = await prisma.property.create({
      data: {
        title: 'Modern Villa in New Cairo',
        description: '5-bedroom villa with pool and garden',
        price: 8000000,
        latitude: 30.0264,
        longitude: 31.4949,
        address: '456 Fifth Settlement, New Cairo',
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        isPublic: true, // ❤️ Visible to public
        tenantId: companyTenant.id,
        createdById: employee2.id,
        propertyTypeId: apartmentType?.id,
        regionId: downtownRegion?.id,
        categoryId: forSaleCategory?.id,
        listingStatusId: availableStatus?.id,
      },
    });
    
    console.log('✅ Public property created:', publicProperty.id);

    // ============================================
    // 5. CREATE LEADS
    // ============================================
    console.log('\n5️⃣  Creating leads...');
    
    const lead1 = await prisma.lead.create({
      data: {
        name: 'John Smith',
        mobile: '+201111111111',
        email: 'john@example.com',
        source: 'WEBSITE',
        status: 'NEW',
        notes: 'Interested in downtown apartments',
        tenantId: companyTenant.id,
        assignedToId: employee1.id,
      },
    });
    
    const lead2 = await prisma.lead.create({
      data: {
        name: 'Maria Garcia',
        mobile: '+201222222222',
        email: 'maria@example.com',
        source: 'REFERRAL',
        status: 'CONTACTED',
        notes: 'Looking for villa in New Cairo',
        tenantId: companyTenant.id,
        assignedToId: employee2.id,
      },
    });
    
    console.log('✅ Leads created:', lead1.id, lead2.id);

    // ============================================
    // 6. QUERY EXAMPLES WITH TENANT ISOLATION
    // ============================================
    console.log('\n6️⃣  Testing tenant-isolated queries...');
    
    // Get all properties for company tenant ONLY
    const companyProperties = await prisma.property.findMany({
      where: { tenantId: companyTenant.id },
      include: {
        propertyType: true,
        region: true,
        category: true,
        createdBy: {
          select: { name: true },
        },
      },
    });
    
    console.log(`✅ Company tenant has ${companyProperties.length} properties`);

    // Get only PUBLIC properties (what anonymous users see)
    const publicProperties = await prisma.property.findMany({
      where: { isPublic: true },
      include: {
        propertyType: true,
        region: true,
      },
    });
    
    console.log(`✅ Public properties visible to all: ${publicProperties.length}`);

    // Get leads assigned to specific employee
    const employee1Leads = await prisma.lead.findMany({
      where: {
        assignedToId: employee1.id,
        tenantId: companyTenant.id, // Always include tenantId!
      },
    });
    
    console.log(`✅ Employee 1 has ${employee1Leads.length} assigned leads`);

    // Get all users in company tenant
    const companyUsers = await prisma.user.findMany({
      where: { tenantId: companyTenant.id },
      select: {
        name: true,
        role: true,
        mobile: true,
      },
    });
    
    console.log(`✅ Company has ${companyUsers.length} users:`);
    companyUsers.forEach(u => console.log(`   - ${u.name} (${u.role})`));

    // ============================================
    // 7. LOCATION-BASED QUERY
    // ============================================
    console.log('\n7️⃣  Testing location-based query...');
    
    // Find properties near downtown Cairo (30.0444, 31.2357)
    const nearbyProperties = await prisma.property.findMany({
      where: {
        isPublic: true,
        latitude: {
          gte: 30.0344, // ~1km south
          lte: 30.0544, // ~1km north
        },
        longitude: {
          gte: 31.2257, // ~1km west
          lte: 31.2457, // ~1km east
        },
      },
    });
    
    console.log(`✅ Found ${nearbyProperties.length} properties near downtown Cairo`);

    // ============================================
    // 8. STATISTICS
    // ============================================
    console.log('\n8️⃣  Tenant statistics...');
    
    const stats = await prisma.tenant.findUnique({
      where: { id: companyTenant.id },
      include: {
        _count: {
          select: {
            users: true,
            properties: true,
            leads: true,
            propertyTypes: true,
            regions: true,
            categories: true,
          },
        },
      },
    });
    
    console.log('✅ Tenant statistics:', stats?._count);

    console.log('\n✨ All example queries completed successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the examples
exampleQueries();
