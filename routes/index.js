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


module.exports = router;
