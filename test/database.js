var db = require('../lib/Database');


describe('lib/Database', function(){
	it('get root article by parent id', function(done){
		db.getList(0, function(err, data){
			if(err) throw err;
			if(data.length == 0) throw new Error('there shold be some articles');
			done();
		})
	});
	it('get root article by path');
	it('get article by id');
	it('get article by url');
})