DROP database if exists mypokebd;
create database mypokebd character set = "utf8mb4" collate = "utf8mb4_unicode_nopad_ci";


create or replace table person(
    ID_Person varchar(15) unique not null,
    name text not null, 
    lastname text not null, 
    fristName text null default concat(name, lastname),
    brithDate date null,
    deathDate date null, 
    description text null default "none",
    __credentials double(10) unique not null,
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
    _Security varchar(30) unique not null,
    _account boolean not null default true,
    primary key(ID_User),
    index `UserPerson`(`no`, `PrsID_Person`),
    constraint FKusr_Psrs
        foreign key (PrsID_Person) references person(ID_Person)
        on update cascade
        on delete cascade
)engine=innodb;

create or replace table developer(
    ID_Developer varchar(30) unique default concat(no, PrsID_Person) not null, 
    no varchar(15) unique not null, 
    PrsID_Person varchar(15) unique not null, 
    _nickName varchar(50) unique not null, 
    _address text not null, 
    _account boolean not null default true,
    primary key(ID_Developer), 
    index `DeveloperPerson`(`no`, `PrsID_Person`), 
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
    index `ReportDeveloper`(`ID_Report`, `DevID_Developer`), 
    constraint FKRep_Dev
        foreign key(DevID_Developer) references developer(ID_Developer)
        on update cascade
        on delete cascade
)engine=innodb;

create or replace table reports_x_user(
    no bigint AUTO_INCREMENT unique not null, 
    RepID_Report varchar(30) unique not null, 
    UsrID_User varchar(30) unique not null, 
    index `RpUUser`(`no`, `UsrID_User`), 
    index `RpUReport`(`no`, `RepID_Report`), 
    constraint FkRPUUsr
        foreign key(UsrID_User) references users(ID_User),
    constraint FKRPU
        foreign key(RepID_Report) references report(ID_Report)
)engine=innodb;