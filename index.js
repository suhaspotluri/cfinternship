const url = "https://cfw-takehome.developers.workers.dev/api/variants";
const fetch = require('node-fetch');
const random= require('random');


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


new HTMLRewriter.on('title',new ElementHandler()).onDocument( new DocumentHandler())

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

class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    console.log(`Incoming element: ${element.tagName}`)
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}



async function handleRequest(req) {
  const res = await fetch(req)

  return new HTMLRewriter().on('div', new ElementHandler()).transform(res)
}

class DocumentHandler {
  doctype(doctype) {
    // An incoming doctype, such as <!DOCTYPE html>
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}
	