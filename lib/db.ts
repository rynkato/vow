import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
  idleTimeout: 300,
  acquireTimeout: 10000,
});

// Declare a global variable to store the pool instance
declare const globalThis: {
  mariaDBPool: typeof pool;
} & typeof global;

const getPool = () => {
  if (process.env.NODE_ENV === "production") {
    return pool;
  }

  // In development mode, use a single global instance
  if (!globalThis.mariaDBPool) {
    globalThis.mariaDBPool = pool;
  }
  return globalThis.mariaDBPool;
};

export async function query(sql: string, params?: any[], maxRetries = 3) {
  let conn;
  let attempt = 0;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const currentPool = getPool();

  while (attempt < maxRetries) {
    try {
      conn = await currentPool.getConnection();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) {
        throw err;
      }
      await delay(Math.pow(2, attempt) * 1000); // Exponential backoff
    } finally {
      if (conn) {
        try {
          await conn.release();
        } catch (err) {
          // Handle release error
        }
      }
    }
  }
}
