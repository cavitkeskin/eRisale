//module.exports = {
//	dbname: 'rnur',
//	dbuser: 'root',
//	dbhost: 'localhost',
//	dbpass: ''
//}

var mysql = require('mysql'),
	conf = require('../config'),
	util = require('util'),
	_ = require('underscore');

var db = mysql.createConnection({
  host     : conf.dbhost,
  user     : conf.dbuser,
  password : conf.dbpass,
  database : conf.dbname
});
 

db.connect();

function(err) {
  if (err) throw err

  db.query('CREATE TABLE article_type(id int not null, code varchar(8) not null, name varchar(16), template varchar(16))', function(err, result) {
    if (err) throw err
        var sql = util.format(select A.*, from article A inner join article_type B on A.id = B.id, A.c = B.code, A.title = B.name);
            
    db.query(sql, function(err, data){
        if (err) throw err;
         console.log(data);
  }) 
}

