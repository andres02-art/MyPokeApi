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
    codeBraker function desencripta el codigo
    codeBroken event elimina el codigo
    codeMaker encripta el codigo
*/

create or replace definer=root@localhost function _CodeBraker(_codeSet varchar(8)) returns text not deterministic contains sql sql security invoker
begin
    declare _braker text;
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