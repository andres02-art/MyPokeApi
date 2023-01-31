SET GLOBAL event_scheduler="ON";
SET GLOBAL wait_timeout=5000;

insert into person(ID_Person, name, lastname, __credentials)values('1000851592andres', 'andres', 'arregoces', 1000851592) on duplicate key update __credentials=1000851592;
insert into _developer(no, PrsID_Person, _nickName, _address) values('1000851592david', '1000851592andres', 'RubRubPage', 'a.arregoces@gmail.com') on duplicate key update no='1000851592david';
insert into external_domine(ID_External_Domine, _link, _domine, _ip, _name, _request) values('httpspokeapicoapiv2pokemon0001', 'https://pokeapi.co/api/v2/pokemon/', 'pokeapi.co', '2800:481:2300::4', 'https://pokeapi.co', 'fetch_Content') on duplicate key update ID_External_Domine = 'httpspokeapicoapiv2pokemon0001';
