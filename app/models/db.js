// db.js
import { createPool } from "mysql";
import 'dotenv/config'; 

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

export const query = pool.query.bind(pool); 
export default pool; 
