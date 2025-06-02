	console.log("Hello from index.html / main.js");

	if (window.electronAPI) {

		console.log("ElectronAPI ready.");

	} else {

		alert("ElectronAPI not available.");

	}
	
	function launch(thing) {
		console.log("HELLO!");
		if (window.electronAPI) {
		
			window.electronAPI.launch(thing);
			
		} else {
		
			alert("ElectronAPI not available.");
			
		}
		
	}
	
	
      window.electronAPI.getAppPath().then(path => {
        document.getElementById('app-path').textContent = path;
      });	