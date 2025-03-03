
import { Pool } from 'pg';
import { availablePermissions } from '@/hooks/permissions/availablePermissions';

// Function to check if code is running in browser
const isBrowser = typeof window !== 'undefined';

// Fonction pour initialiser la connexion à la base de données
export const initDatabaseConnection = async (
  host: string,
  port: string,
  username: string,
  password: string,
  database: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // In browser environment, we should handle this differently
    if (isBrowser) {
      console.warn('Direct database connection from browser is not recommended. Consider using API endpoints.');
    }

    // Créer une connexion à la base de données
    const pool = new Pool({
      host,
      port: parseInt(port),
      user: username,
      password,
      database,
      ssl: {
        rejectUnauthorized: false // Pour le développement, à ajuster en production
      }
    });

    // Tester la connexion
    const client = await pool.connect();
    console.log('Connexion à la base de données établie avec succès');
    
    // Exécution du script de création des tables
    await createTables(client);
    
    // Libérer la connexion
    client.release();
    
    return { 
      success: true, 
      message: `Connexion à ${database}@${host}:${port} établie avec succès et tables créées.` 
    };
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return { 
      success: false, 
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
    };
  }
};

// Fonction pour créer toutes les tables nécessaires
async function createTables(client: any): Promise<void> {
  try {
    // Démarrer une transaction
    await client.query('BEGIN');

    // Création de toutes les tables
    await client.query(`
      -- Création de la table des profils utilisateurs
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des rôles
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des permissions
      CREATE TABLE IF NOT EXISTS permissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table de relation rôles-permissions
      CREATE TABLE IF NOT EXISTS role_permissions (
        id SERIAL PRIMARY KEY,
        role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE NOT NULL,
        permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        UNIQUE(role_id, permission_id)
      );

      -- Création de la table des fournisseurs
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT,
        email TEXT,
        phone TEXT,
        delivery_time INTEGER,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des catégories de produits
      CREATE TABLE IF NOT EXISTS product_categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des sous-catégories de produits
      CREATE TABLE IF NOT EXISTS product_subcategories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category_id INTEGER REFERENCES product_categories(id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        UNIQUE(name, category_id)
      );

      -- Création de la table d'inventaire
      CREATE TABLE IF NOT EXISTS inventory_items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        reference TEXT NOT NULL UNIQUE,
        brand TEXT,
        model TEXT,
        category_id INTEGER REFERENCES product_categories(id) NOT NULL,
        subcategory_id INTEGER REFERENCES product_subcategories(id),
        supplier_id INTEGER REFERENCES suppliers(id),
        serial_number TEXT,
        location TEXT NOT NULL,
        status TEXT NOT NULL,
        entry_date DATE NOT NULL,
        warranty_end DATE,
        quantity INTEGER NOT NULL DEFAULT 0,
        threshold INTEGER NOT NULL DEFAULT 0,
        max_stock INTEGER,
        unit_cost DECIMAL(10, 2),
        selling_price DECIMAL(10, 2),
        description TEXT,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        assigned_to TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des mouvements de stocks
      CREATE TABLE IF NOT EXISTS product_movements (
        id SERIAL PRIMARY KEY,
        inventory_item_id INTEGER REFERENCES inventory_items(id) ON DELETE CASCADE NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        type TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        user_id UUID REFERENCES profiles(id),
        reason TEXT,
        source_location TEXT,
        destination_location TEXT,
        related_intervention_id INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des projets
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        reference TEXT NOT NULL UNIQUE,
        client TEXT,
        location TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status TEXT NOT NULL,
        progress INTEGER NOT NULL DEFAULT 0,
        description TEXT,
        budget_estimated DECIMAL(10, 2) NOT NULL DEFAULT 0,
        budget_actual DECIMAL(10, 2) NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        archived BOOLEAN DEFAULT false NOT NULL
      );

      -- Création de la table des membres de l'équipe de projet
      CREATE TABLE IF NOT EXISTS project_members (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
        user_id UUID REFERENCES profiles(id),
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des phases de projet
      CREATE TABLE IF NOT EXISTS project_phases (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
        name TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status TEXT NOT NULL,
        progress INTEGER NOT NULL DEFAULT 0,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des jalons de projet
      CREATE TABLE IF NOT EXISTS project_milestones (
        id SERIAL PRIMARY KEY,
        phase_id INTEGER REFERENCES project_phases(id) ON DELETE CASCADE NOT NULL,
        name TEXT NOT NULL,
        date DATE NOT NULL,
        completed BOOLEAN DEFAULT false NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des tâches de projet
      CREATE TABLE IF NOT EXISTS project_tasks (
        id SERIAL PRIMARY KEY,
        phase_id INTEGER REFERENCES project_phases(id) ON DELETE CASCADE NOT NULL,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        priority TEXT NOT NULL,
        deadline DATE NOT NULL,
        assigned_to INTEGER REFERENCES project_members(id) ON DELETE SET NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des interventions
      CREATE TABLE IF NOT EXISTS interventions (
        id SERIAL PRIMARY KEY,
        reference TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT,
        client_id INTEGER,
        location TEXT,
        status TEXT NOT NULL,
        priority TEXT NOT NULL,
        type TEXT NOT NULL,
        scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
        scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
        actual_start TIMESTAMP WITH TIME ZONE,
        actual_end TIMESTAMP WITH TIME ZONE,
        technician_id UUID REFERENCES profiles(id),
        project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
        notes TEXT,
        created_by UUID REFERENCES profiles(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        archived BOOLEAN DEFAULT false NOT NULL
      );

      -- Création de la table des relations entre tâches de projet et interventions
      CREATE TABLE IF NOT EXISTS task_interventions (
        id SERIAL PRIMARY KEY,
        task_id INTEGER REFERENCES project_tasks(id) ON DELETE CASCADE NOT NULL,
        intervention_id INTEGER REFERENCES interventions(id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        UNIQUE(task_id, intervention_id)
      );

      -- Création de la table des clients
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        company TEXT,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        vat_number TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des devis
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        reference TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        expiration_date DATE NOT NULL,
        status TEXT NOT NULL,
        client_id INTEGER REFERENCES clients(id) NOT NULL,
        issuer_id UUID REFERENCES profiles(id) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
        tax_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
        discount_type TEXT,
        discount_value DECIMAL(10, 2),
        discount_amount DECIMAL(10, 2),
        total DECIMAL(10, 2) NOT NULL DEFAULT 0,
        notes TEXT,
        terms TEXT,
        project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
        intervention_id INTEGER REFERENCES interventions(id) ON DELETE SET NULL,
        responsible_id UUID REFERENCES profiles(id) NOT NULL,
        signature_url TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table des éléments de devis
      CREATE TABLE IF NOT EXISTS quote_items (
        id SERIAL PRIMARY KEY,
        quote_id INTEGER REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        unit_price DECIMAL(10, 2) NOT NULL,
        quantity INTEGER NOT NULL,
        discount DECIMAL(5, 2),
        tax_rate DECIMAL(5, 2) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        inventory_item_id INTEGER REFERENCES inventory_items(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );

      -- Création de la table de l'historique des devis
      CREATE TABLE IF NOT EXISTS quote_history (
        id SERIAL PRIMARY KEY,
        quote_id INTEGER REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
        action TEXT NOT NULL,
        user_id UUID REFERENCES profiles(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
      );
    `);

    // Insertion des rôles de base
    await client.query(`
      INSERT INTO roles (name) 
      VALUES ('Admin'), ('Technicien'), ('Commercial'), ('Gestionnaire de stock')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Insertion des permissions définies dans l'application
    const insertPermissionPromises = availablePermissions.map(permission => {
      return client.query(`
        INSERT INTO permissions (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING;
      `, [permission, `Permission pour ${permission}`]);
    });

    await Promise.all(insertPermissionPromises);

    // Validation de la transaction
    await client.query('COMMIT');
    console.log('Tables créées avec succès');
  } catch (error) {
    // Annulation de la transaction en cas d'erreur
    await client.query('ROLLBACK');
    console.error('Erreur lors de la création des tables:', error);
    throw error;
  }
}
