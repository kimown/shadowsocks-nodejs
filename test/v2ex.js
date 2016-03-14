/**
 * v2ex的自动签到脚本
 * Created by google on 3/13/16.
 *
 */

'use strict';
const net = require('net');
var zlib = require('zlib');
var cheerio = require('cheerio')
let port=80;
let domain="v2ex.com";
let chunks = [];
let chunksCount=0;
let COOKIE=null;
var remote = net.connect(port, domain, function () {
    var headerAr=[];
    headerAr.push("GET http://v2ex.com/signin HTTP/1.1");
    headerAr.push("Host: v2ex.com");
    headerAr.push("Connection: keep-alive");
    headerAr.push("Cache-Control: max-age=0, must-revalidate");
    headerAr.push("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    headerAr.push("Upgrade-Insecure-Requests: 1");
    headerAr.push("User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36");
    headerAr.push("Accept-Encoding: gzip, deflate, sdch");
    headerAr.push("Accept-Language: zh-CN,zh;q=0.8");
    headerAr.push("If-None-Match: W/\"76d2e5e8617a1f91d10ea8129601bcf12efc284e\"");
    headerAr.push("\r\n");
    var buffer =new Buffer(headerAr.join('\r\n'));
    if (remote.write(buffer)) {
        console.log('发送请求成功！！！！');
    }
});
remote.on("data", function(data) {
    chunks = chunks.concat(data.toJSON().data);
    //判断data是否达到结束符
    if(checkChunksIsEnd(chunks)){
        console.log("第"+(++chunksCount)+"次，已经获取全部响应数据，下一步，开始解析DOM获取登陆id标志");
        getHtml(chunks).then((html)=>{
            return getOnceFromHtml(html);
        }).then((once)=>{
            return fakeLoginReq(once);
        });
    }else{
        console.log("第"+(++chunksCount)+"次，第"+(chunksCount+1)+"次数据包正在网络传输中...");
    }

});
remote.on("end", function() {
    console.log("服务器关闭连接");
});

/**
 * 获取html
 */
function getHtml (chunks){
    return new Promise((resolve,reject)=>{
        var crlf = [13,10];
        var gzipHtml=chunks.splitByArray(crlf.concat(crlf))[1].splitByArray(crlf);
        var data=new Buffer(gzipHtml[1]);
        var firstLineAndHeaders = chunks.splitByArray(crlf.concat(crlf))[0];
        var firstLineAndHeadersStr="";
        firstLineAndHeaders.map((v,k)=>{
            firstLineAndHeadersStr+=String.fromCharCode(v);
        })
        var header = getHeaderObj(firstLineAndHeadersStr);
        console.log(firstLineAndHeadersStr);

        zlib.gunzip(data, function(err, result) {
            if(err){
                console.error("解压gzip失败"+err);
                resolve(null);
            }
            resolve(result.toString());
        });
    })
}

function getHeaderObj (headerstr) {
    let obj ={};
    headerstr.split('\r\n').map((v)=>{
        let line = v;
        let split = line.indexOf(':');
        let name = line.substring(0,split);
        let value = line.substring(split+2);
        obj[name] = value;
    })
    return obj;
}

function getOnceFromHtml (html){
    return new Promise((resolve,reject)=>{
        var $ = cheerio.load(html);
        var once = $('input[name=once]').attr('value');
        resolve(once);
    })
}


/**
 * 构造虚拟登陆请求
 */
function fakeLoginReq(once){
    return new Promise((resolve,reject)=>{
        var headerAr=[];
        headerAr.push("POST http://v2ex.com/signin HTTP/1.1");
        headerAr.push("Host: v2ex.com");
        headerAr.push("Content-Length: 26");
        headerAr.push("Cache-Control: max-age=0");
        headerAr.push("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
        headerAr.push("Origin: http://v2ex.com");
        headerAr.push("Upgrade-Insecure-Requests: 1");
        headerAr.push("User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36");
        headerAr.push("Content-Type: application/x-www-form-urlencoded");
        headerAr.push("Referer: http://v2ex.com/signin");
        headerAr.push("Accept-Encoding: gzip, deflate");
        headerAr.push("Accept-Language: zh-CN,zh;q=0.8,en;q=0.6");
        headerAr.push("Content-Type: application/x-www-form-urlencoded");
        headerAr.push("Content-Type: application/x-www-form-urlencoded");
        headerAr.push("Content-Type: application/x-www-form-urlencoded");
        headerAr.push("Content-Type: application/x-www-form-urlencoded");
        headerAr.push("Content-Type: application/x-www-form-urlencoded");

    })
}

/**
 * 判断响应是否全部接受
 * 参考《HTTP权威指南》15.6.3 分块编码
 * @param chunks
 */
function checkChunksIsEnd(chunks) {
    let ar = [13, 10, 48, 13, 10, 13, 10];
    let flag = true;
    if (chunks.indexOfByArray(ar) >= 0) {
        flag = true;
    } else {
        flag = false;
    }
    return flag;
}

/**
 * 查找指定array的位置，对比String.prototype.indexOf方法
 *  http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.7
 * @param ar
 */
Array.prototype.indexOfByArray = function (searchArray, position){
    let _k=-1;
    let S=this;
    let searchAr =searchArray;
    let pos = position?position:0;
    let len = S.length;
    let start = Math.min(Math.min(pos,0),len);
    let searchLen = searchAr.length;
    S.every((v,k)=>{
        let flag=true;
        searchArray.every((val,key)=>{
            let j=key;
            if(S[k+j]!=searchArray[j]){
                flag=false;
            }
            return flag;
        })
        if(flag&&(k+searchLen)<=len&&(k>=start)){
            if(_k==-1){
                _k=k ;
            }
        }
        return !flag;
    })
    return _k;
};

/**
 * 对数组进行分割
 */
Array.prototype.splitByArray = function (param){
    var _this=this;
    var result=[];
    var q=0;
    var p=0;
    _this.map((v,k)=>{
        if(v==param[0]){
            var flag=true;
            param.map((val,key)=>{
                if(_this[k+key]!=val){
                    flag=false;
                }
            })
            if(flag){
                p=k;
                result.push(_this.slice(q,p));
                q=p+param.length;
            }
        }
    })
    return result;
}


/**
 *  npm install cheerio --registry=https://registry.npm.taobao.org
 *
 *
 *
 */
