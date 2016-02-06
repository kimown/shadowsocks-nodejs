/**
 * 代码目的：
 * 1、验证思路
 * 2、不要重复造轮子
 * 3、人生苦短，我用NodeJS
 *
 */

const net = require('net');
const server = net.createServer((connection) => { //'connection' listener
    connection.on('data', (data)=> {
        console.log(data.toString());

        //
        var buf = new Buffer(2);
        buf.writeUInt8(0x05,0);
        buf.writeUInt8(0x00,1);
        connection.write(buf);
        connection.pipe(connection);
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
