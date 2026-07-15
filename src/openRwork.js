
export default {
  async fetch(request, env) {
  
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
   
      const body = await request.json();
      

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: body.messages, 
          model: body.model,
          max_tokens: body.max_tokens,
          temperature: body.temperature,
        }),
      });

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Greška na serveru" }), { status: 500 });
    }
  }
}