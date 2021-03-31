function handleRequest(request: any): Response {
  const {pathname} = new URL(request.url);

  if (pathname.startsWith("/deno")) {
    // The long way of doing it.
    // Create an empty response with a header named 'location' containing
    // the destination address and a status code that lies between 300-399.
    return new Response(null, {
      headers: {
        location: "https://deno.land",
      },
      // 302 indicates to the client that the location of this request
      // is found and might change in future so the client should not
      // cache the location.
      status: 302,
    });
  } else if (pathname.startsWith("/deploy")) {
    // The short way of doing it.
    // Response has a static method that does what's
    // mentioned above but allows us to avoid the boilerplate.
    return Response.redirect("https://deno.com/deploy", 302);
  } else {
    return new Response("not found", {
      status: 404
    });
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});