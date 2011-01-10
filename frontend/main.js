(function ($) {
    var populateResults;

    populateResults = function (data) {
        var res = $('#results');
        var ul = $('<ul/>'); 
         
        $.each(data, function(k, v) {
            var t = '<li><h2>'+v.title+'</h2>'
                  + '<div>'+v.text+'</div>' 
                  + '<div>'+v.program+' &#187; '+v.container+'</div>'
                  + '</li>'; 
            console.log(t);
            ul.append($(t));
        });
        res.html(ul);
    };

    $('#search').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/search',
            success: populateResults,
            
            data: {query: $(this.query).val()},
            dataType: 'json'
        });
    });
}(jQuery));
