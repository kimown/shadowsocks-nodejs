/**
 * Created by google on 1/10/16.
 */


'use strict';
var http = require('http');

let n=0;
let url=[
    'http://www.baidu.com/',
    "http://www.syhjjc.com.cn/h2/index.aspx?mType=Group"
    ];

setInterval(()=>{
    n++;
    http.get(url[1], function(res) {
        console.log("Got response: " + res.statusCode+"benchmark n="+n);
        res.on('data', function(data) {
           // console.log("Got data: " + data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
},10)


