<?php
if (!isset($_SESSION)) {
    session_start();
}
include('./Security.php');
include('./Functions.php');

print_r($_POST);

$noUser = GenKey(15, true, 'users', 'no');
$noPerson = GenKey(15, true, 'person', 'ID_Person');
$PersonSentence = "INSERT into user(ID_Person, name, lastName, __credentials) values($noPerson, '$_POST[name]', '$_POST[lastName]', '$_POST[__credentials]')";
$UserSentence = "INSERT into users(no, PrsID_Person, nickName, _registerDate, __address, _password) values($noUser, '$_POST[nickName]', CURRENT_DATE, '$_POST[__address]', '$_POST[_password]')";

?>