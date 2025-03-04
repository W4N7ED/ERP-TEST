
import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Cross-Origin Resource Sharing (CORS) headers
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Database tables structure
export const createTableStatements = [
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    permissions TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    unit_price DECIMAL(10, 2),
    supplier_id INTEGER,
    location VARCHAR(100),
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    client_id INTEGER,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'active',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS interventions (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    technician VARCHAR(100) NOT NULL,
    date_performed DATE NOT NULL,
    duration INTEGER, -- in minutes
    description TEXT NOT NULL,
    client VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS movements (
    id SERIAL PRIMARY KEY,
    inventory_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    movement_type VARCHAR(50) NOT NULL, -- in, out, transfer
    reference_id INTEGER, -- project_id or intervention_id
    reference_type VARCHAR(50), -- project or intervention
    performed_by INTEGER, -- user_id
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
  )`,
  
  `CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(100) NOT NULL,
    client_id INTEGER NOT NULL,
    project_id INTEGER,
    date_issued DATE NOT NULL,
    valid_until DATE,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    notes TEXT,
    terms TEXT,
    created_by INTEGER, -- user_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS quote_items (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    discount DECIMAL(5, 2) DEFAULT 0,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`
];

// Database relationships structure
export const createForeignKeyStatements = [
  `ALTER TABLE inventory ADD CONSTRAINT IF NOT EXISTS fk_inventory_supplier 
   FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL`,
   
  `ALTER TABLE projects ADD CONSTRAINT IF NOT EXISTS fk_projects_client 
   FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL`,
   
  `ALTER TABLE movements ADD CONSTRAINT IF NOT EXISTS fk_movements_inventory 
   FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE`,
   
  `ALTER TABLE movements ADD CONSTRAINT IF NOT EXISTS fk_movements_user 
   FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL`,
   
  `ALTER TABLE quotes ADD CONSTRAINT IF NOT EXISTS fk_quotes_client 
   FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE`,
   
  `ALTER TABLE quotes ADD CONSTRAINT IF NOT EXISTS fk_quotes_project 
   FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL`,
   
  `ALTER TABLE quotes ADD CONSTRAINT IF NOT EXISTS fk_quotes_user 
   FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL`,
   
  `ALTER TABLE quote_items ADD CONSTRAINT IF NOT EXISTS fk_quote_items_quote 
   FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE`
];

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

// Add table prefix to statements if needed
export const addPrefixToStatements = (
  statements: string[], 
  tablePrefix: string
): string[] => {
  if (!tablePrefix) return statements;
  
  return statements.map(statement => {
    // Replace "CREATE TABLE IF NOT EXISTS table_name" with "CREATE TABLE IF NOT EXISTS prefix_table_name"
    return statement.replace(
      /(CREATE TABLE IF NOT EXISTS )(\w+)/i, 
      `$1${tablePrefix}$2`
    );
  });
};

// Add table prefix to foreign key statements if needed
export const addPrefixToForeignKeyStatements = (
  statements: string[], 
  tablePrefix: string
): string[] => {
  if (!tablePrefix) return statements;
  
  return statements.map(statement => {
    // Replace table names with prefixed versions
    return statement
      .replace(/ALTER TABLE (\w+)/i, `ALTER TABLE ${tablePrefix}$1`)
      .replace(/REFERENCES (\w+)/gi, `REFERENCES ${tablePrefix}$1`);
  });
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
