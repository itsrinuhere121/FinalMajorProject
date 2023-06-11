create table userTable
(
	userid text primary key,
	username text unique,
	password text
)
create table alerts
(
alertid text primary key,
userid text,
title text,
description text,
created timestamp,
links text,
	foreign key (userid) references  usertable(userid)
)
