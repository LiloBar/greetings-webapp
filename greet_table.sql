drop table users;

create table users (
    id serial not null primary key,
    user_name text not null,
    count int not null
);