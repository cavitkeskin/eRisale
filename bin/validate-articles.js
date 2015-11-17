#!/usr/local/bin/node

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
 
function updateArticles(data){
	_.each(data, function(h){
		var sql = util.format('update article set parent = %d, path = \'%s\' where id = %d;', h.parent, h.path, h.article);
		db.query(sql, function(err, result){
			console.log(sql);
			if (err) throw err;
			//console.log(result);
			if(result.affectedRows == 1)
				getChilds(h.article);
		})
	})
	
}

function getChilds(parent, callback){
	var sql = util.format('select h.article, h.parent, concat_ws(\'/\', a.path, a.filename) as path from hier h left join article a on a.id = h.parent where h.parent = %d;', parent);
	db.query(sql, function(err, data){
		if (err) throw err;
		// console.log(data);
		updateArticles(data);
	})
}


//db.query('select * from hier where parent = 0', function(err, rows, fields) {
//  if (err) throw err;
// 
//  console.log(rows);
//});


getChilds(0);

//db.end();