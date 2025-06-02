console.log("Hello from index.js"); // you won't see this message in your console

const { app, Menu, shell, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('electron-reloader')(module);
const ini = require('ini'); 

const iniData = fs.readFileSync('config.ini', 'utf-8');
const config = ini.parse(iniData);




const homedir = path.join(__dirname, path.sep); // more cross-platform

console.log("----------------------");
console.log("APP VARS:\n");
console.log(process.arch);
console.log(process.platform);
console.log(process.env.os);
console.log(process.type);
console.log("PID: " + process.pid);
console.log("Host: " + process.env.computername);
console.log("User: " + process.env.username);
console.log("Home Dir: " + process.env.homepath);

console.log("Chrome: " + process.versions.chrome);
console.log("Electron: " + process.versions.electron);

console.log("App Name: " + app.getName());
console.log("App Directory: " + __dirname);
console.log("This filename: " + __filename);
console.log("Text editor: " + config[process.platform].cmdeditor);

console.log("----------------------");






function launch(filename) {
	const extension = filename.split(".").pop();
	

	console.log("Extension:" + extension); 
		// where are we going to do our extension mapping?
		// we'll need one for each of 3 platforms
		// or how do we list system defaults?
		// honestly for now just the system default editor / notepad is best


	if (["http"].includes(filename.substr(0, 4))) {
		
		shell.openExternal(filename);
		
	} else if (["html", "json", "js", "css"].includes(extension)) {

		
		const cmd = config[process.platform].cmdeditor + " " + homedir + filename;
		exec(cmd);
		
		// spawn('C:\\Program Files\\Notepad++\\notepad++.exe', [homedir + filename]);
		//spawn('start notepad', [homedir + filename]);
		//exec('start notepad', [homedir + filename]);
	
	} else {
		// else try the system default for this extension ...
		
		const dafile = homedir + filename;
		shell.openExternal(dafile);
		//shell.showItemInFolder(dafile);
		// shell.openPath(dafile);

	}
}

// can't i make launch and handleLaunch just one function?

function handleLaunch(event, arg) {
	console.log("Launch: " + arg);
	launch(arg);
}



function createWindow() {

	const mainWindow = new BrowserWindow({
		
		width: 750,
		height: 650,
		//x:0,
		//y:0,
		//autoHideMenuBar: true,
		//resizable: false,
		//frame: false,     
		transparent: false,
		roundedCorners:false,
		thickFrame:false,
		//alwaysOnTop: true,
		icon: path.join(__dirname, 'icons/favicon3.png'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});
	const menuPath = path.join(__dirname, 'menu.json');
	const menuData = JSON.parse(fs.readFileSync(menuPath));

	const menu = Menu.buildFromTemplate(menuData);
	Menu.setApplicationMenu(menu);
	//mainWindow.setMenu(null);
	mainWindow.loadFile('index.html');
	// mainWindow.webContents.openDevTools();
}


ipcMain.on('launch', handleLaunch);
app.on('ready', createWindow);