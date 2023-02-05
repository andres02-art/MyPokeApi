class LoadPokeApi{
    //
//version 0.1
    constructor(Load) {
        this.App=Load
        this.BasicViewLogView = new animatedObjs('LogView', 'BasicView', 'apear', 'darken', 3)
        this.BasicViewPokemonView = new animatedObjs('PokemonView', 'BasicView', 'apear', 'desapear', 0)
        this.ViewLogBasicView = new animatedObjs('LogView', 'BasicView', 'desapear', 'desapear', 0)
        this.AlertPopupPopup = new animatedObjs('PopupView', 'PopupView', 'enable', 'enable', 0)
        this.fetchresponse = {response: [], query: [], sendfetch: ()=>{new FetchResponse(this.fetchresponse)}}
        this.LookForStorage()
        this.alertLog()
        this.bbddRelog()
        this.SetInnerSize()
        this.OnLoad()
        this.cilckevent()
    }

    LookForStorage(){
        let Lastfetch = JSON.parse(this.App.Storage.getItem(`LastFetchQuery`)), Lastanimations = JSON.parse(this.App.Storage.getItem(`LastObjAnimation`)), backupAnimations;
        if (Lastanimations) {
            backupAnimations = new animatedObjs(Lastanimations, true)
            backupAnimations.retrive_animates()
        }
        if (Lastfetch) {
            this.fetchresponse.response = Lastfetch.response
            this.fetchresponse.query = Lastfetch.query
            this.fetchresponse.sendfetch()
            localStorage.removeItem(`LastFetchQuery`)
            localStorage.removeItem(`LastObjAnimation`)
            this.App.Storage = null
        }
    }

    UpdatePokemons(x){
        let UpdatePokemons = document.createElement("form")
        UpdatePokemons.setAttribute("method", "POST")
        UpdatePokemons.setAttribute("action", "./Api/php/Restartbd.php")
        UpdatePokemons.setAttribute("id", x)
        UpdatePokemons.append(document.createElement("input"))
        UpdatePokemons.children[0].setAttribute("name", "Pokemon")
        UpdatePokemons.children[0].setAttribute("value", "true")
        UpdatePokemons.children[0].setAttribute("type", "hidden")
        UpdatePokemons.append(document.createElement("input"))
        UpdatePokemons.children[1].setAttribute("name", "_request")
        UpdatePokemons.children[1].setAttribute("value", "fetch_Content")
        UpdatePokemons.children[1].setAttribute("type", "texbox")
        console.log(UpdatePokemons)
        window.document.body.appendChild(UpdatePokemons)
        window.document.querySelector(`#${x}`).submit()
    }

    LogUser(x){
        let inputactivity = document.createElement("input")
        inputactivity.setAttribute("name", "Activity")
        inputactivity.setAttribute("value", x)
        document.querySelector('#LogView').appendChild(inputactivity)
        document.querySelector('#LogView').submit()
    }

    alertLog(){
     //   this.AlertPopupPopup.play_animate()
        
    }

    bbddRelog(){
        if (this.App.databasePoke !== true) {
            this.fetchresponse.response = ['FillContent', this.App.bdpokemons]
            this.fetchresponse.query = ['__init__db']
            document.addEventListener('loadeddata', this.fetchresponse.sendfetch())
        }
    }

    LogViewForm(){

    }

    SearchPokemon(x, y){
        switch (x) {
            case 'BasicView':
                this.BasicViewPokemonView.play_animate()
                break;
            case 'LogView':
                this.BasicViewLogView.extra_animate(this.ViewLogBasicView, true)
                this.BasicViewPokemonView.play_animate()
                break;
            default:
                break;
        }
        this.fetchresponse.response=['FillContent', y]
        this.fetchresponse.query=['init_search', this.App.bdpokemons ]
        this.fetchresponse.sendfetch()
    }
    
    logInUser(){
        this.BasicViewLogView.play_animate()
        document.querySelector('#background').attributes.src.value = './Assets/Img/pngs/MyPokeApiGray.png'
    }

    BackBasicView(x){
       switch (x) {
        case 'LogView':
            this.BasicViewLogView.NaturalStage_animate()
            document.querySelector('#background').attributes.src.value = './Assets/Img/pngs/MyPokeApi.png'
            break;
        case 'PokemonView':
            this.BasicViewPokemonView.NaturalStage_animate()
            document.querySelector('#background').attributes.src.value = './Assets/Img/pngs/MyPokeApi.png'
            break;
       
        default:
            break;
       } 
    }

    SetInnerSize(){
        document.querySelector('.BasicView').setAttribute('style', `height: ${this.App.height}px; Width: ${this.App.width}px`)
        document.querySelector('.PokemonView').setAttribute('style', `height: ${this.App.height}px; Width: ${this.App.width}px`)
    }

    OnLoad(){
        if (!this.App.logInBool) {
            console.log("sesion no existente")
        }
    }
    
    cilckevent(){
        document.addEventListener('click', (ev)=>{
            if (tg(ev, '#BVLogInUser')) this.logInUser()
            else if (tg(ev, '#CBBasicView')) this.BackBasicView(ev.target.attributes.myled.value)
            else if (tg(ev, '#SearchPokemonb')) this.SearchPokemon(ev.target.attributes.myled.value, document.querySelector('#pokemonSearchb').value)
            else if (tg(ev, '#FetchPokemons')) this.UpdatePokemons('ReStarPokemons')
            else if (tg(ev, '#RegisterUser')) this.LogUser(ev.target.attributes.active.value)
            else if (tg(ev, '#LogInUser')) this.LogUser(ev.target.attributes.active.value)
            else if (tg(ev, '#RecoveryUser')) this.LogUser(ev.target.attributes.active.value)
        })
    }
}