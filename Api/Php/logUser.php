<script src="../js/Mypokeapi_animations.js"></script>/version 0.1
<?php
//version 0.1
if (!isset($_SESSION)) {
    session_start();
}
include('./Security.php');
include('./Functions.php');
try {

    print_r($_POST);
    switch ($_POST['Activity']) {
        case 'Register':
            $noUser = GenKey(15, true, 'users', 'no');
            $noPerson = GenKey(15, true, 'person', 'ID_Person');
            $PersonSentence = "INSERT into person(ID_Person, name, lastName, __credentials) values('$noPerson', '$_POST[name]', '$_POST[lastname]', '$_POST[__credentials]')";
            $UserSentence = "INSERT into users(no, PrsID_Person, nickName, _registerDate, __address, _password) values('$noUser', '$noPerson', '$_POST[nickName]', CURRENT_DATE, '$_POST[__addressreg]', SHA2('$_POST[_passwordreg]', '512'))";
            $ConnectSentence = "CREATE or replace user '$_POST[nickName]'@'%' identified by '$_POST[_passwordreg]'";
            $GrantConnect = "GRANT ALL privileges on mypokebd.* to '$_POST[nickName]'@'%'";
            mysqli_multi_query(ReStartConnect(), $PersonSentence);
            mysqli_multi_query(ReStartConnect(), $UserSentence);
            mysqli_multi_query(ReStartConnect(), $ConnectSentence);
            mysqli_multi_query(SecurityAccessDataBase('mysql'), $GrantConnect);
            mysqli_multi_query(SecurityAccessDataBase('mysql'), "Flush privileges");
            break;
        case 'LogIn':
            $log = SetFetchQuery("SELECT * from users inner join person where users.PrsID_Person = person.ID_Person AND users._password = SHA2('$_POST[_password]', '512')", "SessionFetch")->fetch_assoc();
            echo $log['nickName'];
            $LogConnect = mysqli_query(SecurityAccessDataBase("mysql"), "SELECT * from user where User = '$log[nickName]'")->fetch_assoc();
            echo $LogConnect['Password'];
            $_SESSION['LogIn'] = true;
            $_SESSION['MasterUser']['User'] = $LogConnect;
            $_SESSION['MasterUser']['MasterConnect'] = "$log[nickName]";
            $_SESSION['MasterUser']['MasterPassword'] = "$_POST[_password]";
            $_SESSION['MasterUser']['MasterService'] = "$_SERVER[HTTP_HOST]";
            break;

        default:
            echo 'Actividad No encontrada';
            break;
    }
} catch (\Exception $ex) {
    switch ($ex->getCode()) {
        case '1062':
            ResponseProcess(['Error', "Usuario Existente, intentelo nuevamente", $ex->getCode()]);
            break;

        default:
            ResponseProcess(['Warming', "ha ocurrido: " . $ex->getMessage(), $ex->getCode()]);
            break;
    }
}
?>