addEventListener("fetch", (event: FetchEvent) => {
  // Get the value of the header named `x-forwarded-for`.
  // The value can either be a IPv4 or IPv6 address.
  const ip = event.request.headers.get("x-forwarded-for");
  const response = new Response(`Your IP address is <b>${ip}</b>`, {
    headers: {"content-type": "text/html"},
  });
  event.respondWith(response);
});