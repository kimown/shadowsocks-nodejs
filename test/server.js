/**
 * Created by google on 2/4/16.
 */


var http = require('http');

var server = http.createServer(function (req, res) {
    // req is an http.IncomingMessage, which is 可读流（Readable stream）
    // res is an http.ServerResponse, which is a Writable Stream

    var body = '';
    // we want to get the data as utf8 strings
    // If you don't set an encoding, then you'll get Buffer objects
    req.setEncoding('utf8');

    // 可读流（Readable stream） emit 'data' 事件 once a 监听器（listener） is added
    req.on('data', function (chunk) {
        body += chunk;
    });

    // the end 事件 tells you that you have entire body
    req.on('end', function () {
        try {
            var data = JSON.parse(body);
        } catch (er) {
            // uh oh!  bad json!
            res.statusCode = 400;
            return res.end('error: ' + er.message);
        }

        // write back something interesting to the user:
        res.write(typeof data);
        res.end("-----------------------");
    });
});

server.listen(1337);