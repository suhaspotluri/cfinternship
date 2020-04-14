const url = "https://cfw-takehome.developers.workers.dev/api/variants";
const fetch = require('node-fetch');
const random= require('random');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
	let response = await fetch(url);
	let json = await response.json();
	console.log(json['variants']);
	let rand = random.int(min=0,max=1);
	let siteresponse = await fetch(json['variants'][rand]);
	let siteRes= await siteresponse.text();
	
  return new Response(siteRes, {
    headers: { 'content-type': 'text/html' },
  })
}
