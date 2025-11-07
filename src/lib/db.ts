import mysql from 'mysql2/promise';

// Database connection configuration for Aiven MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Aiven requires SSL connection
  // For development, we accept self-signed certificates
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : undefined,
  // Connection pool settings
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create a connection pool
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Get a connection from the pool
export async function getConnection() {
  const pool = getPool();
  return await pool.getConnection();
}

// Execute a query
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const pool = getPool();
  const [results] = await pool.execute(sql, params);
  return results as T;
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
