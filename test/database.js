var db = require('../lib/Database');


describe('lib/Database', function(){

	it('get root article by parent id', function(done){
		db.getList(0, function(err, data){
			if(err) throw err;
			if(data.length == 0) throw new Error('database error: there shold be some articles');
			done();
		})
	});

    
	it('get root article by path', function(done){
		db.getListByPath('/nur-lectures', function(err, data){
			if(err) throw err;
			if(data.length == 0) throw new Error('database error: there should be a path');
			done();
		})
	});

    
    it('get article by id', function(done){
		db.getArticle(40, function(err, data){
			if(err) throw err;
			if(data.length == 0) throw new Error('database error: cannot find article');
			done();
		})
	});

    
	it('get article by url', function(done){
		db.getArticleByURL('/nur-lectures/video', function(err, data){
			if(err) throw err;
			if(data.length == 0) throw new Error('database error: cannot find url');
			done();
		})
	});
    
})

//console.log('id: ', db.getList(0));
//console.log('path: ', db.getList('/nur-lectures'));
//console.log('article: ', db.getList(40));
//console.log('url: ', db.getList('/nur-lectures/video'));