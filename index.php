<?php

//version 0.1
session_start();
include('./Api/php/Security.php');
include('./Api/php/Functions.php');
if (!($Service = $_SERVER['HTTP_HOST'])) {
    throw new Exception("Servidor invalido", 1);
}
$userRoot = mysqli_query(mysqli_connect('localhost', 'root', '', 'mysql'), "Select * from user where user.user='root' AND user.host = 'localhost'")->fetch_assoc();
$_SESSION['MasterUser']['User'] = $userRoot;
$_SESSION['MasterUser']['MasterConnect'] = 'root';
$_SESSION['MasterUser']['MasterPassword'] = '';
$_SESSION['MasterUser']['MasterService'] = $Service;

$LogIn = ($_SESSION['MasterUser']['MasterConnect'] == 'root') ? "false" : "true";
$pokebd = SetFetchQuery("SELECT _request FROM external_domine", "SessionFetch")->fetch_assoc();
    $pokemontable = SetFetchQuery("SELECT * FROM pokemon where 1", "SessionFetch")->fetch_assoc();
    if ($pokemontable == '') {
   $pokebdbool = 'false';
    }else {
    $pokebdbool = 'true';
    }
if ($pokebd['_request'] = 'fetch_Content') {
    ReStarPokemons();
}
    ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPokeApi</title>
    <script src="./Api/Js/LoadApp.js"></script>
    <script src="./Api/Js/Mypokeapi_animations.js"></script>
    <script src="./Api/Js/Mypokeapi_FetchResponse.js"></script>
    <link rel="stylesheet" href="./Assets/Css/HojaDeEstilosPoke.css">
    <link rel="shortcut icon" href="./Assets/Img/icons/MyPokeIcon.png" type="image/x-icon">
</head>

