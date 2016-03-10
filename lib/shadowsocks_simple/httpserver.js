/**
 * Created by google on 2/27/16.
 */

const http = require('http');
var zlib = require('zlib');

const hostname = '127.0.0.1';
const port = 1337;


/**
 *
 * 本地模拟gzip :
 * http://stackoverflow.com/questions/14778239/nodejs-send-data-in-gzip-using-zlib
 * http://stackoverflow.com/questions/3894794/node-js-gzip-compression
 *
 */

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' ,'Content-Encoding': 'gzip'});
    var text = "Hello World!";
    var text = "0123456789";
    var buf = new Buffer(text, 'utf-8');   // Choose encoding for the string.
    zlib.gzip(buf, function (_, result) {  // The callback will give you the
        zlib.gunzip(result,(err , data)=>{
            console.log("解压结果"+data);
        })
        res.end(result);                     // result, so just send it.
    });
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

