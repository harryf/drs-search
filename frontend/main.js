(function ($) {
    var populateResults;

    populateResults = function (data) {
        console.log(data);
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
