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


function getList(parent, callback){
	var sql = util.format('select id, path, filename, title from article where parent = %d order by id;', parent);
	db.query(sql, callback);
}

function getListByPath(path, callback){
	var sql = util.format('select id, path, filename, title from article where path = \'%s\' order by id;', path);
	db.query(sql, callback);
}

function getArticle(id, callback){
	var sql = util.format('select path, filename from article where id = %d order by id;', id);
	db.query(sql, callback);
}

function getArticleByURL(url, callback){                  
	var sql = util.format('select title, id, path, filename, content from article where concat_ws(\'/\', path, filename) = \'%s\' ;', url);
	db.query(sql, callback);
}


module.exports = {
	conn: db,
	getList: getList,
	getListByPath: getListByPath,
	getArticle: getArticle,
	getArticleByURL: getArticleByURL,
}

