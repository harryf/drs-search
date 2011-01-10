#!/usr/bin/env node
var fs = require('fs');
var http = require('http');


fs.readFile('drsitems.txt', 'utf-8', function (err, data) {
  if (err) throw err;
  
  console.log(data);
  
  var client = http.createClient(80, '127.0.0.1');
  var request = client.request('PUT', '/drs/shows',{'host': '127.0.0.1'});
  request.end(data);
  
  
});