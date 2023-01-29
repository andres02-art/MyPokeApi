Use mypokebd;

/*
funicionamiento dinamico de la base de datos al ser editada
*/

DELIMITER ;;

/*
permite crear un security para cada usuario
*/
create or replace definer=root@localhost trigger _SecurityModule after insert on users
for each row
begin
    insert into _security(no)
    value(new.ID_User) on duplicate key update no=new.ID_User;
end;;

/*
Permite asignar un poquemon a una view
*/

create or replace definer=root@localhost trigger _ViewPokemon after insert on pokemon
for each row
begin
    insert into views(no, _Pokemon, _origin)
    values(new.ID_Pokemon, new._description, new.ResID_Response);
end;;

/*
Permite generar y borrar un codigo
    DELIMITER $$
    create or replace definer=root@localhost event _CodeBraker on schedule every 1 MINUTE starts CURRENT_DATE on completion preserve enable
    do
    begin
        select _code from _security;
        SELECT * FROM pokemon;
    end$$
    create or replace definer=root@localhost event _Codebroken on schedule at CURRENT_TIMESTAMP + 500 on completion not preserve enable 
    do
    begin
        update _security set _code = DEFAULT Where no = idSecurebox;
    end$$
    DELIMITER ;;
DELIMITER ;;
create or replace definer=root@localhost procedure CreateTimelapCodeEvent(in idSecurebox varchar(30), in Time_Max date)not deterministic contains sql sql security invoker
begin
	DECLARE timelaps int;
    WHILE (select Time_Max) > (SELECT timelaps)
    DO
    	CREATE or REPLACE TABLE timelapse ENGINE=INNODB; 
        SET timelaps = CURRENT_TIMESTAMP;
    END WHILE;
    DROP TABLE timelapse;
    update _security set _code = default Where no = idSecurebox;
end;;
*/

create or replace definer=root@localhost function _CodeMaker(idSecurebox varchar(30), _codeSet varchar(8)) returns text not deterministic contains sql sql security invoker
begin
    declare _maker text;
    if (select _status from _security Where no = idSecurebox) = true then
        set _maker = PASSWORD(_codeSet);
    else
        set _maker = 'false';
    end if;
    return _maker;
end;;

create or replace definer=root@localhost event _Codebroken on schedule at CURRENT_TIMESTAMP on completion preserve enable 
do
begin
    update _security set _code = DEFAULT Where no = (select ID_User from users inner join person Where users.PrsID_Person=person.ID_Person and person.__credentials="CC");
end;;

create or replace definer=root@localhost trigger _SecurityCode before update on _security
for each row
begin
    Declare _CodeMakerVar text;
    set _CodeMakerVar = _CodeMaker(old.no, new._code);
    if (select _CodeMakerVar) = 'false' then
        Set new._code = default;
        Set new._status = default;
    end if;
    Set new._code = des_encrypt(_CodeMakerVar);
end;;

DELIMITER ;