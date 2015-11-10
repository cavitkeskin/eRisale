/*
drop table article;
drop table hier;

create table if not exists article (
	id integer not null auto_increment,
	status tinyint, -- null, 0, 1, 2
	parent int,
	path varchar(64),
	filename varchar(64) not null,
	title varchar(128) not null,
	description text,
	content text,
	primary key (id)
	-- unique (path, code)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


create table hier (parent int, article int);


insert into article (id, status, filename, title, description, content) select id, status, filename, title, description, content from risaleinur.article;

insert into hier (parent, article) select parent, article from risaleinur.article_hierarchy;
*/

select a.id, a.title, a.filename from article a 
inner join hier h on h.article = a.id and h.parent = 352;