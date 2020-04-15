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
  .on('a', new AttributeRewriter("href"))
  .on('title', new InnerRewriter("Suhas Potluri",false))
  .on('h1#title', new InnerRewriter("This is Site ",true))
  .on('p#description', new InnerRewriter("Cloudflare Fullstack Internship Coding Challenge",false))
	

class InnerRewriter {
	constructor(adText,prep) {
    this.adText = adText;
	this.prep = prep;
  }
  element(element) {
	  if(this.prepend){
		  element.prep(this.adText);
	  }
	  else{
		  element.setInnerContent(this.adText);
	  }
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







	