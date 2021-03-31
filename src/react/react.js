import {db} from 'https://deno.land/x/media_types@v2.3.7/db.ts'

async function handleRequest(request) {
  let path = new URL(request.url).pathname.substring(1)
  if (path === '') {
    path = 'index.html'
  }
  path = 'dist/build/' + path
  return new Response(await readURL(path), {
    headers: {
      'Content-Type': Object.keys(db).filter(t => (db[t].extensions || []).some(ext => path.endsWith(ext))).shift() || 'text/plain'
    }
  })
}

async function readURL(path) {
  const base = import.meta.url
  if (base.startsWith('file')) {
    return Deno.readFile(path).catch(e => 'fail to load file: ' + e.toString())
  } else if (base.startsWith('http')) {
    return fetch(new URL(path, import.meta.url).toString()).then(e => e.body)
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
});
