import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean up old data first
  console.log('🧹 Cleaning up old data...');
  await prisma.user.deleteMany({ where: { mobile: '01002778090' } });
  await prisma.tenant.deleteMany({ where: { mobile: '01002778090' } });
  await prisma.tenant.deleteMany({ where: { id: { in: ['tenant-1', 'super-admin-tenant', 'demo-tenant-1'] } } });

  // Create Super Admin Tenant (SaaS Platform Owner)
  const superAdminTenant = await prisma.tenant.create({
    data: {
      id: 'super-admin-tenant',
      name: 'Contaboo SaaS Platform',
      companyName: 'Contaboo - Real Estate CRM',
      type: 'COMPANY',
      mobile: '01002778090',
      address: 'Cairo, Egypt',
      city: 'Cairo',
      region: 'Cairo',
      country: 'Egypt',
      phone: '+20 100 277 8090',
      email: 'admin@contaboo.com',
      website: 'https://contaboo.com',
      description: 'Multi-tenant Real Estate CRM SaaS Platform - Super Admin Account',
    },
  });

  console.log(`✅ Created Super Admin Tenant: ${superAdminTenant.companyName}`);

  // Create Super Admin User (Platform Owner - Ahmed Gomaa)
  const superAdmin = await prisma.user.create({
    data: {
      id: 'super-admin-1',
      mobile: '01002778090',
      name: 'Ahmed Gomaa',
      email: 'ahmed@contaboo.com',
      role: 'OWNER',
      status: 'ACTIVE',
      tenantId: superAdminTenant.id,
    },
  });

  console.log(`✅ Created Super Admin: ${superAdmin.name} (Platform Owner)`);

  // Create a demo tenant for testing
  const demoTenant = await prisma.tenant.create({
    data: {
      id: 'demo-tenant-1',
      name: 'Demo Real Estate Company',
      companyName: 'Demo Properties Ltd',
      type: 'COMPANY',
      mobile: '01012345678',
      address: '456 Business Street',
      city: 'Cairo',
      region: 'Maadi',
      country: 'Egypt',
      phone: '+20 2 1234 5678',
      email: 'info@demoproperties.com',
      website: 'https://demoproperties.com',
      description: 'Demo company for testing purposes',
    },
  });

  console.log(`✅ Created Demo Tenant: ${demoTenant.companyName}`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`   🔐 Super Admin: ${superAdmin.name}`);
  console.log(`   📱 Mobile: ${superAdmin.mobile}`);
  console.log(`   🏢 Tenant: ${superAdminTenant.companyName}`);
  console.log(`   👑 Role: Platform Owner (Full Access)`);
  console.log('\n💡 Login Credentials:');
  console.log(`   Mobile: 01002778090`);
  console.log(`   Password: zerocall`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
