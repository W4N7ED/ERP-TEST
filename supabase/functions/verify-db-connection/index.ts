
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
    const { host, port, username, password, database } = body;

    console.log(`Vérification de la connexion à ${database}@${host}:${port}`);

    // Test la connexion à la base de données
    const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;
    
    const pool = new Pool(connectionString, 1);
    const connection = await pool.connect();
    
    try {
      // Execute a simple query to check that the connection works
      const result = await connection.queryObject`SELECT 1 as connection_test`;
      
      console.log('Connexion à la base de données réussie:', result.rows);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `Connexion à ${database}@${host}:${port} vérifiée avec succès.`
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
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Erreur de connexion: ${error.message}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
