/**
 * Created by google on 3/12/16.
 */

// curl -k https://localhost:8000/
'use strict';
const https = require('https');
const fs = require('fs');

let path="/media/google/c551fb15-aea1-4b82-bbed-77c3b47c4dfa/tmp/";
const options = {
    key: fs.readFileSync(path+'key.pem'),
    cert: fs.readFileSync(path+'cert.pem')
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);