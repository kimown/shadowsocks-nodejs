/**
 * Created by google on 3/11/16.
 */
const fs = require('fs');


fs.watchFile('replace.txt', (curr, prev) => {
    console.log(`the current mtime is: ${curr.mtime}`);
    console.log(`the previous mtime was: ${prev.mtime}`);
});

fs.readFile('replace.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});