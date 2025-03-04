
import { storageService } from "../storageService";
import { v4 as uuidv4 } from "uuid";

// Base class for all database collections
class Collection {
  private name: string;

  constructor(name: string) {
    this.name = name;
    // Initialize the collection if it doesn't exist
    if (!storageService.getData(this.name)) {
      storageService.saveData(this.name, []);
    }
  }

  // Get all items
  getAll() {
    return storageService.getData(this.name) || [];
  }

  // Get item by id
  getById(id: string | number) {
    const items = this.getAll();
    return items.find((item: any) => item.id == id);
  }

  // Add a new item
  add(item: any) {
    const items = this.getAll();
    const newItem = {
      ...item,
      id: item.id || uuidv4(),
      created_at: new Date().toISOString()
    };
    items.push(newItem);
    storageService.saveData(this.name, items);
    return newItem;
  }

  // Update an item
  update(id: string | number, updatedItem: any) {
    const items = this.getAll();
    const index = items.findIndex((item: any) => item.id == id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updatedItem,
        updated_at: new Date().toISOString()
      };
      storageService.saveData(this.name, items);
      return items[index];
    }
    return null;
  }

  // Delete an item
  delete(id: string | number) {
    const items = this.getAll();
    const filtered = items.filter((item: any) => item.id != id);
    storageService.saveData(this.name, filtered);
    return true;
  }

  // Query items with a filter function
  query(filterFn: (item: any) => boolean) {
    const items = this.getAll();
    return items.filter(filterFn);
  }
}

// MockOnlyDatabaseService class that will replace the Supabase database services
export class MockOnlyDatabaseService {
  private collections: { [key: string]: Collection } = {};

  constructor() {
    // Create some default collections
    this.collections.users = new Collection('users');
    this.collections.inventory = new Collection('inventory');
    this.collections.suppliers = new Collection('suppliers');
    this.collections.projects = new Collection('projects');
    this.collections.interventions = new Collection('interventions');
    this.collections.quotes = new Collection('quotes');
    this.collections.clients = new Collection('clients');
  }

  // Get a collection by name
  collection(name: string): Collection {
    if (!this.collections[name]) {
      this.collections[name] = new Collection(name);
    }
    return this.collections[name];
  }

  // Initialize the database with sample data if it's empty
  initializeWithSampleData() {
    // Check if we already have data
    if (this.collection('inventory').getAll().length > 0) {
      return;
    }

    // Add sample suppliers
    const suppliers = [
      { name: 'Fournisseur A', contact_name: 'Jean Dupont', email: 'contact@fournisseura.com', phone: '01 23 45 67 89' },
      { name: 'Fournisseur B', contact_name: 'Marie Martin', email: 'contact@fournisseurb.com', phone: '01 23 45 67 90' }
    ];
    suppliers.forEach(supplier => this.collection('suppliers').add(supplier));

    // Add sample inventory
    const inventory = [
      { name: 'Tournevis', category: 'Outils', quantity: 15, unit_price: 12.99, supplier_id: 1 },
      { name: 'Marteau', category: 'Outils', quantity: 10, unit_price: 15.50, supplier_id: 1 },
      { name: 'Lampe LED', category: 'Électricité', quantity: 25, unit_price: 8.75, supplier_id: 2 }
    ];
    inventory.forEach(item => this.collection('inventory').add(item));

    // Add sample clients
    const clients = [
      { name: 'Client Alpha', contact_name: 'Sophie Bernard', email: 'contact@alpha.com', phone: '01 98 76 54 32' },
      { name: 'Client Beta', contact_name: 'Thomas Petit', email: 'contact@beta.com', phone: '01 98 76 54 33' }
    ];
    clients.forEach(client => this.collection('clients').add(client));

    // Add sample projects
    const projects = [
      { name: 'Projet Maintenance', client_id: 1, start_date: '2023-01-15', end_date: '2023-06-30', status: 'active' },
      { name: 'Projet Installation', client_id: 2, start_date: '2023-02-01', end_date: '2023-04-30', status: 'completed' }
    ];
    projects.forEach(project => this.collection('projects').add(project));

    console.log('Base de données initialisée avec des données d\'exemple');
  }

  // Verify connection - returns true for mock database
  async verifyConnection() {
    return true;
  }
}

// Create singleton instance
export const mockOnlyDbService = new MockOnlyDatabaseService();
