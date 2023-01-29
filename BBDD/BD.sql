DROP database if exists mypokebd;
create database mypokebd character set = "utf8mb4" collate = "utf8mb4_unicode_nopad_ci";

/*
Creación estructurada de la base de datos desde las tablas o diagramado ER en starUMl
*/
create or replace table person(
    ID_Person varchar(15) unique not null,
    name text not null, 
    lastname text not null, 
    fristName text null default concat(name, lastname),
    brithDate date null,
    deathDate date null,
    description text null default "none",
    __credentials int(10) unique not null,
    primary key(ID_Person)
)engine=innodb;

create or replace table users(
    ID_User varchar(30) unique default concat(no, PrsID_Person) not null, 
    no varchar(15) unique not null,
    PrsID_Person varchar(15) unique not null, 
    nickName varchar(50) unique not null, 
    _registerDate date not null, 
    __address text not null, 
    _password text not null, 
    _Security varchar(30) unique not null default concat(no, PrsID_Person),
    _account boolean not null default true,
    name text not null, 
    lastname text not null, 
    fristName text null default concat(name, lastname),
    brithDate date null,
    deathDate date null,
    description text null default "none",
    __credentials int(10) unique not null,
    primary key(ID_User),
    index `UserPerson`(no, PrsID_Person),
    constraint FKusr_Psrs
        foreign key (PrsID_Person) references person(ID_Person)
        on update cascade
        on delete cascade
)engine=innodb;

create or replace table _developer(
    ID_Developer varchar(30) unique default concat(no, PrsID_Person) not null, 
    no varchar(15) unique not null, 
    PrsID_Person varchar(15) unique not null, 
    _nickName varchar(50) unique not null, 
    _address text not null, 
    _account boolean not null default true,
    name text not null, 
    lastname text not null, 
    fristName text null default concat(name, lastname),
    brithDate date null,
    deathDate date null,
    description text null default "none",
    __credentials int(10) unique not null,
    primary key(ID_Developer), 
    index `DeveloperPerson`(no, PrsID_Person), 
    constraint FKDev_Prs
        foreign key (PrsID_Person) references person(ID_Person)
        on update cascade
        on delete cascade
)engine=innodb;

create or replace table report(
    ID_Report varchar(30) unique not null, 
    DevID_Developer varchar(30) unique not null, 
    _description text not null, 
    _sendDate date not null, 
    _system text not null, 
    primary key(ID_Report), 
    index `ReportDeveloper`(ID_Report, DevID_Developer), 
    constraint FKRep_Dev
        foreign key(DevID_Developer) references _developer(ID_Developer)
        on update cascade
        on delete cascade
)engine=innodb;

create or replace table reports_x_user(
    no bigint AUTO_INCREMENT unique not null, 
    RepID_Report varchar(30) unique not null, 
    UsrID_User varchar(30) unique not null, 
    index `RpUUser`(no, UsrID_User), 
    index `RpUReport`(no, RepID_Report), 
    primary key(no),
    constraint FkRPUUsr
        foreign key(UsrID_User) references users(ID_User),
    constraint FKRPU
        foreign key(RepID_Report) references report(ID_Report)
)engine=innodb;

create or replace table _security(
    no varchar(30) unique not null, 
    _code text unique null, 
    _status boolean not null default false, 
    _date date not null default CURRENT_DATE, 
    primary key(no),
    index `_securityuser`(no),
    constraint FK_scUsr
        foreign key(no) references users(ID_User)
        on update cascade
        on delete cascade
)engine=innodb;

create or replace table external_domine(
    ID_External_Domine varchar(30) unique not null, 
    _link text unique not null, 
    _domine text unique not null, 
    _ip text unique null, 
    _name text unique not null, 
    _request text not null, 
    primary key(ID_External_Domine)
)engine=innodb;

create or replace table search(
    ID_Search varchar(30) unique not null, 
    UsrID_User varchar(30) unique not null, 
    EdID_External_Domine varchar(30) unique not null, 
    __pokemon varchar(50) unique not null, 
    __date date not null default CURRENT_DATE, 
    primary key(ID_Search), 
    index `SearchUser`(ID_Search, UsrID_User),
    index `SearchExternalDomine`(ID_Search, EdID_External_Domine),
    constraint FkSrhUsr
        foreign key(UsrID_User) references users(ID_User), 
    constraint FkSrhED
        foreign key(EdID_External_Domine) references external_domine(ID_External_Domine)
)engine=innodb;

create or replace table response(
    no varchar(30) unique not null, 
    _pokemon text not null,
    primary key(no), 
    index `ResponseDomine`(no),
    constraint FkResED
        foreign key(no) references external_domine(ID_External_Domine)
        on update cascade
)engine=innodb;

create or replace table pokemon(
    ID_Pokemon varchar(30) unique not null, 
    ResID_Response varchar(30) unique null,
    _name text not null, 
    _abilities text not null, 
    _picture binary not null, 
    _description text not null default "none", 
    primary key(ID_Pokemon), 
    index `PokemonResponse`(ID_Pokemon, ResID_Response),
    constraint FkPokRes
        foreign key(ResID_Response) references response(no)
        on update cascade
)engine=innodb;

create or replace table views(
    no varchar(30) unique not null, 
    _Pokemon text not null, 
    _origin varchar(30) not null,
    primary key(no), 
    index `viewpokemon`(no),
    index `viewresponse`(no, _origin), 
    constraint FKVWRes
        foreign key(_origin) references response(no),
    constraint FKVwsPok
        foreign key(no) references pokemon(ID_Pokemon)
        on delete cascade
        on update cascade
)engine=innodb;