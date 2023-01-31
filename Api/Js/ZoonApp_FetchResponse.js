class FetchResponse{
    constructor(Fetch, ExtraFetch = false) {
        if (ExtraFetch === true) {
            this.IdFetch = document.querySelector(Fetch)
        }else{
            this.peticion = Fetch
            this.respuesta = this.peticion.response[0]
            this.caso = this.peticion.query[0]
        }
        switch (this.respuesta) {
            case 'FillContent':
                this.fillContent(this.caso)
                break;
            case 'ReplaceContent':
                this.replaceContent(this.caso)
                break;
            default:
                break;
        }
    }
    replaceContent(swap){
        switch (swap) {
            case 'LeaveMaster':
                document.querySelector(this.peticion.response[1]).innerHTML = `
                    <input type="hidden" name="File"  value="${this.peticion.response[2].LogOutZoon}">
                `
                break;
            case 'UserSlaveLogin':
                break;
            case 'NewCliSlave':
                console.log(this.peticion)
                document.querySelector(this.peticion.response[1]).innerHTML += `
                <datalist id="IDClis">
                </datalist>
                `
                document.querySelector('#Alerts').innerHTML = `
                <div>
                <input type="text" placeholder="Escribe para buscar" id="LookingForClients"/>
                </div >
                <div id="list_Search" style="overflow-x:hidden;overflow-y:scroll;scroll-behavior:smooth;">
                </div>
                <div>
                </div>
                `
                for (const [key, value] of Object.entries(this.peticion.response[2])) {
                    IDClis.innerHTML+=`<option>${value.Usr_Identificacion.split("C").at(0)}</option>`
                    list_Search.innerHTML +=`
                    <li class="ListRegActive" id="MySearchActive" MySearchValue="${value.Usr_Identificacion.split("C").at(0)}" MySearchBox="CltDocumentoG" MySearch="${key}">${value._Nickname} : ${value.Usr_Identificacion.split("C").at(0)}</li>`
                }
                this.SearchContent(document.querySelector('#LookingForClients'), swap)
                break;
            case 'LoginMaster':
                console.log(this.peticion.response[2].LoginNickname)
                document.querySelector(this.peticion.response[1]).innerHTML =`
           <input readonly="readonly" type="hidden" name="TypeLog" value="${this.caso}" >     
           <input readonly="readonly" type="hidden" name="LoginNickname"  value="${this.peticion.response[2].LoginNickname}">
           <input readonly="readonly" type="hidden"  name="LoginPassword"  value="${this.peticion.response[2].LoginPassword}">
           <input readonly="readonly" type="hidden"  name="TypeUser" value="Master" >
                `
                break;
            case 'CreateMaster':
                document.querySelector(this.peticion.response[1]).innerHTML =`
           <input  name="stName" type="hidden" value="${this.peticion.response[2].stName}">
           <input type="hidden" name="ndName"  value="${this.peticion.response[2].ndName}">
           <input  name="pssw" type="hidden" value="${this.peticion.response[2].pssw}">
           <input  name="psswConfirm" type="hidden" value="${this.peticion.response[2].psswConfirm}">
           <input type="hidden" name="CorreoRegistrado" value="${this.peticion.response[2].CorreoRegistrado}">
           <input type="hidden" name="CargoRegistrado" value="${this.peticion.response[2].CargoRegistrado}">
           <input type="hidden" name="DocumentoT" value="${this.peticion.response[2].DocumentoT}">
            <input type="hidden" value="${this.peticion.response[1].Documento}" name="Documento">
            <input type="hidden" name="PermisosOtorgados" value="${this.peticion.response[2].PermisosOtorgados}">
            <input  type="hidden" name="TypeLog" value="${this.caso}" >
                `
                break;
            case 'RecoverMaster':
                break;
            default:
                break;
        }
    }
    fillContent(swap){
        switch (swap) {
            case 'AddProductPP':
                let MyparPP = this.concatContent(document.querySelector('#ArtList'), 'NewArt')
                console.log(MyparPP)
                document.querySelector(this.peticion.response[1]).innerHTML=`
                <div class="BBDDHeader">
                    <h1>Nuevo producto</h1>
                </div>
                <div class="BBDDBody">
                    <div class =${swap}>
                        <div class = "ListReg">
                        <h1>Articulo Nº${MyparPP.contenido[1].length}</h1><br>
                        <p>nombre:</p><input type="text" id="zoonnombreProducto" >
                        <p>Fecha de fabricacion:</p><input type="date" id="zoon_FechaFabricacion" >
                        <p>Cantidad</p><input type="number" id="zoon_Acumulacion" >
                        <h1>Caracteristiacas:</h1><br>
                        <p>Categoria:</p><input type="search" id="zooncategoria" list="SelectCategoria" >
                        <p>Puntos por comprar:</p><input type="number" id="zoon_Puntuacion" >
                        <p>Generarion del producto:</p><input type="number" id="zoon__generacion" >
                        <p>Color:</p><input type="color" id="zooncolor" >
                        </div>
                    </div>
                    <div class="CurrentFact">
                        <div class="ListRegCen">
                            <h1>Factura Nº<h1><br>
                            <p>Vendedor:<p><p>${MyparPP.contenido[1][MyparPP.contenido[1].length-1].attributes.zoonusr_identificacion.value}<p>
                        </div>
                    </div>
                </div>
                <div class="BBDDFooter"></div>
                `
                break;
            case 'AddProductUU':
                let MyparUU = document.querySelector('#NuevoArt').attributes.par.value
                document.querySelector(this.peticion.response[1]).innerHTML=`
                <div>
                    <p>Añadir producto Usuario</p>
                </div>`
                break;
            case 'NewUserSlave':
                document.querySelector(this.peticion.response[1]).innerHTML=`
                <h1>Iniciar Usuario</h1>
                <div style="margin: 8px 8px 8px 8px;">
                    <form id="Form_SessionSlave" action="./php/queryBBDD.php" method="POST">
                        <input type="hidden" name="Fetch" value="NewSlaveLogin">
                        <div class=ListReg>
                            <p id="IDDocumentostext"></p><input type="hidden" list="IdDocumentos" id="IDDocumentos" placeholder="Busqueda por documento"/>
                        </div>
                        <div class="ListReg">
                            <p id="NicknameUserslavetext">Nickname:</p>
                            <div class="ListReg">
                            <input type="button" class="button" id="LookingForID" value="search"><input type="search" list="IdNicknames" name="NicknameUserslave" id="NicknameUserslave" class="NicknameUsersalaves" placeholder="Digite el nombre"/>
                            </div>
                        </div>
                        <div class="ListReg">
                            <p>Password:</p><input type="password" name="PasswordUserslave" id="PasswordUserslave" class="PasswordUserslaves" placeholder="Contraseña"/>
                        </div>
                        <datalist id="IdNicknames">
                        </datalist>
                        <datalist id="IdDocuments">
                        </datalist>
                    </form>
                </div>
                <div class="ListRegCen">
                    <input type="button" class="button" bg="MenuPrl" animate="both" value="Volver" id="VolverAlert"/>
                    <input type="button" class="button" id="submit" value="Iniciar" matrix="Form_SessionSlave"/>
                </div>
                   `
                for (const [key, value] of Object.entries(this.peticion.response[2])) {
                    IdNicknames.innerHTML+=`<option>${value._PrimerNombre} ${value._OtrosNombres} ${value._NombreDePila} ${value._UltimoNombre}.${value._TipoDeUsuario}</option>`
                    IdDocuments.innerHTML+=`<option>${value.Identificacion}</option>`
                }
                break;
            case 'UserSlaveLogin':
                document.querySelector(`.${this.peticion.query[1]}`).innerHTML +=`hola`
                break;
            case 'NewCheckRegister':
                document.querySelector(this.peticion.response[1]).innerHTML=`
                <div>
                    <h1>Respuesta: </h1>
                </div>
                <div>
                    <div id="FoundError">
                    ${this.peticion.response[2].contenido}
                    </div>
                    <hr>
                    <input type="button" class="button" bg="MenuPrl" animate="both" id="VolverAlert" value="Continuar"/>
                </div>
                `
                if (this.peticion.response[2].error !== "") {
                    console.log(this.peticion.response[2])
                    switch (this.peticion.response[2].CodeError) {
                        case '1062':
                            document.querySelector(`#FoundError`).innerHTML+=`
                            <small><b>ERROR:</b> Contacto registrado duplicado</small>`
                            break;
                        case '1242':
                            document.querySelector('#FoundError').innerHTML+=`
                            <small><b>ERROR:</b> Registro existente</small>
                            `
                            break;
                        case '0000':
                            document.querySelector('#FoundError').innerHTML+=`
                            <small>Ningun error reportado</small>
                            `
                            break
                    
                        default:
                            document.querySelector('#FoundError').innerHTML+=`
                            <small>${this.peticion.response[2].CodeError}-imposible procesar porque ${this.peticion.response[2].error}, ha ocurri</small>
                            `
                            break;
                    }
                } else {
                    document.querySelector(`#FoundError`).innerHTML=`
                    <p>No encontramos ningun error</p>
                    `
                }
                break;
            case 'NewInvalidProcess':
                document.querySelector(this.peticion.response[1]).innerHTML=`
                <div>
                    <h1>Respuesta: </h1>
                </div>
                <div>
                    <small>
                    ${this.peticion.response[2].contenido}<br>
                    ${this.peticion.response[2].CodeError}-${this.peticion.response[2].error}
                    </small>
                    <hr>
                    <input type="button" class="button" bg="Registros" animate="thisOnly" id="VolverAlert" value="Continuar"/>
                    </div>
                    <br>
                `
                break;
            default:
                console.log('swap no encontrado')
                break;
        }
    }
    concatContent(id, swap, Response = null){
        switch (swap) {
            case 'NewArt':
                Response = { listas: [id.childNodes[1], id.childNodes[3]], contenido: [[], []]}
                Response.listas.forEach((e, i) => {
                    Response.listas[i].childNodes.forEach((el, it) => {
                        if (it % 2 !== 0) {
                            Response.contenido[i].push(el)
                        }
                    });
                });
                return Response;
            case "NewCliSlave":
                Response=``, Expression = id.value.toLowerCase();
                for (const [key, value] of Object.entries(this.peticion.response[2])) {
                    if (Response.match(value.Usr_Identificacion.split("C").at(0))) {
                        continue;
                    }
                    if (value._Nickname.toLowerCase().match(Expression) || value.Usr_Identificacion.match(Expression)){
                        Response += `<li class="ListRegActive" MySearch="${key}">${value._Nickname} : ${value.Usr_Identificacion.split("C").at(0)}</li>`
                    }else if(Response === ""){
                        Response = "<p>Cliente no encontrado</p>"
                        for (const [key, value] of Object.entries(this.peticion.response[2])) {
                            Response += `<li class="ListRegActive" MySearch="${key}">${value._Nickname} : ${value.Usr_Identificacion.split("C").at(0)}</li>`
                        }
                    }
                }
                    list_Search.innerHTML = `
                    ${Response}`
                break;
            case "FillSearch":
                let SearchBox = document.querySelector(`#${id.attributes.mysearchbox.value}`)
                SearchBox.value = id.attributes.mysearchvalue.value * 1
                break;

        
            default:
                break;
        }
                
    }
    SearchContent(id, swap){
        setInterval(() => {
            if (id.value!=="") {
                this.concatContent(id, swap)
            }
        }, 1500);
    }
}