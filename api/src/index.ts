import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Import routes
import propertiesRouter from './routes/properties';
import leadsRouter from './routes/leads';
import usersRouter from './routes/users';
import staticDataRouter from './routes/staticData';
import statsRouter from './routes/stats';
import activitiesRouter from './routes/activities';
import companyRouter from './routes/company';
import employeesRouter from './routes/employees';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/auth';

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
// Increase payload size limit for CSV imports (200MB)
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Contaboo API is running',
    timestamp: new Date().toISOString()
  });
});

// Database connection test
app.get('/db-test', async (_req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({ 
      status: 'connected', 
      message: 'Database connection successful',
      database: 'contaboo'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Routes
app.use('/api/properties', authenticate, propertiesRouter);
app.use('/api/leads', authenticate, leadsRouter);
app.use('/api/users', authenticate, usersRouter);
app.use('/api/static', staticDataRouter); // Public endpoint
app.use('/api/stats', authenticate, statsRouter);
app.use('/api/activities', authenticate, activitiesRouter);
app.use('/api/company', authenticate, companyRouter);
app.use('/api/employees', authenticate, employeesRouter);

// Note: Authentication routes will be added in the next phase
// app.use('/api/auth', authRoutes);
// app.use('/api/tenants', tenantRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = Number(port);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡️ Contaboo API server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${port}/health`);
  console.log(`🗄️  Database test: http://localhost:${port}/db-test`);
  console.log(`\n📚 Available API Routes:`);
  console.log(`   GET    /api/properties - Get tenant's properties`);
  console.log(`   POST   /api/properties - Create property`);
  console.log(`   GET    /api/properties/public - Get public listings`);
  console.log(`   GET    /api/properties/nearby - Get nearby properties`);
  console.log(`   GET    /api/leads - Get tenant's leads`);
  console.log(`   POST   /api/leads - Create lead`);
  console.log(`   GET    /api/stats/dashboard - Get dashboard statistics`);
  console.log(`   GET    /api/activities - Get activities`);
  console.log(`   POST   /api/activities - Create activity`);
  console.log(`   GET    /api/company/profile - Get company profile`);
  console.log(`   PUT    /api/company/profile - Update company profile`);
  console.log(`   GET    /api/employees - Get all employees`);
  console.log(`   POST   /api/employees - Create employee`);
  console.log(`   PUT    /api/employees/:id - Update employee`);
  console.log(`   DELETE /api/employees/:id - Deactivate employee`);
  console.log(`   GET    /api/users - Get tenant's users`);
  console.log(`   POST   /api/users/employee - Add employee`);
  console.log(`   GET    /api/static/* - Get dropdown data`);
  console.log(`\n⚠️  Note: Auth endpoints will be added in next phase\n`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

