class LoadPokeApi{
    constructor(Load) {
        this.App=Load
        this.BasicViewLogView = new animatedObjs('LogView', 'BasicView', 'apear', 'darken', 3)
        this.BasicViewPokemonView = new animatedObjs('PokemonView', 'BasicView', 'apear', 'desapear', 0)
        this.ViewLogBasicView = new animatedObjs('LogView', 'BasicView', 'desapear', 'desapear', 0)
        this.SetInnerSize()
        this.OnLoad()
        this.cilckevent()
    }

    SearchPokemon(x){
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
            if (tg(ev, '#LogInUser')) this.logInUser()
            else if (tg(ev, '#CBBasicView')) this.BackBasicView(ev.target.attributes.myled.value)
            else if (tg(ev, '#SearchPokemon')) this.SearchPokemon(ev.target.attributes.myled.value)
        })
    }
}