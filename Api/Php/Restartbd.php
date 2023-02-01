<script src="../js/Mypokeapi_animations.js"></script>
<?php
//version 0.1
if (!isset($_SESSION)) {
    session_start();
}
include('./Security.php');
include('./Functions.php');

mysqli_multi_query(ReStartConnect(), "UPDATE external_domine set _request = '$_POST[_request]' where ID_External_Domine = 'httpspokeapicoapiv2pokemon0001'");
ResponseProcess(['Succes', 'base de datos actualizada', 4])

?>