<?php
if (!isset($_SESSION)) {
    session_start();
}
$sesion = SecurityLogin($_SESSION['MasterUser']['User']);
function GenKey($len, $random, $table, $colunm){
    $result="";
    $response=null;
    $bucle=true;
    do {
        if ($random==true) {
            for ($i=0; $i < $len; $i++) { 
                $coderesponse[$i] = random_int(0, 2);
                if ($coderesponse[$i] == 1) {
                    $coderesponse[$i] = random_int(65, 88);
                    $coderesponse[$i] = chr($coderesponse[$i]);
                }elseif ($coderesponse[$i] == 2) {
                    $coderesponse[$i] = random_int(97, 122);
                    $coderesponse[$i] = chr($coderesponse[$i]);
                }else {
                    $coderesponse[$i] = random_int(0, 9);
                }
                $result = $result.$coderesponse[$i];
            }
            $response = mysqli_query(ReStartConnect(), "SELECT $colunm FROM $table WHERE $colunm RLIKE('.*$result.*')");
            $response = $response->fetch_assoc();
            echo $response;
            if ($response == null or $response != $result) {
                $bucle=false;
            }
        }else{
            $response = mysqli_query($_SESSION['MasterUser']['MasterConnect'], "SELECT max($colunm) FROM $table");
            $response = $response->fetch_assoc();
            if ($response==null or $response==""){
                $bucle=false;
                $result='no hay codigos';
                echo $result;
            }else {
                foreach ($response as $key => $value) {
                    $result = $value + 1;
                    $bucle=false;
                    echo $result;
                }
            }

        }
    } while ($bucle != false);
    return $result;
}
function ReStartConnect() {
    $user = mysqli_connect($_SESSION['MasterUser']['MasterService'], $_SESSION['MasterUser']['MasterConnect'], $_SESSION['MasterUser']['MasterPassword'], 'mypokebd');
    return $user;
}
function ReStarPokemons()
{
    $pokelink = SetFetchQuery("SELECT ID_External_Domine, _link FROM external_domine", "externalDomine");
    print_r($pokelink);
    $pokefile = file_get_contents($pokelink['fila_1']['_link'][0]);
    SetFetchQuery("UPDATE external_domine SET _request = '$pokefile' where external_domine.ID_External_Domine='$pokelink[fila_1][ID_External_Domine][0]'", "SessionInsert");
}
function ResponseProcess($Reg)
{
    print_r($Reg);
?>
    <script>
        let queryAnimate = new animatedObjs('PopupView', 'PopupView', 'enable', '', 5);
        queryAnimate.Backup_animate('play_animate()', 'Reset')
        let contentResponseProcess = {
            query: ['NewResponseProcess', '.PopupView'], 
            response: ['FillContent', 'Popup', {
                contenido: `<br><b><?php echo $Reg[0]?></b><br>`,
                error: `<?php echo $Reg[1]?>`,
                CodeError: `<?php echo $Reg[2]?>`
            }]
        }
        localStorage.setItem("LastFetchQuery", JSON.stringify(contentResponseProcess))
        window.location.assign('../../index.php')
    </script>
<?php
}
function SessionFetch($fetch)
{
    $responseqli = mysqli_query(ReStartConnect(), $fetch);
    if ($responseqli == true) {
        $response = mysqli_fetch_assoc(mysqli_query(ReStartConnect(), $fetch));
    }    else{
      foreach ( $responseqli as $key => $value) {
        ++$key;
         foreach ($value as $ke => $valu) {
            $response['fila_'.$key][$ke] = [$valu];
        }
    }
    return $response;
    }
}
function SessionInsert($fetch)
{
    $responseqli = mysqli_multi_query(ReStartConnect(), $fetch);
    print_r($responseqli);
}
function SetFetchQuery($fetch, $type)
{
    switch ($type) {
        case 'SessionFetch':
            return SessionFetch($fetch);
        case 'SessionInsert':
            SessionInsert($fetch);
        case 'externalDomine':
            return SessionFetch($fetch); 
                default:
            return 'petición no encontrada';
    }
}
function normalfetch($fetch)
{
?>
    <script>
        let CurrentFetch = JSON.parse(localStorage.getItem(`LastFetchQuery`))
        CurrentFetch.response[2]={
            <?php    
            foreach($responseqli = mysqli_query(ReStartConnect(), $fetch) as $key => $value){
                ++$key;
                echo "'fila_$key' : {";
                foreach ($value as $llave => $valor) {
                    echo "'$llave' : '$valor',";
                }
                echo "},";
            }
            ?>
        }
        localStorage.setItem(`LastFetchQuery`, JSON.stringify(CurrentFetch))
    </script>
<?php
}
?>