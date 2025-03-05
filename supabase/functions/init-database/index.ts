
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { 
  corsHeaders, 
  initPostgresDatabase, 
  initMockDatabase 
} from "./database.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { host, port, username, password, database, type, tablePrefix = "" } = body;

    console.log(`Initializing database ${database} on ${host}:${port} (type: ${type})`);
    
    // Mock database - always return success
    if (type === "mock") {
      return new Response(
        JSON.stringify(initMockDatabase()),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }
    
    // Direct PostgreSQL initialization (not using Supabase)
    if (type === "postgres") {
      console.log("Using direct PostgreSQL connection for initialization");
      const result = await initPostgresDatabase(host, port, username, password, database, tablePrefix);
      
      return new Response(
        JSON.stringify(result),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: result.success ? 200 : 500,
        }
      );
    }
    
    // MySQL and other databases not supported in this Edge Function
    return new Response(
      JSON.stringify({
        success: false,
        message: `Database type ${type} not supported by this Edge Function. Use the client-side implementation.`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  } catch (error) {
    console.error('Database initialization error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Initialization error: ${error.message}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