<body>
    <!-- script __init__ -->
    <script type="text/javascript">
        let tg = (x, y) => {
            return x.target.matches(y)
        };
        class LoadApp {
            constructor(Login, pkbdbool, bd) {
                this.LogInBool = Login
                this.height = innerHeight
                this.databasePoke = pkbdbool
                this.bdpokemons = bd
                this.width = innerWidth
                this.Storage = localStorage
                this.DomineApi = "https://pokeapi.co/api/v2/pokemon/"
                this.load()
            }
            load() {
                new LoadPokeApi(this)
            }
        }
        document.addEventListener('DOMContentLoaded', (ev) => {
            new LoadApp(<?php echo $LogIn . ", " . $pokebdbool . ", ";
            if ($pokemontable == '') {
                echo SetFetchQuery("SELECT _request FROM external_domine", "SessionFetch")->fetch_assoc()['_request'];
            }else {
                echo '"Base De datos iniciada"';
            } ?>);
        })
    </script>
    <!-- log view -->
    <section class="LogView">
        <form action="./Api/php/logUser.php" method="post" id="LogView">
            <div class="LogViewForm">
                <div class="LogViewRegister ListRegFlow">
                    <label class="ContentCenter" for="Register">Registrarse</label>
                    <p class="ContentLeft">Nombre:</p>
                    <input class="ContentRigth" type="text" name="name" id="Name" placeholder="nombre">
                    <p class="ContentCenter">Segundo Nombre:</p>
                    <input class="ContentCenter" type="text" name="fristName" placeholder="segundo nombre"
                        id="fristName">
                    <p class="ContentLeft">Apellido:</p>
                    <input class="ContentRigth" type="text" name="lastname" placeholder="apellido" id="Apellido">
                    <p class="ContentLeft">CC:</p>
                    <input class="ContentRigth" type="number"  name="__credentials"
                        placeholder="Cedula" id="Credential">
                    <p class="ContentLeft">Confirmar cc:</p>
                    <input type="number"  name="__Ccredentials" id="CCredential"
                        placeholder="Confirmar cedula" max="10" class="ContentRigth">
                    <hr class="ContentCenter">
                    <label class="ContentCenter" for="Account">Cuenta</label>
                    <p class="ContentLeft">Nick:</p>
                    <input type="text" name="nickName" id="NickName" placeholder="nick" class="ContentRigth">
                    <p class="ContentLeft">Correo:</p>
                    <input type="email" name="__addressreg" id="Address" placeholder="Correo" class="ContentRigth">
                    <p class="ContentLeft">Contraseña:</p>
                    <input type="password" name="_passwordreg" id="password" placeholder="contraseña" class="ContentRigth">
                    <p class="ContentCenter">Confirmar contraseña:</p>
                    <input type="password" name="_Cpasswordreg" id="Cpassword" placeholder="Confirmar contraseña"
                        class="ContentCenter">
                    <hr class="ContentCenter">
                    <input class="ContentCenter" value="Registrarse" active="register" type="button"
                        id="RegisterUser" />
                </div>
                <div class="LogViewIn ListRegFlow">
                    <label for="LogIn" class="ContentCenter">Iniciar sesión</label>
                    <p class="ContentCenter">Nick o Correo:</p>
                    <input class="ContentCenter" placeholder="Correo" type="text" name="_LogDate" id="LogDate">
                    <hr class="ContentCenter">
                    <p class="ContentLeft">Contraseña:</p>
                    <input type="password" placeholder="Contraseña" name="_password" id="Password" class="ContentRigth">
                    <hr class="ContentCenter">
                    <input class="ContentCenter" value="Iniciar Sesion" active="LogIn" type="button" id="LogInUser" />
                </div>
                <div class="LogViewRecovery ListRegFlow">
                    <label class="ContentCenter" for="Recovery">Recuperar Cuenta</label>
                    <hr class="ContentCenter">
                    <p class="ContentCenter">Correo:</p>
                    <input type="email" name="__address" id="Address" placeholder="Correo" class="ContentCenter">
                    <input class="ContentCenter" value="Recuperar Cuenta" active="Recovery" type="button"
                        id="RecoveryUser">
                </div>
                <div class="LogViewSearch ListRegFlow">
                    <label class="ContentLeft" for="Search">Buscar</label>
                    <input class="ContentRigth" type="search" placeholder="Buscar Pokemon" id="pokemonSearchl"
                        name="__pokemon">
                    <input class="ContentMid" value="Buscar" type="button" myled="LogView" id="SearchPokemon" />
                    <input class="ContentMid" type="button" value="Cerrar" id="CBBasicView" myled="LogView">
                </div>
            </div>
        </form>
    </section>
    <!-- Basick view -->
    <section class="BasicView">
        <form action="" class="BasicViewForm">
            <div class="BasicViewBody">
                <img id="background" src="./Assets/Img/pngs/MyPokeApi.png" width="90%" height="100%"
                    alt="imagen echa con figma">
            </div>
            <div class="BasicViewBrowser">
                <div>
                    <input value="cerrar" type="button" name="" />
                    <input value="Reiniciar" type="button" name="" id="FetchPokemons" />
                </div>
                <div>
                    <label for="Search">Buscar Pokemon</label>
                    <input type="search" id="pokemonSearchb" name="__pokemon">
                    <input value="Buscar Pokemon" type="button" name="" myled="BasicView" id="SearchPokemonb" />
                    <input value="Iniciar sesion" type="button" name="" id="LogInUser" />
                </div>
            </div>
        </form>
        <div class="BasicViewPokeList">
            <?php
            //$CurrentFetch = ReStarPokemons();
            ?>

            <!--<li>el</li>-->
            <!--<li>el</li>-->
            <!--<li>el</li>-->
            <!--<li>el</li>-->
            <!--<li>el</li>-->
            <!--<li>el</li>-->
        </div>
    </section>
    <!-- Popep view -->
    <section class="PopupView">
        <form action="">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur ad non quisquam quo, cumque dolore
                minus dolorum dolores hic, voluptatem eligendi praesentium saepe nemo sed sit explicabo pariatur
                excepturi ex?</p>
            <input value="aceptar" type="button" name="" />
            <input value="cancelar" type="button" name="" />
        </form>
    </section>
    <!-- Pokemon view -->
    <section class="PokemonView">
        <div class="PokemonContentView">
            <div class="PokemonHeader">
                <input value="Reiniciar" type="button" name="" id="FetchPokemons" />
                <input value="Cerrar" type="button" name="" myled="PokemonView" id="CBBasicView" />
            </div>
            <div class="PokemonBody ListReg">
                <div class="PokemonAbilities">
                    <li>el</li>
                    <li>el</li>
                    <li>el</li>
                    <li>el</li>
                    <li>el</li>
                    <li>el</li>
                    <li>el</li>
                    <li>el</li>
                </div>
                <div class="PokemonDescription">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae incidunt impedit porro, tempore
                        asperiores minima voluptatem. Sit quis debitis deleniti, odio nostrum aperiam pariatur quasi
                        dolore nam, sapiente provident qui!</p>
                </div>
            </div>
            <div class="PokemonFooter">
                <form action="">
                    <label for="Search">Buscar Pokemon</label>
                    <input value="" type="search" id="pokemonSearch" name="__pokemon">
                    <input value="" type="button" name="" id="SearchPokemon">Buscar Pokemon />
                </form>
            </div>
            <div class="PokemonName">
                titulo nombre
            </div>
            <div class="PokemonIMG">
            </div>
        </div>
    </section>
</body>

</html>