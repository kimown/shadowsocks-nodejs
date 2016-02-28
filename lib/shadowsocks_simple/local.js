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
const server = net.createServer((connection) => { //
    var _connection=connection;
    var stage=0;
    var remote =null;
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
            let domain = getDomainFromDexAr(domainDexAr);
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
            buff.writeUInt8(0x27,(1+1+1+1+data[4]));
            buff.writeUInt8(0x0f,((1+1+1+1+data[4]+1)));
            connection.write(buff);
            ++stage;
        }else if(stage==2){
            ++stage;
            console.log("输出请求");
            console.log(data.toString());
             remote = net.connect(80, 'nodejs.org', function() {
                if (remote) {
                    remote.setNoDelay(true);
                }
                if (remote.write(data)) {
                    console.log('发送数据成功！！！！');
                }
            });
            var chunks = [];
            remote.on("data", function(data) {
                var bakres = data.toString().split('\r\n\r\n')[1];
                var buffer = new Buffer(bakres, "binary");
                zlib.gunzip(buffer, function(err, dezipped) {
                    if (err) {
                        console.log('解压出现错误',err);
                    }else {
                        console.log('解析的结果是');
                        console.log(dezipped.toString('utf-8'));
                    }
                    //var json_string = dezipped.toString('utf-8');
                    //var json = JSON.parse(json_string);
                    // Process the json..
                });
                _connection.write(data);
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
function getDexFromNum (n){
    n = Number(n);
    return n.toString(16);
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

