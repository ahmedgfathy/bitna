import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma client
// Only log errors to stderr to keep stdout clean for MCP JSON communication
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
  ],
});

// Log errors to stderr only
prisma.$on('error' as never, (e: any) => {
  console.error('[Prisma Error]:', e);
});

// Health check function
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    await prisma.$executeRaw`SELECT 1`;
    return { status: 'connected', message: 'Database connection successful' };
  } catch (error) {
    console.error('[Database] Connection failed:', error);
    return { 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Disconnect function for graceful shutdown
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

export default prisma;