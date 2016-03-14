/**
 * 代码目的：
 * 1、验证思路
 * 2、不要重复造轮子
 * 3、人生苦短，我用NodeJS
 *  fetch('http://nodejs.org:9999/dist/latest-v4.x/docs/api/documentation.json')
 */
'use strict';
var zlib = require('zlib');
const net = require('net');
const fs = require('fs');
const server = net.createServer((connection) => { //
    var _connection=connection;
    var stage=0;
    var remote = null;
    var domain = null;
// 'connection' listener
    connection.on('data', (data)=> {
        if(stage==0){
            var buf = new Buffer(2);
            buf.writeUInt8(0x05,0);
            buf.writeUInt8(0x00,1);
            connection.write(buf);
            ++stage;
            //connection.pipe(connection);
        }else if(stage==1){

            if(data[3]!=3) {
                console.error("不是域名请求");
            }
            console.log("待访问的域名的长度为"+data[4]);
            let count=0;
            let domainDexAr = [];
            while (count<data[4]) {
                domainDexAr.push(data[count+5]);
                ++count;
            }
            domain = getDomainFromDexAr(domainDexAr);
            console.log("获取的域名为="+domain+",下一步，将此域名转换为16进制格式");
            let bflength = 1+1+1+1+1+data[4]+2;
            //构造服务器回应客户端的请求。
            var buff=new Buffer(bflength);

            //socks版本
            buff.writeUInt8(0x05,0);

            //REP应答字段，0x00表示成功
            buff.writeUInt8(0x00,1);

            //RSV 0x00，保留
            buff.writeUInt8(0x00,2);

            //ATYPE 0x03域名，DST ADDR部分第一个字节为域名长度，DST ADDR剩余的内容为域名，没有\0结尾。
            buff.writeUInt8(0x03,3);

            //DST ADDR部分第一个字节为域名长度
            buff.writeUInt8('0x'+getDexFromNum(domain.length), 4);

            let dexDomainAr = getDexFromDomain(domain);
            //DST ADDR剩余的内容为域名
            dexDomainAr.map((v,k)=>{
                buff.writeUInt8(v,k+5);
            })

            // BND PROT网络字节序表示的服务器绑定的端口  9999
            buff.writeUInt8(0x27,(1+1+1+1+1+data[4]-1));
            buff.writeUInt8(0x0f,(1+1+1+1+1+data[4]+1-1));
            connection.write(buff);
            ++stage;
        }else if(stage==2){
            ++stage;
             remote = net.connect(port, domain , function() {
                if (remote) {
                    remote.setNoDelay(true);
                }
                if (remote.write(data)) {
                    console.log('发送数据成功！！！！');
                }
            });
            var chunks = [];
            var kk=0;
            remote.on("data", function(data) {
                _connection.write(data);
                chunks.push(data);
                stage=0;
                ++kk;
                console.log("这是第"+kk+"次传输"+data.toString());
                return;
                let responseMessage = data.toString();
                // 报文：起始行
                let startLine = responseMessage.split('\r\n')[0];

                let startLineAndHeaderAr = responseMessage.split('\r\n\r\n')[0].split('\r\n');
                startLineAndHeaderAr.shift();
                // 报文:首部
                let header = startLineAndHeaderAr.join('\r\n').toString();
                // 报文:主体
                let body = data.toString().split('\r\n\r\n')[1];
                let res ={
                    startLine:startLine,
                    header:header,
                    body:body
                }
                let _res = getMsgFrom(res);
                var _resbody = _res.bodyContent;
                var dataAr = data.toJSON().data;
                var dataAr =dataAr.splitByArray([13,10]);
                let key=0;
                dataAr.map((v,k)=>{
                    if(v.length==0&&key==0){
                        key=(k+2);
                    }
                })
                var dataAr2buffer = new Buffer(dataAr[key]);
                zlib.gunzip(dataAr2buffer,(err,_data)=>{
                    console.log("解压结果"+data);

                    fs.readFile('replace.txt', (err, filedata) => {
                        if (err) throw err;
                        console.log(filedata);
                        var customString=filedata.toString();

                        var customBuffer=new Buffer(customString, 'utf-8');
                        zlib.gzip(customBuffer, function (_, result) {  // The callback will give you the
                            zlib.gunzip(result,(err , data)=>{
                                //console.log("解压结果"+data);
                            })


                            let string = result.length.toString(16)+"\r\n"+result.toString()+"\r\n0";

                            var headerAr = data.toString().split('\r\n\r\n')[0].split('\r\n');
                            //headerAr.pop();
                            var headerAr2string = headerAr.join('\r\n').toString();
                            let fakeData = headerAr2string+"\r\n\r\n"+string+"\r\n\r\n";
                            let finaldata=new Buffer(fakeData);

                            _connection.write(new Buffer(headerAr2string));
                            _connection.write('\r\n\r\n');
                            _connection.write(new Buffer(result.length.toString(16)));
                            _connection.write('\r\n');
                            _connection.write(result);
                            _connection.write('\r\n');
                            _connection.write(new Buffer('0'));
                            _connection.write('\r\n\r\n');
                        });


                    });

                })

            });
            remote.on("end", function() {
                stage=0;
            });
        }
    });

    connection.on("end", function () {
        console.log('client disconnected');
    });

});
server.listen(8124, () => { //'listening' listener
    console.log('server bound');
});

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
 *  对响应报文做出处理
 */
