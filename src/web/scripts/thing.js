
// see's wen you press enter on the input field then executes the getInputVal function
var intThing = document.getElementById("inputId")
intThing.addEventListener("keydown", function(e) { 
    if (e.keyCode === 13) { 
        getInputVal();
    }
});

const electron = require('electron')
const ipcRenderer = electron.ipcRenderer; 

// gets the input contents and sends it to index.js so that the wolfram api and process the shit 
function getInputVal() { 
    let inputVal = document.getElementById("inputId").value;
    // Displaying the value
    ipcRenderer.send('newInp', inputVal)
}

// gets the api response and puts it onto the page
ipcRenderer.on('apiR', (event, data) => { 
    document.getElementById('response').innerHTML = data;
    console.log(data)
});
