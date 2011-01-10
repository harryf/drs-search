var http = require('http');
var url = require('url');
var fs = require('fs');

var files = {
  '/': {
    mime: 'text/html; charset=utf-8',
    content: fs.readFileSync('frontend/index.html')
  },
  '/main.js': {
    mime: 'text/javascript',
    content: fs.readFileSync('frontend/main.js')
  }
};


var serve, search;

serve = function (req, resp) {
  resp.writeHead(200, {'Content-Type': files[req.url].mime});
  resp.end(files[req.url].content);
}

var searchClient = http.createClient(9200, '127.0.0.1');
search = function (req, resp) {
  var term = url.parse(req.url, true).query.query;

  request = searchClient.request('GET', '/drs/shows/_search/?q='+encodeURIComponent(term));
  request.end();
  request.on('response', function (response) {
    var body = "";
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      var data = [];
      JSON.parse(body).hits.hits.forEach(function(hit) {
        data.push(hit._source);
      })
      resp.writeHead(200, {'Content-Type': 'application/json'});
      resp.end(JSON.stringify(data));
    });
  });
}

http.createServer(function (request, response) {
  if (typeof files[request.url] !== 'undefined') {
    serve(request, response);
  } else if (request.url.substr(0, 7) === '/search') {
    search(request, response);
  } else {
    response.writeHead(400, 'Bad Request');
    response.end();
  }
}).listen(9201);

console.log('Server running at http://127.0.0.1:9201/');