<?php 
session_start();
    session_unset();
    if (isset($_SESSION['MasterUserNickname'])) {
        echo $_SESSION['MasterUserNickname'];
    }else{
        echo 'none one set';
    }
if ($_POST['File']) {
    echo 'hola';
}
?>
<script>
    //window.close()
</script>
