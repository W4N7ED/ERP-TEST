
import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Connect to the PostgreSQL database
export const connectToDatabase = async (
  host: string, 
  port: string, 
  username: string, 
  password: string, 
  database: string
): Promise<Pool> => {
  const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;
  console.log(`Attempting PostgreSQL connection with: ${host}:${port}, username: ${username}, database: ${database}`);
  return new Pool(connectionString, 1);
};

// Create database tables
export const createTables = async (
  connection: PoolClient, 
  tableStatements: string[], 
  tablePrefix: string
): Promise<string[]> => {
  const createdTables = [];
  
  for (const statement of tableStatements) {
    try {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await connection.queryObject(statement);
      
      // Extract the table name from the CREATE TABLE statement
      let tableName = statement.match(/CREATE TABLE IF NOT EXISTS (?:${tablePrefix})?(\w+)/i)?.[1];
      if (tableName) {
        if (tablePrefix) {
          tableName = `${tablePrefix}${tableName}`;
        }
        createdTables.push(tableName);
      }
    } catch (tableError) {
      console.error(`Error creating table: ${tableError.message}`);
      throw tableError;
    }
  }
  
  return createdTables;
};

// Create foreign key relationships
export const createForeignKeys = async (
  connection: PoolClient, 
  foreignKeyStatements: string[]
): Promise<void> => {
  for (const statement of foreignKeyStatements) {
    try {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await connection.queryObject(statement);
    } catch (fkError) {
      // If the constraint already exists, ignore the error
      if (!fkError.message.includes('already exists')) {
        console.error(`Error creating relationships: ${fkError.message}`);
        throw fkError;
      }
    }
  }
};
