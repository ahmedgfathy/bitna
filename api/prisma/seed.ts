import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create a demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { id: 'tenant-1' },
    update: {},
    create: {
      id: 'tenant-1',
      name: 'Demo Real Estate',
      companyName: 'Ahmed Real Estate',
      type: 'FREELANCER',
      mobile: '01002778090',
      address: '123 Main Street',
      city: 'Cairo',
      region: 'New Cairo',
      country: 'Egypt',
      phone: '+20 2 1234 5678',
      email: 'info@ahmedrealestate.com',
      website: 'https://ahmedrealestate.com',
      description: 'Premium real estate services in Cairo',
    },
  });

  console.log(`✅ Created tenant: ${tenant.companyName}`);

  // Create owner user
  const owner = await prisma.user.upsert({
    where: { mobile: '01002778090' },
    update: {},
    create: {
      id: '1',
      mobile: '01002778090',
      name: 'Ahmed Gomaa',
      email: 'ahmed@ahmedrealestate.com',
      role: 'OWNER',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  console.log(`✅ Created owner: ${owner.name}`);

  // Create sample properties
  const properties = [
    {
      title: 'Modern Villa in New Cairo',
      description: 'Luxurious 4-bedroom villa with private pool and garden. Features modern architecture, spacious rooms, and premium finishes.',
      price: 8500000,
      location: 'New Cairo, Cairo',
      latitude: 30.0444,
      longitude: 31.2357,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      propertyType: 'Villa',
      category: 'For Sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 350,
      isPublic: true,
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      title: 'Seaside Apartment in Marina',
      description: 'Beautiful 2-bedroom apartment with stunning sea views. Fully furnished with modern amenities.',
      price: 4200000,
      location: 'Marina, North Coast',
      latitude: 30.8800,
      longitude: 29.0833,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      propertyType: 'Apartment',
      category: 'For Sale',
      region: 'North Coast',
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      isPublic: true,
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      title: 'Downtown Office Space',
      description: 'Premium office space in the heart of Cairo. Perfect for businesses seeking a prestigious address.',
      price: 15000,
      location: 'Downtown, Cairo',
      latitude: 30.0626,
      longitude: 31.2497,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      propertyType: 'Commercial',
      category: 'For Rent',
      region: 'Downtown',
      area: 200,
      isPublic: true,
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      title: 'Family Home in Zamalek',
      description: 'Spacious 5-bedroom house in prestigious Zamalek neighborhood. Classic architecture with modern updates.',
      price: 12000000,
      location: 'Zamalek, Cairo',
      latitude: 30.0600,
      longitude: 31.2200,
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      propertyType: 'House',
      category: 'For Sale',
      region: 'Zamalek',
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      isPublic: true,
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      title: 'Studio in 6th October',
      description: 'Cozy studio apartment ideal for young professionals. Fully equipped and ready to move in.',
      price: 1800000,
      location: '6th October City',
      latitude: 29.9522,
      longitude: 30.9312,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      propertyType: 'Apartment',
      category: 'For Sale',
      region: '6th October',
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      isPublic: true,
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      title: 'Luxury Penthouse in Maadi',
      description: 'Exclusive penthouse with panoramic city views. Top-floor location with private terrace.',
      price: 18000000,
      location: 'Maadi, Cairo',
      latitude: 29.9602,
      longitude: 31.2569,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      propertyType: 'Apartment',
      category: 'For Sale',
      region: 'Maadi',
      bedrooms: 3,
      bathrooms: 3,
      area: 280,
      isPublic: true,
      tenantId: tenant.id,
      createdById: owner.id,
    },
  ];

  for (const propertyData of properties) {
    const property = await prisma.property.create({
      data: propertyData,
    });
    console.log(`✅ Created property: ${property.title}`);
  }

  // Create sample leads
  const leads = [
    {
      name: 'Sarah Mohamed',
      mobile: '01234567890',
      email: 'sarah.m@email.com',
      source: 'Website',
      status: 'NEW',
      notes: 'Interested in 3-bedroom apartments in New Cairo',
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      name: 'Khaled Ahmed',
      mobile: '01098765432',
      email: 'khaled.a@email.com',
      source: 'Referral',
      status: 'CONTACTED',
      notes: 'Looking for commercial property in downtown',
      tenantId: tenant.id,
      createdById: owner.id,
    },
    {
      name: 'Fatma Hassan',
      mobile: '01156789012',
      email: 'fatma.h@email.com',
      source: 'Phone',
      status: 'QUALIFIED',
      notes: 'Budget: 5-7M EGP, prefers North Coast',
      tenantId: tenant.id,
      createdById: owner.id,
    },
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.create({
      data: leadData,
    });
    console.log(`✅ Created lead: ${lead.name}`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
