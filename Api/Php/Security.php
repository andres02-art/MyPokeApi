<?php
//version 0.1
    function SecurityLogin($sesion)
    {
        if (isset($sesion)) {
        return true;
        }
    }
    function SecurityLogout()
    {
        require './logout.php';
    }
    function SecurityAccessDataBase()
    {
        $root = mysqli_connect('127.0.0.1', 'root', '', 'mypokebd');
        return $root;
    }
    function SecurityFetchDataBase($root, $sentence)
    {
        $responce = mysqli_query($root, $sentence);
                if ($responce->fetch_assoc() == null) {
                    SecurityLogout();
                }else {
                    return $responce->fetch_assoc();
                }
        
    }
    function SecurityPass($arrayLog, $case, $origin)
    {
        print_r($arrayLog);
        $rows = [];
        $vals = [];
        $i = 0;
        foreach ($arrayLog as $key => $value) {
            preg_match_all('/mypokebd/', $key, $match);
            if ($match[0][0]=='mypokebd') {
                $var = substr($key, 5, -1);
                $rows[$i] = $var;
                $vals[$i] = $value;
                $i = $i + 1;
            }
        };
        switch ($case) {
            case 'AddProduct':
                $sentence = "SELECT * FROM $origin[0], $origin[1] WHERE $origin[1].$rows[1] = $origin[0].$rows[1] AND  $origin[0].$rows[1] = '$vals[1]' AND $origin[0].$rows[0] = '$vals[0]' ";
                $DataResponse = SecurityFetchDataBase(SecurityAccessDataBase(), $sentence);
                break;
            default:
                echo "proceso no encontrado";
                break;
        }
    }
?>
