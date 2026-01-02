// Get the client
import envConfig from "config/env";
import mysql from "mysql2/promise";

const getConnection = async () => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    port: Number(envConfig.DATABASE_PORT),
    host: envConfig.DATABASE_HOST,
    user: envConfig.DATABASE_USER,
    password: envConfig.DATABASE_PASSWORD,
    database: envConfig.DATABASE_NAME,
  });

  return connection;
};

export default getConnection;
