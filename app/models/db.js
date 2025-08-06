// db.js
import { createPool } from "mysql";
import {DB_CONFIG} from '../config/db.config.js'

const pool = createPool({
  host: DB_CONFIG.HOST ,
  user: DB_CONFIG.USER ,
  password: DB_CONFIG.PASSWORD,
  database: DB_CONFIG.DB ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default pool; 
