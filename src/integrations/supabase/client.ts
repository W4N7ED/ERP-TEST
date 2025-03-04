
// This is a mock Supabase client for open-source version
// It provides the same API structure but uses localStorage for persistence

class MockSupabaseClient {
  auth = {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ data: {}, error: new Error("Authentication is not available in open-source version") }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback: any) => {
      // Return a fake subscription object
      return {
        data: { subscription: { unsubscribe: () => {} } }
      };
    },
    getUser: async () => ({ data: { user: null } }),
    admin: {
      createUser: async () => ({ data: {}, error: new Error("Admin functions are not available in open-source version") })
    }
  };
  
  storage = {
    from: (bucket: string) => ({
      upload: async () => ({ data: null, error: new Error("Storage is not available in open-source version") }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  };
  
  from = (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: async () => ({ error: null })
    }),
    insert: async () => ({ error: null })
  });
  
  functions = {
    invoke: async (name: string, options?: any) => {
      console.log(`Mock function invocation: ${name}`, options);
      return { data: null, error: new Error("Edge functions are not available in open-source version") };
    }
  };
}

export const supabase = new MockSupabaseClient() as any;
