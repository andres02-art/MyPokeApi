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
    codeBraker function "desencripta el codigo"
    codeBroken event elimina el codigo
    codeMaker encripta el codigo
*/

create or replace definer=root@localhost function _CodeBraker(_codeSet text, _baseCode text, _encryptCode text) returns text not deterministic contains sql sql security invoker
begin
    declare _braker text;
    set _codeSet = SHA2(_codeSet, _baseCode);
    case _encryptCode
        when 'md5' then set _braker = md5(_codeSet);
        when 'password' then set _braker = password(_codeSet);
        when 'sha1' then set _braker = sha1(_codeSet);
    end case;
    return _braker;
end;;

create or replace definer=root@localhost event _Codebroken on schedule at CURRENT_TIMESTAMP on completion preserve enable 
do
begin
    update _security set _code = DEFAULT Where no = (select ID_User from users inner join person Where users.PrsID_Person=person.ID_Person and person.__credentials="CC");
end;;

create or replace definer=root@localhost trigger _SecurityCode before update on _security
for each row
begin
    Declare _CodeMaker text;
    Set _CodeMaker = SHA2(new._code, '512');
    if (select new._status) != true then
        Set new._code = default;
        Set new._status = default;
    else
        Set new._code = MD5(_CodeMaker);
        Set new._status = true;
    end if;
end;;



DELIMITER ;