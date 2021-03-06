/**
 * Created by google on 2/27/16.
 */

const http = require('http');
var zlib = require('zlib');

const hostname = '127.0.0.1';
const port = 1337;


/**
 *
 * 本地模拟gzip :
 * http://stackoverflow.com/questions/14778239/nodejs-send-data-in-gzip-using-zlib
 * http://stackoverflow.com/questions/3894794/node-js-gzip-compression
 *
 */

http.createServer((req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/plain' ,'Content-Encoding': 'gzip'});
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var text = "Hello World!";
    //var text = "0123456789";
    var buf = new Buffer(text, 'utf-8');   // Choose encoding for the string.

    res.end(text);
    zlib.gzip(buf, function (_, result) {  // The callback will give you the
        zlib.gunzip(result,(err , data)=>{
            console.log("解压结果"+data);
        })
        //res.end(result);                     // result, so just send it.
    });
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



var a=[

    72,  84,  84,  80,  47,  49,  46,  49,  32,  50,  48,  48,  32,  79,  75,  13,  10,
    83,  101,  114,  118,  101,  114,  58,  32,  65,  108,  105,  121,  117,  110,  79,  83,  83,  13,  10,
    68,  97,  116,  101,  58,  32,  83,  97,  116,  44,  32,  49,  50,  32,  77,  97,  114,  32,  50,  48,  49,  54,  32,  48,  56,  58,  50,  56,  58,  49,  57,  32,  71,  77,  84,  13,  10,
    67,  111,  110,  116,  101,  110,  116,  45,  84,  121,  112,  101,  58,  32,  97,  112,  112,  108,  105,  99,  97,  116,  105,  111,  110,  47,  106,  97,  118,  97,  115,  99,  114,  105,  112,  116,  13,  10,
    84,  114,  97,  110,  115,  102,  101,  114,  45,  69,  110,  99,  111,  100,  105,  110,  103,  58,  32,  99,  104,  117,  110,  107,  101,  100,  13,  10,
    67,  111,  110,  110,  101,  99,  116,  105,  111,  110,  58,  32,  107,  101,  101,  112,  45,  97,  108,  105,  118,  101,  13,  10,
    86,  97,  114,  121,  58,  32,  65,  99,  99,  101,  112,  116,  45,  69,  110,  99,  111,  100,  105,  110,  103,  13,  10,
    120,  45,  111,  115,  115,  45,  114,  101,  113,  117,  101,  115,  116,  45,  105,  100,  58,  32,  53,  54,  69,  51,  68,  51,  50,  51,  49,  66,  65,  54,  48,  52,  53,  54,  50,  69,  52,  57,  66,  55,  65,  67,  13,  10,
    76,  97,  115,  116,  45,  77,  111,  100,  105,  102,  105,  101,  100,  58,  32,  83,  97,  116,  44,  32,  49,  50,  32,  68,  101,  99,  32,  50,  48,  49,  53,  32,  48,  55,  58,  53,  53,  58,  53,  53,  32,  71,  77,  84,  13,  10,
    120,  45,  111,  115,  115,  45,  111,  98,  106,  101,  99,  116,  45,  116,  121,  112,  101,  58,  32,  78,  111,  114,  109,  97,  108,  13,  10,
    67,  111,  110,  116,  101,  110,  116,  45,  69,  110,  99,  111,  100,  105,  110,  103,  58,  32,  103,  122,  105,  112, 13,  10,
    13,  10,
    54,  48,  48,  97,  13,  10,
    31,  139,  8,  0,  0,  0,  0,  0,  0,  3,  220,  189,  105,  119,  27,  199,  181,  46,  252,  253,  252,  10,  162,  163,  3,  119,  11,  69,  16,  144,  135,  123,  210,  80,  179,  151,  45,  217,  177,  29,  79,  137,  228,  216,  14,  8,  123,  245,  4,  160,  73,  76,  4,  64,  81,  52,  129,  252,  246,  187,  159,  93,  99,  15,  144,  156,  115,  238,  187,  222,  187,  174,  19,  17,  61,  84,  215,  184,  107,  79,  181,  135,  139,  167,  157,  179,  235,  191,  221,  21,  219,  135,  179,  55,  195,  254,  112,  216,  255,  240,  236,  112,  230,  103,  193,  217,  179,  193,  224,  99,  65,  127,  135,  31,  235,  247,  95,  172,  239,  86,  121,  178,  47,  215,  43,  113,  246,  213,  42,  235,  83,  193,  235,  91,  188,  233,  175,  183,  179,  139,  69,  153,  21,  171,  93,  113,  246,  244,  226,  63,  58,  211,  187,  85,  134,  114,  126,  34,  210,  224,  209,  91,  167,  215,  69,  182,  247,  162,  104,  255,  176,  41,  214,  211,  179,  229,  58,  191,  91,  20,  221,  238,  137,  23,  253,  226,  237,  102,  189,  221,  239,  226,  234,  109,  148,  244,  243,  117,  118,  183,  44,  86,  251,  56,  165,  154,  59,  131,  32,  180,  13,  5,  143,  229,  212,  239,  216,  34,  193,  126,  190,  93,  223,  159,  173,  138,  251,  179,  207,  183,  219,  245,  214,  247,  212,  40,  182,  197,  237,  93,  185,  45,  118,  103,  201,  217,  125,  185,  202,  169,  204,  125,  185,  159,  211,  157,  254,  210,  11,  70,  219,  98,  127,  183,  93,  157,  81,  43,  193,  49,  228,  191,  190,  71,  99,  47,  166,  229,  170,  200,  189,  142,  238,  174,  252,  62,  150,  63,  225,  126,  94,  238,  68,  117,  228,  111,  146,  237,  89,  22,  141,  39,  34,  143,  178,  254,  14,  51,  36,  10,  186,  202,  214,  171,  44,  217,  139,  41,  93,  110,  238,  118,  115,  49,  163,  11,  170,  163,  120,  251,  253,  84,  204,  163,  199,  163,  40,  163,  121,  127,  191,  126,  181,  223,  150,  171,  153,  184,  166,  155,  121,  178,  251,  254,  126,  245,  195,  118,  189,  41,  182,  251,  7,  113,  131,  66,  139,  200,  147,  11,  230,  137,  101,  84,  109,  87,  245,  31,  131,  95,  246,  167,  43,  170,  188,  220,  243,  155,  163,  88,  69,  23,  191,  142,  175,  118,  87,  119,  95,  124,  254,  197,  23,  87,  111,  63,  29,  76,  122,  135,  218,  253,  147,  139,  153,  88,  83,  177,  243,  229,  238,  252,  66,  108,  162,  139,  115,  127,  124,  149,  39,  231,  191,  79,  130,  139,  89,  41,  110,  219,  27,  75,  169,  199,  63,  110,  168,  127,  47,  146,  93,  225,  7,  199,  17,  90,  142,  150,  253,  205,  118,  189,  95,  99,  194,  162,  71,  9,  45,  225,  66,  208,  4,  236,  246,  219,  187,  108,  191,  222,  134,  75,  177,  43,  22,  5,  95,  122,  158,  88,  20,  171,  217,  126,  30,  14,  196,  126,  253,  233,  118,  155,  60,  216,  21,  54,  13,  229,  253,  44,  89,  44,  124,  76,  55,  141,  103,  86,  236,  43,  80,  160,  135,  126,  183,  88,  116,  162,  36,  30,  92,  38,  49,  74,  142,  147,  30,  126,  250,  178,  254,  73,  40,  159,  77,  194,  106,  101,  88,  141,  87,  251,  36,  187,  169,  84,  137,  85,  76,  105,  36,  203,  98,  59,  43,  184,  104,  223,  25,  128,  31,  136,  196,  66,  12,  13,  183,  120,  243,  61,  131,  117,  196,  0,  145,  162,  236,  190,  120,  43,  111,  245,  141,  72,  143,  162,  72,  178,  121,  216,  58,  149,  203,  62,  222,  113,  75,  66,  174,  218,  50,  217,  180,  141,  146,  171,  52,  157,  246,  169,  139,  201,  198,  175,  194,  97,  42,  50,  83,  60,  145,  131,  165,  71,  168,  52,  160,  122,  25,  38,  91,  230,  184,  86,  113,  222,  79,  54,  155,  197,  131,  234,  209,  118,  198,  251,  100,  135,  10,  166,  229,  118,  183,  63,  85,  65,  113,  235,  15,  168,  204,  34,  121,  103,  145,  243,  33,  149,  41,  110,  91,  166,  220,  89,  49,  145,  69,  189,  164,  231,  99,  57,  211,  112,  96,  230,  187,  214,  207,  236,  50,  26,  116,  187,  233,  101,  22,  143,  121,  129,  179,  201,  36,  28,  79,  80,  253,  42,  63,  57,  74,  179,  96,  135,  67,  99,  109,  1,  70,  10,  46,  194,  169,  216,  17,  26,  10,  105,  35,  211,  143,  216,  109,  120,  234,  232,  142,  47,  104,  137,  8,  79,  237,  169,  157,  136,  119,  156,  186,  118,  218,  196,  144,  104,  49,  105,  238,  115,  81,  136,  41,  109,  122,  51,  145,  227,  193,  228,  112,  160,  29,  61,  143,  134,  180,  245,  205,  99,  61,  244,  235,  168,  51,  28,  77,  129,  194,  210,  245,  122,  81,  36,  43,  139,  48,  103,  221,  174,  127,  29,  205,  42,  149,  205,  85,  101,  189,  94,  32,  26,  24,  118,  118,  56,  44,  251,  229,  238,  11,  221,  175,  89,  112,  56,  248,  51,  66,  39,  1,  181,  30,  69,  37,  213,  55,  147,  128,  59,  63,  63,  15,  70,  229,  229,  124,  132,  138,  8,  183,  202,  29,  229,  23,  149,  150,  130,  0,  253,  202,  207,  202,  213,  89,  17,  36,  209,  108,  156,  79,  104,  165,  10,  252,  204,  58,  81,  148,  161,  123,  221,  46,  126,  208,  234,  15,  139,  164,  92,  201,  185,  38,  10,  67,  13,  99,  87,  149,  59,  222,  232,  244,  32,  8,  98,  63,  165,  255,  211,  112,  9,  55,  38,  221,  174,  125,  153,  4,  113,  130,  149,  12,  205,  115,  183,  46,  126,  75,  67,  70,  243,  145,  94,  7,  255,  154,  38,  153,  42,  13,  223,  172,  203,  252,  108,  160,  122,  195,  69,  232,  169,  6,  160,  153,  93,  56,  255,  145,  8,  77,  66,  168,  60,  84,  164,  194,  235,  249,  139,  222,  183,  201,  126,  222,  223,  226,  241,  210,  15,  130,  254,  182,  216,  44,  146,  172,  240,  47,  174,  94,  18,  150,  244,  188,  64,  148,  187,  191,  23,  73,  254,  16,  118,  6,  162,  0,  161,  169,  192,  113,  157,  8,  37,  192,  192,  235,  245,  198,  5,  70,  66,  247,  102,  61,  90,  54,  185,  167,  31,  209,  34,  210,  224,  176,  142,  92,  141,  154,  154,  144,  255,  234,  137,  58,  28,  90,  42,  72,  240,  166,  241,  245,  79,  146,  106,  157,  198,  157,  221,  110,  18,  17,  205,  149,  212,  13,  95,  124,  71,  203,  190,  45,  179,  150,  79,  58,  238,  74,  209,  119,  231,  155,  100,  187,  43,  190,  88,  172,  19,  44,  78,  111,  72,  219,  18,  21 ];
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

a.splitByArray([13,10,13,10]);