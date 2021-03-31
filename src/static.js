console.log(Deno)
async function handleRequest(request) {
  const {pathname} = new URL(request.url)
  const filepath = '.' + pathname.replaceAll('_/', '../')
  const stat = await Deno.stat(filepath).catch(() => ({isFile: false, isDirectory: false}))
  if (stat.isFile) {
    const content = await Deno.readTextFile(pathname.substring(1)).catch(e => 'fail to load file: ' + e.toString())
    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      }
    })
  } else if (stat.isDirectory) {
    const entries = []
    for await (const dirEntry of Deno.readDir(filepath)) {
      entries.push(dirEntry);
    }
    return new Response(`
<div>
<h2>${filepath}</h2>
<ul class="line-height:2; font-size:1.5rem">
<li><a href="_/">..</a></li>
${entries.map(e => {
      const link = e.name + (e.isDirectory ? '/' : '')
      return `<li><a href="${link}">${link}</a></li>`;
    }).join('\n')}
</ul>
</div>`, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      }
    })
  } else {
    return new Response('not found', {status: 404})
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request))
});
