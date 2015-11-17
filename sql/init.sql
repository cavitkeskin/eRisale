drop view article_view;
drop table article;
drop table article_type;

create table if not exists article (
	id integer not null auto_increment,
	status tinyint, -- null, 0, 1, 2
    type int,
    template varchar(16),
	parent int,
	path varchar(128),
	filename varchar(64) not null,
	title varchar(128) not null,
	description text,
	content text,
	primary key (id)
	-- unique (path, code)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


insert into article (id, status, parent, path, filename, title, description, content)
select id, status, parent, path, filename, title, description, content from article_bak;

update article set type = 2 where LENGTH(content) > 250;
update article set type = 1 where parent = 352;
update article set template = 'bookshelf' where id = 352;

CREATE TABLE article_type(id int not null, code varchar(8) not null, name varchar(16), template varchar(16));

insert into article_type(id, code, name, template)
values(1, 'book', 'Book', 'book'), (2, 'article', 'Article', 'article');


create view article_view as 
select 
    a.id, a.status, a.type, coalesce(a.template, t.template) as template,
    a.parent, a.path, a.filename, a.title, a.description, a.content, t.code as type_code 
from article a 
left join article_type t on t.id = a.type;




/*
drop table hier;
create table hier (parent int, article int);


insert into article (id, status, filename, title, description, content) select id, status, filename, title, description, content from risaleinur.article;

insert into hier (parent, article) select parent, article from risaleinur.article_hierarchy;
*/

