import { Pool } from "pg";

const sql = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

sql.on("error", (err) => {
  console.error("SQL error:", err);
});

export default sql;
