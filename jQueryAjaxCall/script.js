(function(window, document, $) {
  $('#domainform').on('submit', function(event) {   
    event.preventDefault();
    var input = $('#user-input').val(), url ='http://www.reddit.com/domain/' + input +'.json';
 
    $.ajax({
    	type: 'GET',
    	url: url,
    	dataType: 'json',
    	success: function(data) {
    		// console.log(JSON.stringify(data.data.children));
    		appendToDom(data.data.children);
    	},
    	error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      }
    }); 

    $('#content-returned').text('Fetching data');

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

  }); // end of on submit event handler
})(window, document, jQuery);