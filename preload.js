console.log("Hello from preload.js");

const { contextBridge, ipcRenderer } = require('electron');

function launch(data) {
	
  ipcRenderer.send('launch', data);
  
}

contextBridge.exposeInMainWorld('electronAPI', { launch });
