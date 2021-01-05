const fetch = require("node-fetch");

let urll = 'http://api.wolframalpha.com/v1/result?appid=VJPGQ5-WJ99WU3QR3&i=';

const thing = "what is a potato";

const encodedThing = encodeURIComponent(thing);

const urlll = urll + encodedThing;

console.log(urlll)

fetch(urlll, {method: 'GET'}).then(function (response) {
	// The API call was successful!
	return response.text()
}).then(function (data) { 
    console.log(data)
}).catch(function (err) { 
    console.warn("There was an error", err)
});

//VJPGQ5-WJ99WU3QR3