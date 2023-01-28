Use mypokebd;

/*
funicionamiento dinamico de la base de datos al ser editada
*/

Delimiter ;;

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
    insert into views(no, _Pokemon)
    values(new.ID_Pokemon, new.ResID_Response);
end;;

Delimiter ;
