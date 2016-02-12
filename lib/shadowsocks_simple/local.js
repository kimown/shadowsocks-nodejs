/**
 * 代码目的：
 * 1、验证思路
 * 2、不要重复造轮子
 * 3、人生苦短，我用NodeJS
 *
 */

const net = require('net');
const server = net.createServer((connection) => { //
    var stage=0;
// 'connection' listener
    connection.on('data', (data)=> {
        if(stage==0){
            var buf = new Buffer(2);
            buf.writeUInt8(0x05,0);
            buf.writeUInt8(0x00,1);
            connection.write(buf);
            ++stage;
            connection.pipe(connection);
        }else if(stage==1){

            //构造服务器回应客户端的请求。
            var buff=new Buffer(16);
            //socks版本
            buff.writeUInt8(0x05,0);
            //REP应答字段，0x00表示成功
            buff.writeUInt8(0x00,1);
            //RSV 0x00，保留
            buff.writeUInt8(0x00,2);
            //ATYPE 0x03域名，DST ADDR部分第一个字节为域名长度，DST ADDR剩余的内容为域名，没有\0结尾。
            buff.writeUInt8(0x03,3);
            //BND ADDR服务器绑定的地址 127.0.0.1
            //我先用16进制表示，这个值然并卵。 [49, 50, 55, 46, 48, 46, 49, 46, 49]
            buff.writeUInt8(0x09,4);   //DST ADDR部分第一个字节为域名长度

            buff.writeUInt8(0x31,5);   // DST ADDR剩余的内容为域名
            buff.writeUInt8(0x32,6);
            buff.writeUInt8(0x37,7);
            buff.writeUInt8(0x2e,8);
            buff.writeUInt8(0x30,9);

            buff.writeUInt8(0x2e,10);
            buff.writeUInt8(0x30,11);
            buff.writeUInt8(0x2e,12);
            buff.writeUInt8(0x31,13);
            // BND PROT网络字节序表示的服务器绑定的端口  9999
            buff.writeUInt8(0x27,14);
            buff.writeUInt8(0x0f,15);
            connection.write(buff);
            ++stage;
            connection.pipe(connection);
        }else if(stage==2){
            console.log("输出请求");
            console.log(data.toString());
        }





    });

    connection.on("end", function () {
        console.log('client disconnected');
    });

});
server.listen(8124, () => { //'listening' listener
    console.log('server bound');
});


function getStringFromAr(ar){
    var s='';
    ar.forEach((v)=>{
        s+=String.fromCharCode(v);
    })
    return s;
}
