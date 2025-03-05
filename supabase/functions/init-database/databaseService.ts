
import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { createTableStatements, createForeignKeyStatements } from "./schema.ts";
import { addPrefixToStatements, addPrefixToForeignKeyStatements } from "./utils.ts";
import { connectToDatabase, createTables, createForeignKeys } from "./postgresClient.ts";

// Initialize PostgreSQL database
export const initPostgresDatabase = async (
  host: string, 
  port: string, 
  username: string, 
  password: string, 
  database: string, 
  tablePrefix: string = ""
): Promise<{ success: boolean; message: string; tables?: string[] }> => {
  const pool = await connectToDatabase(host, port, username, password, database);
  const connection = await pool.connect();
  
  try {
    // Add prefix to statements if needed
    const prefixedCreateTableStatements = addPrefixToStatements(createTableStatements, tablePrefix);
    const prefixedForeignKeyStatements = addPrefixToForeignKeyStatements(createForeignKeyStatements, tablePrefix);
    
    // Create tables and relationships
    const createdTables = await createTables(connection, prefixedCreateTableStatements, tablePrefix);
    await createForeignKeys(connection, prefixedForeignKeyStatements);
    
    console.log('Database initialized successfully. Tables created:', createdTables);
    
    return {
      success: true,
      message: `Connection to ${database}@${host}:${port} established successfully and tables created.`,
      tables: createdTables
    };
  } catch (error) {
    console.error('Error initializing database:', error);
    return {
      success: false,
      message: `Initialization error: ${error.message}`
    };
  } finally {
    // Release the connection
    connection.release();
    await pool.end();
  }
};

// Mock database initialization (always returns success)
export const initMockDatabase = (): { success: boolean; message: string; tables: string[] } => {
  return {
    success: true,
    message: `Mock database configured.`,
    tables: ['users', 'inventory', 'suppliers', 'projects', 'interventions', 'movements', 'clients', 'quotes', 'quote_items']
  };
};
