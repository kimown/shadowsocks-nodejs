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