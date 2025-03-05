
import { corsHeaders } from "../init-database/constants";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }
  
  try {
    // Parse the request URL to get the endpoint path
    const url = new URL(req.url);
    const targetPath = url.pathname.replace('/lovable-proxy', '');
    
    // Forward the request to the Lovable API
    const targetUrl = `https://lovable-api.com${targetPath}`;
    
    console.log(`Proxying request to ${targetUrl}`);
    
    // Clone the request with the original headers
    const headers = new Headers(req.headers);
    headers.delete('host'); // Remove the host header as it will be set by fetch
    
    // Add CORS headers to all outgoing requests
    headers.set('Origin', req.headers.get('origin') || 'http://localhost:8080');
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.blob() : undefined,
    });
    
    // Create a new response with the CORS headers
    const responseHeaders = new Headers(response.headers);
    Object.keys(corsHeaders).forEach(key => {
      responseHeaders.set(key, corsHeaders[key]);
    });
    
    // Return the proxied response with CORS headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error.message);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});
