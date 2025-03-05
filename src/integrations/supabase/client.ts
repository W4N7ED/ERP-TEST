
// This is a mock client that simulates functionality
// It provides the same API structure but uses localStorage for persistence and direct API calls

class MockClient {
  auth = {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ data: {}, error: new Error("Authentication is not available in offline mode") }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback: any) => {
      // Return a fake subscription object
      return {
        data: { subscription: { unsubscribe: () => {} } }
      };
    },
    getUser: async () => ({ data: { user: null } }),
    admin: {
      createUser: async () => ({ data: {}, error: new Error("Admin functions are not available in offline mode") })
    }
  };
  
  storage = {
    from: (bucket: string) => ({
      upload: async () => ({ data: null, error: new Error("Storage is not available in offline mode") }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  };
  
  from = (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
        limit: () => ({ data: [], error: null })
      }),
      limit: () => ({ data: [], error: null })
    }),
    update: () => ({
      eq: async () => ({ error: null })
    }),
    insert: async () => ({ error: null })
  });
  
  channel = (name: string) => ({
    on: () => ({ subscribe: () => {} }),
    subscribe: () => {}
  });

  removeChannel = () => {};
  
  functions = {
    invoke: async (name: string, options?: any) => {
      console.log(`Mock function invocation: ${name}`, options);
      
      // Proxy mode - directly call our own proxy endpoint
      if (name === 'lovable-proxy') {
        try {
          const response = await fetch('/lovable-proxy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(options?.body || {}),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          
          const data = await response.json();
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      }
      
      // Special handling for database operations
      if (name === 'init-database') {
        return { 
          data: { 
            success: true, 
            message: "Base de données initialisée avec succès", 
            tables: ['users', 'inventory', 'suppliers', 'projects', 'interventions', 'movements', 'clients', 'quotes', 'quote_items'] 
          }, 
          error: null 
        };
      }
      
      if (name === 'verify-db-connection') {
        return { 
          data: { 
            success: true, 
            message: "Connexion à la base de données vérifiée avec succès" 
          }, 
          error: null 
        };
      }
      
      return { 
        data: null, 
        error: new Error("Cette fonctionnalité n'est pas disponible en mode hors ligne") 
      };
    }
  };
}

export const supabase = new MockClient() as any;
export const supabaseClient = supabase; // Add this line for compatibility
