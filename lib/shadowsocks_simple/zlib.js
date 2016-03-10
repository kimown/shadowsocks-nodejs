/**
 * Created by google on 3/5/16.
 */
var zlib = require('zlib');

var text = "Hello World!";
var buf = new Buffer(text, 'utf-8');   // Choose encoding for the string.
zlib.gzip(buf, function (_, result) {  // The callback will give you the
    zlib.gunzip(result,(err , data)=>{
        console.log("解压结果"+data);
    })
});

return;

var a=[

    72,84,84,80,47,49,46,49,32,50,48,48,32,79,75,13,10,
    67,111,110,116,101,110,116,45,84,121,112,101,58,32,116,101,120,116,47,112,108,97,105,110,13,10,

    67,111,110,116,101,110,116,45,69,110,99,111,100,105,110,103,58,32,103,122,105,112,13,10,

    68,97,116,101,58,32,83,117,110,44,32,48,54,32,77,97,114,32,50,48,49,54,32,48,53,58,50,52,58,49,54,32,71,77,84,13,10,

    67,111,110,110,101,99,116,105,111,110,58,32,107,101,101,112,45,97,108,105,118,101,13,10,
    84,114,97,110,115,102,101,114,45,69,110,99,111,100,105,110,103,58,32,99,104,117,110,107,101,100,

    13,10,13,10,

    50,48,13,10,
    31,139,8,0,0,0,0,0,0,3,243,72,205,201,201,87,8,207,47,202,73,81,4,0,163,28,41,28,12,0,0,0,13,10,
    48,
    13,10,13,10
];
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

a.splitByArray([13,10]);


