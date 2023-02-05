<script src="../js/Mypokeapi_animations.js"></script>
<?php
//version 0.1
if (!isset($_SESSION)) {
    session_start();
}
include('./Security.php');
include('./Functions.php');
if (isset($_POST['_request'])) {
mysqli_multi_query(ReStartConnect(), "UPDATE external_domine set _request = '$_POST[_request]' where ID_External_Domine = 'httpspokeapicoapiv2pokemon0001'");
ResponseProcess(['Succes', 'base de datos actualizada', 4]);
}elseif (SetFetchQuery("SELECT * FROM pokemon where 1", "SessionFetch")->fetch_assoc() == '') {
    foreach ($_POST['_NamesPokemons'] as $key => $value) {
        $ID_Pokemon = GenKey(30, true, 'pokemon', 'ID_Pokemon');
        $ID_Response = GenKey(30, true, 'pokemon', 'ID_Pokemon');
        $IDExternalDomine = 'httpspokeapicoapiv2pokemon0001';
        $abilities = "_Abilities".$key;
        $picture = "_ImgsPokemons".$key;
        $description = "_DescriptionPokemons".$key;
        $urls = "_UrlsPokemons".$key;
        $InsertPokemon = "INSERT into pokemon(ID_Pokemon, ResID_Response, _name, _abilities, _picture, _description)";
        $ValuesPokemons = "Values('$ID_Pokemon', '$ID_Response', '$value', '$_POST[$abilities]', '$_POST[$picture]', '$_POST[$description]')on duplicate key update _name = '$value'";
        $InsertResponse = "INSERT into response(EXID_External_Domine, no, _pokemon)";
        $ValuesResponse = "Values('$IDExternalDomine', '$ID_Response', '$_POST[$urls]')on duplicate key update no = '$ID_Response'";
        echo $InsertResponse.$ValuesResponse;
        SetFetchQuery($InsertResponse.$ValuesResponse, "SessionInsert");
        SetFetchQuery($InsertPokemon.$ValuesPokemons, "SessionInsert");
   }
ResponseProcess(['Succes', 'base de datos inicializada', 5]);
}else {
ResponseProcess(['Succes', 'base de datos inicializada', 5]);
}

?>