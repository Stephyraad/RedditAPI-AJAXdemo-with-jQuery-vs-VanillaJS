(function(window, document) {
	var domainForm = document.getElementById('domainform');
	
	function createXMLHttp() {

		if(typeof XMLHttpRequest !== undefined) {
			return new XMLHttpRequest;
		} else if(window.ActiveXObject) {
			// for older browsers, IE6 and older
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

	domainForm.addEventListener('submit', function(e) {
		e.preventDefault();
		var input = document.getElementById('user-input').value;
		var url = 'https://www.reddit.com/domain/' + input + '.json';

		var xhr = createXMLHttp();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4 && xhr.status == 200) {
      	var data = JSON.parse(xhr.responseText)
      	console.log(data.data)
      	appendToDom(data.children)
    	}
  	};

  	document.getElementById("content-returned").innerHTML = "Fetching Reddit data for " + input;
		xhr.send(null);

		function appendToDom(el) {
    	var html = '<ul class="linklist">\n';
    	if(el.length) {
    		el.forEach(function(item) {
    			var obj = item.data;
    			var subrdt    = "/r/"+obj.subreddit;
    			var redditurl = "http://www.reddit.com"+obj.permalink;
    			var subrdturl = "http://www.reddit.com/r/"+obj.subreddit+"/";

    			html += '<li class="clearfix">\n';
    			html += '<img src="'+obj.thumbnail+'" class="thumbimg">\n';
    			html += '<div class="linkdetails"><h2>'+obj.title+'</h2>\n';

    			html += '<p class="subrdt">posted to <a href="'+subrdturl+'" target="_blank">'+subrdt+'</a></p>';
    			html += '<p><a href="'+obj.url+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
    			html += '</div></li>\n';

    		});
  			html += '</ul>'
  			$('#content-returned').html(html);
    	}
    }
	});
})(window, document);

