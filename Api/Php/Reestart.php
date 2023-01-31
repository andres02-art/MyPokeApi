<?php
echo 'funciona';

$Content_fetch = file_get_contents('https://pokeapi.co/api/v2/pokemon/');
$_DIALOG['Content_Fetch'] = $Content_fetch
?>