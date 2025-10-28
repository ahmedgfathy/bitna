import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle connection lifecycle
prisma.$connect()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((error) => console.error('❌ Database connection failed:', error));

export default prisma;
