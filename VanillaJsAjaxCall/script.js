(function(window, document) {

	var button = document.getElementById('domainform');
	button.addEventListener('submit', getData);

	function createXMLHttp() {
		// if XMLHttpRequest is available create a new instance of the required class to make an HTTP request to the server
		if(typeof XMLHttpRequest !== undefined) {
			return new XMLHttpRequest;
		} else if(window.ActiveXObject) {
			// ActiveXObject is used for older browsers, IE6 and older
			 var ieXMLHttpVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'],
        xmlHttp;
    	//In this array we are starting from the first element (newest version) and trying to create it. If there is an
    	for (var i = 0; i < ieXMLHttpVersions.length; i++) {
	      try {
	        xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
	        return xmlHttp;
	      } catch (e) {
	      	console.log("error");
	      }
    	}
		}
	} //end of createXMLHTTP function

	// function to send the request and handle the response
	function getData() {

		var input = document.getElementById('user-input').value; 
		var url ='http://www.reddit.com/domain/' + input +'.json';

		//get the xmlhttp object
		var xmlHttp = createXMLHttp(success, error);
		//start a request with method 'get'
		xmlHttp.open('get', url, true);
		xmlHttp.send(null);
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState === 4 && xmlHttp.readyState === 200) {
				console.log("Response text: ", xmlHttp.responseText);
			} else {
				 console.log(xhr.status);
			}
		}

	}

})(window, document);