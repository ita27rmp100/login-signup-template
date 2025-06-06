create database template_db ;
use template_db ;
create table users(
    username varchar(255) primary key,
    password varchar(255)
);

select * from users;