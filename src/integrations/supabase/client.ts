
// This is a mock client that simulates Supabase functionality
// It provides the same API structure but uses localStorage for persistence

class MockSupabaseClient {
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
      
      // Special handling for database operations
      if (name === 'init-database') {
        return { 
          data: { 
            success: true, 
            message: "Mock database initialized successfully", 
            tables: ['users', 'inventory', 'suppliers', 'projects', 'interventions', 'movements', 'clients', 'quotes', 'quote_items'] 
          }, 
          error: null 
        };
      }
      
      if (name === 'verify-db-connection') {
        return { 
          data: { 
            success: true, 
            message: "Mock database connection verified successfully" 
          }, 
          error: null 
        };
      }
      
      return { 
        data: null, 
        error: new Error("Edge functions are not available in offline mode") 
      };
    }
  };
}

export const supabase = new MockSupabaseClient() as any;
export const supabaseClient = supabase; // Add this line for compatibility
