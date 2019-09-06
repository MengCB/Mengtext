
drop table user;

CREATE TABLE IF NOT EXISTS `user`(
   `user_id` INT UNSIGNED AUTO_INCREMENT,
   `user_name` VARCHAR(400) NOT NULL,
   `user_description` VARCHAR(400) NOT NULL,
   `user_password` VARCHAR(30) NOT NULL,
   `submission_date` DATE,
   PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


drop table article;
CREATE TABLE IF NOT EXISTS `article`(
   `article_id` INT UNSIGNED AUTO_INCREMENT,
   `article_title` VARCHAR(400) NOT NULL,
   `article_content` MEDIUMTEXT NOT NULL,
   `article_author` VARCHAR(30) NOT NULL,
   `article_authority` VARCHAR(10) NOT NULL,
   `article_ok` INT ,
   `article_cai` INT ,
   `article_time` DATE,
   PRIMARY KEY ( `article_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into article(article_title,article_content,article_author, article_authority,article_ok,article_time)
values('第一篇文章','发送到发送到发斯蒂芬','fang','private', 9,now());

UPDATE article SET article_ok=( CASE article_ok  WHEN article_ok  THEN article_ok+1  ELSE '1' END) where article_id is not null;



drop table comment;
CREATE TABLE IF NOT EXISTS `comment`(
   `comment_id` INT UNSIGNED AUTO_INCREMENT,
   `article_id` VARCHAR(400) NOT NULL,
   `article_title` VARCHAR(400),
   `comment_content` MEDIUMTEXT NOT NULL,
   `comment_author` VARCHAR(30) NOT NULL,
   `comment_ok` INT ,
   `comment_time` DATE,
   PRIMARY KEY ( `comment_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into comment (article_id,comment_author, comment_content , comment_time)values("13","fang","你很棒啊",  now());


