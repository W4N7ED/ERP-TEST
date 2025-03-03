
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Définition des tables à créer
const createTableStatements = [
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
    technician_id INTEGER,
    date_performed DATE NOT NULL,
    duration INTEGER, -- in minutes
    description TEXT NOT NULL,
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
    client_id INTEGER NOT NULL,
    project_id INTEGER,
    date_issued DATE NOT NULL,
    valid_until DATE,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    notes TEXT,
    created_by INTEGER, -- user_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`,
  
  `CREATE TABLE IF NOT EXISTS quote_items (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL,
    inventory_id INTEGER,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`
];

// Relations entre les tables
const createForeignKeyStatements = [
  `ALTER TABLE inventory ADD CONSTRAINT fk_inventory_supplier 
   FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL`,
   
  `ALTER TABLE projects ADD CONSTRAINT fk_projects_client 
   FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL`,
   
  `ALTER TABLE interventions ADD CONSTRAINT fk_interventions_project 
   FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE`,
   
  `ALTER TABLE interventions ADD CONSTRAINT fk_interventions_technician 
   FOREIGN KEY (technician_id) REFERENCES users(id) ON DELETE SET NULL`,
   
  `ALTER TABLE movements ADD CONSTRAINT fk_movements_inventory 
   FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE CASCADE`,
   
  `ALTER TABLE movements ADD CONSTRAINT fk_movements_user 
   FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL`,
   
  `ALTER TABLE quotes ADD CONSTRAINT fk_quotes_client 
   FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE`,
   
  `ALTER TABLE quotes ADD CONSTRAINT fk_quotes_project 
   FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL`,
   
  `ALTER TABLE quotes ADD CONSTRAINT fk_quotes_user 
   FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL`,
   
  `ALTER TABLE quote_items ADD CONSTRAINT fk_quote_items_quote 
   FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE`,
   
  `ALTER TABLE quote_items ADD CONSTRAINT fk_quote_items_inventory 
   FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE SET NULL`
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { host, port, username, password, database } = body;

    console.log(`Initialisation de la base de données ${database} sur ${host}:${port}`);

    // Connexion à la base de données
    const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;
    
    const pool = new Pool(connectionString, 1);
    const connection = await pool.connect();
    
    try {
      const createdTables = [];
      
      // Création des tables
      for (const statement of createTableStatements) {
        try {
          console.log(`Exécution: ${statement.substring(0, 50)}...`);
          await connection.queryObject(statement);
          
          // Extraire le nom de la table du statement CREATE TABLE
          const tableName = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)?.[1];
          if (tableName) {
            createdTables.push(tableName);
          }
        } catch (tableError) {
          console.error(`Erreur lors de la création de la table: ${tableError.message}`);
        }
      }
      
      // Création des relations (foreign keys)
      for (const statement of createForeignKeyStatements) {
        try {
          console.log(`Exécution: ${statement.substring(0, 50)}...`);
          await connection.queryObject(statement);
        } catch (fkError) {
          // Si la contrainte existe déjà, ignorer l'erreur
          if (!fkError.message.includes('already exists')) {
            console.error(`Erreur lors de la création des relations: ${fkError.message}`);
          }
        }
      }
      
      console.log('Base de données initialisée avec succès. Tables créées:', createdTables);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `Connexion à ${database}@${host}:${port} établie avec succès et tables créées.`,
          tables: createdTables
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } finally {
      // Libérer la connexion
      connection.release();
      await pool.end();
    }
  } catch (error) {
    console.error('Erreur d\'initialisation de la base de données:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Erreur d'initialisation: ${error.message}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
