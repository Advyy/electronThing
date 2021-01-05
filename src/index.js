const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fetch = require("node-fetch");

if (require('electron-squirrel-startup')) { 
  app.quit();
}


const createWindow = () => {
    // create the fucking window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { 
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'web/index.html'));

    mainWindow.webContents.openDevTools();

    // wolfram shit and sending to other js file
    ipcMain.on('newInp', (event, args) => { 


        let urll = 'http://api.wolframalpha.com/v1/result?appid=VJPGQ5-WJ99WU3QR3&i=';

        let thing = `${args}`;

        const encodedThing = encodeURIComponent(thing);

        const urlll = urll + encodedThing;

        console.log(urlll)

        fetch(urlll, {method: 'GET'}).then(function (response) {
	    // The API call was successful!
	        return response.text()
        }).then(function (data) { 
            mainWindow.webContents.send('apiR', data)
            console.log(data)
        }).catch(function (err) { 
            console.warn("There was an error", err)
        });
    });
};

// create window went the app is ready ig lmao
app.on('ready', createWindow);


// closing window shit
app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// no idea
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    };
});

