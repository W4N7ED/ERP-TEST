
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { host, port, username, password, database, type } = body;

    console.log(`Verifying connection to ${database}@${host}:${port} (type: ${type})`);
    
    // Mock database - always return success
    if (type === "mock") {
      return new Response(
        JSON.stringify({
          success: true,
          message: `Mock database connection verified successfully.`
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }
    
    // PostgreSQL connection
    if (type === "postgres") {
      // Test PostgreSQL database connection
      const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;
      
      console.log(`Attempting PostgreSQL connection with: ${host}:${port}, username: ${username}, database: ${database}`);
      
      const pool = new Pool(connectionString, 1);
      const connection = await pool.connect();
      
      try {
        // Execute a simple query to check that the connection works
        const result = await connection.queryObject`SELECT 1 as connection_test`;
        
        console.log('PostgreSQL database connection successful:', result.rows);
        
        return new Response(
          JSON.stringify({
            success: true,
            message: `Connection to ${database}@${host}:${port} verified successfully.`
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      } finally {
        // Release the connection back to the pool
        connection.release();
        await pool.end();
      }
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
    console.error('Database connection error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Connection error: ${error.message}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
