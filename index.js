
const url = "https://cfw-takehome.developers.workers.dev/api/variants";
const fetch = require('node-fetch');
const random= require('random');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

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

class InnerRewriter {
	constructor(adText,prep) {
    this.adText = adText;
	this.prep = prep;
  }
  element(element) {
	  if(this.prep){
		  element.prepend(this.adText);
	  }
	  else{
		  element.setInnerContent(this.adText);
	  }
    }
  }
  
var title = new InnerRewriter("Suhas Potluri",false);
var h1 =new InnerRewriter("This is Site ",true);
var p= new InnerRewriter("Cloudflare Fullstack Internship Coding Challenge",false);
var a= new AttributeRewriter('href');
const rewriter = new HTMLRewriter().on('title', title).on('p#description',p).on('h1#title',h1).on('a',a);
  
  
  async function handleRequest(request) {
	let response = await fetch(url);
	let json = await response.json();
	let rand = random.int(min=0,max=1);
	let siteresponse = await fetch(json['variants'][rand]);
	let siteRes= await siteresponse;
	let transRes= await rewriter.transform(siteRes).text()
	
	return new Response(transRes, {headers: { 'content-type': 'text/html' },})
}





	