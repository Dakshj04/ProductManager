// db.js
import 'dotenv/config';
import { createPool } from "mysql";

const pool = createPool({
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DB || 'product_db'
});

export const query = pool.query.bind(pool); 
export default pool; 
