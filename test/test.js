const dns = require('dns');

dns.resolve4('nodejs.org', (err, addresses) => {
    if (err) throw err;

    console.log(`addresses: ${JSON.stringify(addresses)}`);

    addresses.forEach((a) => {
        dns.reverse(a, (err, hostnames) => {
            if (err) {
                throw err;
            }
            console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
        });
    });
});

//
//dns.resolve4('nodejs.org', (err, addresses) => {
//    if (err) throw err;
//
//    console.log(`addresses: ${JSON.stringify(addresses)}`);
//
//    addresses.forEach((a) => {
//        dns.reverse(a, (err, hostnames) => {
//            if (err) {
//                throw err;
//            }
//            console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
//        });
//    });
//});

var a='111.13.101.208';
dns.reverse(a, (err, hostnames) => {
    if (err) {
        throw err;
    }
    console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
});

/**



 {
    "server":"52.193.32.25",
    "server_port":8388,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"password",
    "timeout":600,
    "method":"aes-256-cfb"
}


 */