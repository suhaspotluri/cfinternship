const url = "https://cfw-takehome.developers.workers.dev/api/variants";
const fetch = require('node-fetch');
const random= require('random');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})




async function handleRequest(request) {
	let response = await fetch(url);
	let json = await response.json();
	let rand = random.int(min=0,max=1);
	let siteresponse = await fetch(json['variants'][rand]);
	let siteRes= await siteresponse;
	let transRes= await rewriter.transform(siteRes).text()
	
	return new Response(transRes, {headers: { 'content-type': 'text/html' },})
}


const rewriter = new HTMLRewriter()
  .on('a', new AttributeRewriter('href'))
  .on('title', new TitleRewriter())
  .on('h1#title', new H1Rewriter())
  .on('p#description', new PRewriter())
	

class TitleRewriter {
  element(element) {
	  element.setInnerContent("Suhas Potluri");
    }
  }

class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
 
  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace('https://cloudflare.com', 'https://suhasthebest.pythonanywhere.com/hangman')
      )
	  element.setInnerContent("Visit My Latest Project");
	  
    }
  }
}

class H1Rewriter {
 
  element(element) {
	  element.prepend("This is Site ");
  }
}

class PRewriter {
  element(element) {
	  element.setInnerContent("e");
  }
}






	