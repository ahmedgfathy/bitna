import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TENANT_ID = 'demo-tenant-1';

async function seedLookupTables() {
  console.log('\n🌱 Seeding lookup tables...');

  // Property Categories
  console.log('📁 Seeding property categories...');
  const categories = [
    { name: 'Residential', description: 'Residential properties' },
    { name: 'Administrative', description: 'Administrative properties' },
    { name: 'Commercial', description: 'Commercial properties' },
    { name: 'Clinics', description: 'Medical clinics' },
    { name: 'Residential + Office', description: 'Mixed residential and office' },
    { name: 'Mixed Use', description: 'Mixed use properties' }
  ];

  for (const cat of categories) {
    await prisma.property_categories.upsert({
      where: { id: `cat-${cat.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `cat-${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
        company_id: TENANT_ID,
        name: cat.name,
        description: cat.description,
        is_active: true,
        sort_order: 1,
        updated_at: new Date()
      }
    });
  }
  console.log(`  ✅ Seeded ${categories.length} categories`);

  // Property Types
  console.log('🏠 Seeding property types...');
  const types = [
    'Apartment Compound', 'Apartment Out', 'Standalone Compound', 'Villa Out',
    'Townhouse', 'Townhouse Corner', 'Twin House', 'Duplex Gb', 'Duplex Gf',
    'Duplex Roof', 'Roof', 'Studio', 'Office Space', 'Clinic', 'Admin Building',
    'Admin Retail Building', 'Retail', 'Retail Building', 'Basement', 'Factory',
    'Pharmacy', 'Chalet', 'I Villa G', 'I Villa R', 'Land', 'Gas Station',
    'Building', 'Hospital'
  ];

  for (const type of types) {
    await prisma.propertyType.upsert({
      where: { id: `type-${type.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `type-${type.toLowerCase().replace(/\s+/g, '-')}`,
        company_id: TENANT_ID,
        name: type,
        is_active: true,
        sort_order: 1,
        updated_at: new Date()
      }
    });
  }
  console.log(`  ✅ Seeded ${types.length} property types`);

  // Property Statuses
  console.log('📋 Seeding property statuses...');
  const statuses = [
    { name: 'For Sale', color: '#3b82f6' },
    { name: 'For Rent', color: '#10b981' },
    { name: 'Sold Out', color: '#ef4444' },
    { name: 'Now Rented', color: '#8b5cf6' },
    { name: 'Hold', color: '#f59e0b' },
    { name: 'Recycle', color: '#6b7280' },
    { name: 'Unknown', color: '#9ca3af' }
  ];

  for (const status of statuses) {
    await prisma.property_statuses.upsert({
      where: { id: `status-${status.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `status-${status.name.toLowerCase().replace(/\s+/g, '-')}`,
        company_id: TENANT_ID,
        name: status.name,
        color: status.color,
        is_active: true,
        sort_order: 1,
        updated_at: new Date()
      }
    });
  }
  console.log(`  ✅ Seeded ${statuses.length} property statuses`);

  // Finishing Statuses
  console.log('🎨 Seeding finishing statuses...');
  const finishing = [
    'Fully Finished', 'Semi Finished', 'Fully Furnished', 'Skeleton', 'Semi Furnished'
  ];

  for (const fin of finishing) {
    await prisma.finishing_statuses.upsert({
      where: { id: `fin-${fin.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `fin-${fin.toLowerCase().replace(/\s+/g, '-')}`,
        company_id: TENANT_ID,
        name: fin,
        is_active: true,
        sort_order: 1,
        updated_at: new Date()
      }
    });
  }
  console.log(`  ✅ Seeded ${finishing.length} finishing statuses`);

  // Currencies
  console.log('💰 Seeding currencies...');
  const currencies = [
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' }
  ];

  for (const curr of currencies) {
    await prisma.currencies.upsert({
      where: { id: `curr-${curr.code.toLowerCase()}` },
      update: {},
      create: {
        id: `curr-${curr.code.toLowerCase()}`,
        code: curr.code,
        name: curr.name,
        symbol: curr.symbol,
        updated_at: new Date()
      }
    });
  }
  console.log(`  ✅ Seeded ${currencies.length} currencies`);

  // Regions
  console.log('🗺️  Seeding regions...');
  const regions = [
    'New Cairo', 'Katameya', '5th Settlement', 'West Golf', 'Hyde Park',
    'Mivida', 'Uptown Cairo', 'Stella Heights', 'Marassi', 'North Coast',
    'Ain Sokhna', '6th of October', 'Maadi', 'Heliopolis', 'Zamalek',
    'Nasr City', 'Rehab City', 'Shorouk', 'Helwan', 'Tagamoa',
    'Mountain View', 'Palm Hills', 'Sodic', 'Emaar', 'Compound 90',
    'Eastown', 'Cairo Festival City', 'Allegria', 'Sheikh Zayed',
    'Downtown', 'Garden City', 'Mohandessin', 'Dokki', 'Agouza',
    'Giza', 'Smart Village', 'New Zayed'
  ];

  for (const region of regions) {
    await prisma.region.upsert({
      where: { id: `region-${region.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `region-${region.toLowerCase().replace(/\s+/g, '-')}`,
        company_id: TENANT_ID,
        name: region,
        display_name: region,
        is_active: true,
        sort_order: 1,
        updated_at: new Date()
      }
    });
  }
  console.log(`  ✅ Seeded ${regions.length} regions`);

  console.log('\n✅ All lookup tables seeded successfully!');
}

async function main() {
  try {
    await seedLookupTables();
  } catch (error) {
    console.error('❌ Error seeding lookup tables:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
