/**
 * Created by google on 1/12/16.
 */
//构造服务器回应客户端的请求。
var buff=new Buffer(16);

buff.writeUInt8(0x05,0);//socks版本

buff.writeUInt8(0x00,1);  //REP应答字段，0x00表示成功

buff.writeUInt8(0x00,2);  //RSV 0x00，保留

buff.writeUInt8(0x03,3);  //ATYPE 0x03域名

var domain='127.0.0.1';
var ar=getAr(domain);
var domainLength='0x0'+domain.length;
buff.writeUInt8(domainLength,4);  //DST ADDR部分第一个字节为域名长度
//DST ADDR剩余的内容为域名，没有\0结尾。
ar.map((v,k)=>{
    buff.writeUInt8(v,5+k);
})
//下面对下标为14进行写入数据
var port=9999;
var port2binary=pad(port.toString(2),16);
var port2binary_1=parseInt(port2binary.substr(0,8));
var port2binary_2=port2binary.substr(8,8);
var _t1='0x'+decimal2hex(binary2decimal(port2binary_1));
buff.writeUInt8(_t1,14);
var _t2='0x0'+decimal2hex(binary2decimal(port2binary_2));
buff.writeUInt8(_t2,15);






module.exports=buff;




console.log(buff);


/**
 * 获取用于拼接的服务器绑定的地址
 * @param ar
 * @returns {Array}
 */
function getAr(ar){
    var a=[];
    ar.split('').map((v)=>{
        var t =v.charCodeAt(0);
        a.push('0x'+t.toString(16));
    });
    return a;
}

/**
 * 类似toFix()，前置补0
 * @param num
 * @param size
 *  javascript front zero - Google Search
 *  http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
 */
function pad(num,size){
    var num=num+'';
    while (num.length<size){
        num=('0'+num);
    }
    return num;
}


/**
 * 二进制 转十进制
 * javascript binary to dec - Google Search
 * http://stackoverflow.com/questions/10258828/how-to-convert-binary-string-to-decimal
 */
function binary2decimal(bin){
    return parseInt(bin,2);
}

/**
 * 十进制转16进制
 */
function decimal2hex(decimal){
    var decimal=Number(decimal);
    return decimal.toString(16);
}
