//setting api url and required modules
const url = "https://cfw-takehome.developers.workers.dev/api/variants";
const fetch = require('node-fetch');
const random= require('random');

//event listener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

//class to replace anchor link with my own
class AttributeRewriter {
  constructor(attributeName) {
	  //which attribute of a tag to alter
    this.attributeName = attributeName
  }
 
  element(element) {
	  //getting element with href attribute
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
		//replacing href with new url
        attribute.replace('https://cloudflare.com', 'https://suhasthebest.pythonanywhere.com/hangman')
      )
	  //changing link text
	  element.setInnerContent("Visit My Latest Project");
	  
    }
  }
}

//class to replace text of different elements
class InnerRewriter {
	constructor(adText,prep) {
	//text to replace
    this.adText = adText;
	//should text be prepended or replaced 
	this.prep = prep;
  }
  element(element) {
	  if(this.prep){
		  //prepend text
		  element.prepend(this.adText);
	  }
		// replace text
	  else{
		  element.setInnerContent(this.adText);
	  }
    }
  }

  //async function
  async function handleRequest(request) {
	//getting cookie from headers
	cook=request.headers.get('Cookie')
	 //getting api url response
	let response = await fetch(url);
		//parsing in json
	let json = await response.json();
	//generating random int 0-1
	let rand = random.int(min=0,max=1);
	 //creating rewriter objects of above classes to satisfy requirements
	var title = new InnerRewriter("Suhas Potluri",false);
	var h1 =new InnerRewriter("This is Site ",true);
	var p= new InnerRewriter("Cloudflare Fullstack Internship Coding Challenge. No Cookie",false);
	var a= new AttributeRewriter('href');
	
	//Check for cookie
	if(cook){
	if(cook.includes('version=0')){rand=0; console.log('0'+cook);
	p= new InnerRewriter("Cloudflare Fullstack Internship Coding Challenge. Cookie is set to variant 1",false);
	}
	else if(cook.includes('version=1')){rand=1; console.log('0'+cook);
	p= new InnerRewriter("Cloudflare Fullstack Internship Coding Challenge. Cookie is set to variant 2",false);
	}
	}
	//loading response from site using fetch
	let siteresponse = await fetch(json['variants'][rand]);
	let siteRes= await siteresponse;
	const rewriter = new HTMLRewriter().on('title', title).on('p#description',p).on('h1#title',h1).on('a',a);
	//calling HTMLRewriter
	let transRes= await rewriter.transform(siteRes).text()
	//returning the response for render
	return new Response(transRes, {headers: { 'content-type': 'text/html','set-cookie':'version='+rand.toString()},})
}





	