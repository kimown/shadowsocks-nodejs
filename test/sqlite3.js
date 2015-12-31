/**
 * Created by google on 12/31/15.
 */


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/tmp/aa.db');


db.on('trace',(sql)=>{
    console.log('execute sql:'+sql);
});
db.on('profile',(sql,time)=>{
    console.log('execute sql '+sql+',spend time '+time);
})
db.serialize(function() {
    //db.run("CREATE TABLE lorem (info TEXT)");


    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});

db.close();