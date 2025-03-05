
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
