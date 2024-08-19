import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  idleTimeout: 300,
  acquireTimeout: 10000,
});

export async function query(sql: string, params?: any[], maxRetries = 3) {
  let conn;
  let attempt = 0;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  while (attempt < maxRetries) {
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) {
        // console.error("Max retries reached. Throwing error.");
        throw err;
      }
      // console.warn(`Retry attempt ${attempt}: ${err}`);
      await delay(Math.pow(2, attempt) * 1000); // Exponential backoff
    } finally {
      if (conn) {
        try {
          await conn.release();
        } catch (err) {
          // console.error("Failed to release connection:", err);
        }
      }
    }
  }
}
