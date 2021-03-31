function handleRequest(request: Request): Response {
  const {pathname} = new URL(request.url);

  if (pathname.startsWith("/html")) {
    const html = `<html lang="en"><p><b>Message:</b> Hello from Deno Deploy.</p></html>`;
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  } else if (pathname.startsWith("/json")) {
    const json = JSON.stringify({message: "Hello from Deno Deploy"});
    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  } else {
    return new Response("not found", {
      status: 404
    });
  }
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});