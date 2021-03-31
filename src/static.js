async function handleRequest(request) {
  const path = new URL(request.url).pathname.substring(1)
  return new Response(await readURL(path), {status: 200})
}

async function readURL(path) {
  const base = import.meta.url
  if (base.startsWith('file')) {
    return Deno.readTextFile(path).catch(e => 'fail to load file: ' + e.toString())
  } else if (base.startsWith('http')) {
    return fetch(new URL(path, import.meta.url).toString()).then(e => e.body)
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
});
