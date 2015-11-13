var express = require('express');
var router = express.Router();
var db = require('../lib/database');
var markdown = require( "markdown" ).markdown;

router.get('/', function(req, res, next){
    db.getList(0, function(err, data){
	    if(err) throw err;
        res.render('Mainpage', {list: data });
    })
    
});


router.get('*', function(req, res, next){
    
    db.getArticleByURL(req.params[0], function(err, article){
       if(err) throw err;
    //     console.log(article.content)
         
        article.content = markdown.toHTML(article.content||'');
        
        db.getListByPath(req.params[0], function(err, subarticles){
            res.render('articles', {article: article, list: subarticles})
      //      console.log(article)
        });
    });
    });









    
//    db.getListByPath(req.params[0], function(err, data){
//       if(err) throw err; 
//        res.render('articles', {list: data})
//    });
//});

//router.get('/:url', function(req, res, next){
//    pop.getListByPath(req.params.url, function(err, data){
//       if(err) throw err; 
//        res.render('articles', {terry: data})
//    });
//});
    

//    
//  var book = req.params[0];
//  connection.query('SELECT * from article where code = ?;', [book], function(err, rows, title) {
//    if (err) throw(err); 
//    if(rows.length>0){
//
//      var current = rows[0];  
//      connection.query('SELECT id, title, parentcode, code from article where parent = ? order by title;', [current.id], function(err, rows, title, parentcode) {
//        if (err) throw(err); 
//        if(rows.length == 0)
//          res.render('content', current);
//        else
//          res.render('cats', {subdata: rows});
//      });
        
        
module.exports = router;
