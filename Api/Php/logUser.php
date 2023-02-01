<script src="../js/Mypokeapi_animations.js"></script>
<?php
if (!isset($_SESSION)) {
    session_start();
}
include('./Security.php');
include('./Functions.php');

print_r($_POST);

$noUser = GenKey(15, true, 'users', 'no');
$noPerson = GenKey(15, true, 'person', 'ID_Person');
$PersonSentence = "INSERT into person(ID_Person, name, lastName, __credentials) values('$noPerson', '$_POST[name]', '$_POST[lastname]', '$_POST[__credentials]')on duplicate key update ID_Person = '$noPerson'";
$UserSentence = "INSERT into users(no, PrsID_Person, nickName, _registerDate, __address, _password) values('$noUser', '$noPerson', '$_POST[nickName]', CURRENT_DATE, '$_POST[__addressreg]', '$_POST[_passwordreg]')on duplicate key update ID_User = '$noUser$noPerson'";
echo $UserSentence;
mysqli_multi_query(ReStartConnect(), $PersonSentence);
mysqli_multi_query(ReStartConnect(), $UserSentence);

ResponseProcess(['Succes', 'Usuario creado correctamente', 3])
?>