function getMsgFrom (res) {
    let _res = {};
    _res.version = res.startLine.split(' ')[0];
    _res.statusCode = res.startLine.split(' ')[1];
    _res.reasonPhrase = res.startLine.split(' ')[2];
    _res.header = getHeaderObj(res.header);
    _res.body = res.body;
    _res.bodyLengthHex = res.body.split('\r\n')[0];
    _res.bodyContent = res.body.split('\r\n')[1];
    _res.lastLine = res.body.split('\r\n')[2];
    return _res;
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


/**
 * 从请求首部获取端口号
 * @param data
 * @returns {number}
 */
function getPortFromReq (data) {
    let port = 80;
    console.log("输出请求");
    console.log(data.toString());
    let hostHeader = data.toString().split('\r\n')[1];
    if(hostHeader.indexOf('Host:')<0){
        console.error("请求头中Host的顺序不对");
    }else{
        if(hostHeader.split('Host:')[1].split(':')[1]){
            port =  hostHeader.split('Host:')[1].split(':')[1];
        };
    }

    return Number(port);
}

/**
 * 从16进制数据中获取域名
 */
function getDomainFromDexAr(dexAr){
    let domain='';
    dexAr.map((v)=>{
        domain+=String.fromCharCode(v);
    })
    if(!domain){
        console.error("解析域名失败");
    }
    return domain;
}

/**
 * decimal 2 hexadecimal
 */
function getDexFromNum(param) {
    let result = null;
    if (Array.isArray(param)) {
        result = [];
        param.map((v)=> {
            let n = Number(v);
            result.push(n.toString(16));
        })
    } else {
        let n = Number(param);
        result = n.toString(16);
    }
    return result;
}

/**
 * hexadecimal 2 decimal
 */
function getDecFromHex (param) {
   var result = null;
    if(Array.isArray(param)){
        result =[];
        param.map((v)=>{
            var _v=parseInt(v,16);
            result.push(_v);
        })
    }else {
        result=parseInt(param,16);
    }
    return result;
}

/**
 * hexadecimal 2 decimal 2 string
 */
function getStrFromDecFromHex (param) {
    var _result='';
    var result = null;
    if(Array.isArray(param)){
        result =[];
        param.map((v)=>{
            var _v=parseInt(v,16);
            result.push(_v);
        })
        result.map((v)=>{
            _result+=String.fromCharCode(v);
        })
    }else {
        result=parseInt(param,16);
        _result=String.fromCharCode(result);
    }

    return _result;
}

/**
 * 将url转化为16进制
 * @param url
 */
function getDexFromDomain(url){
    let dexAr = [];
    url.split('').map((v,k)=>{
        let unicode =  v.charCodeAt(0);
        dexAr.push('0x'+unicode.toString(16));
    })
    if(!dexAr.length){
        console.error("转化为url为16进制数组为空");
    }
    return dexAr;
}

function getStringFromAr(ar){
    var s='';
    ar.forEach((v)=>{
        s+=String.fromCharCode(v);
    })
    return s;
}

