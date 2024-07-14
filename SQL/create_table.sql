create table books (
    ISBN bigint  primary key,
    title varchar (255) not null,
    author varchar (250) not null,
    genre varchar(25) not null,
    year_published int not null
);
