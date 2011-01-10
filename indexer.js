#!/usr/bin/env node
var fs = require('fs'),
    http = require('http');

fs.readFile('drsitems.txt', 'utf-8', function (err, data) {
  if (err) throw err;

  var client = http.createClient(9200, '127.0.0.1');
  data.split("\n").forEach(function(line) {
      
      
      try {
          var record = JSON.parse(line);

          var request = client.request('PUT', '/drs/shows/' + record['id'], {'host': '127.0.0.1'});
          request.end(line);
        } catch ( e) {}

  });
  
  
});