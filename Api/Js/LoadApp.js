class LoadPokeApi{
    constructor(Load) {
        this.App=Load
        this.SetInnerSize()
        this.OnLoad()
        this.cilckevent()
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
        })
    }
}