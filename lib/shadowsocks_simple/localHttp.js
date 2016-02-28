/**
 * Created by google on 2/27/16.
 */

const http = require('http');
var request = require('request');
var zlib = require('zlib');

var options = {
    url: 'http://nodejs.org/dist/latest-v4.x/docs/api/documentation.json',
    headers: {
        'X-some-headers'  : 'Some headers',
        'Accept-Encoding' : 'gzip, deflate',
    },
    encoding: null
};

request.get(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        // If response is gzip, unzip first
        var encoding = response.headers['content-encoding']
        if (encoding && encoding.indexOf('gzip') >= 0) {
            zlib.gunzip(body, function(err, dezipped) {
                var json_string = dezipped.toString('utf-8');
                var json = JSON.parse(json_string);
                // Process the json..
            });
        } else {
            // Response is not gzipped
        }
    }

});

////*************===============*******************//
//http.get('http://nodejs.org/dist/latest-v4.x/docs/api/documentation.json', (res) => {
//    console.log(`Got response: ${res.statusCode}`);
//    // consume response body
//    res.resume();
//}).on('error', (e) => {
//    console.log(`Got error: ${e.message}`);
//});