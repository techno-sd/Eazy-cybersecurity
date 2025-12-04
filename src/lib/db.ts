import mysql from 'mysql2/promise';

// Database connection configuration for Aiven MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // SSL configuration for database connection
  // In production, enforce certificate validation for security
  // In development with self-signed certs, allow unverified certificates
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  } : undefined,
  // Connection pool settings
  waitForConnections: true,
  connectionLimit: 30, // Increased to handle parallel queries
  queueLimit: 0,
  maxIdle: 15, // Maximum idle connections
  idleTimeout: 60000, // Close idle connections after 60 seconds
  connectTimeout: 30000, // Connection timeout 30 seconds (increased for cloud DB)
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000 // Start keepalive after 10 seconds
};

// Create a connection pool
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);

    // Log pool creation
    console.log('📊 Database pool created with config:', {
      connectionLimit: dbConfig.connectionLimit,
      maxIdle: dbConfig.maxIdle,
      idleTimeout: dbConfig.idleTimeout
    });
  }
  return pool;
}

// Force pool reset (useful during development)
export function resetPool(): void {
  if (pool) {
    pool.end().catch(console.error);
    pool = null;
  }
}

// Get a connection from the pool
export async function getConnection() {
  const pool = getPool();
  return await pool.getConnection();
}

// Execute a query with retry logic for transient failures
export async function query<T = any>(sql: string, params?: any[], retries = 2): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const pool = getPool();
      const [results] = await pool.execute(sql, params);
      return results as T;
    } catch (error: any) {
      lastError = error;

      // Retry on connection errors
      const isRetryable = ['ETIMEDOUT', 'ECONNREFUSED', 'ECONNRESET', 'PROTOCOL_CONNECTION_LOST'].includes(error.code);

      if (isRetryable && attempt < retries) {
        console.warn(`Database connection failed (attempt ${attempt + 1}/${retries + 1}), retrying...`);
        // Reset pool on connection errors
        resetPool();
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }

      // Re-throw with error code preserved for proper handling in API routes
      const dbError = new Error(error.message) as any;
      dbError.code = error.code;
      dbError.errno = error.errno;
      dbError.sql = error.sql;
      throw dbError;
    }
  }

  throw lastError;
}

// Execute a query and return a single row
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<any[]>(sql, params);
  return results.length > 0 ? results[0] : null;
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Close the connection pool
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

const db = {
  getPool,
  getConnection,
  query,
  queryOne,
  testConnection,
  closePool
};

export default db;
