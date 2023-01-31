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
        }
    }
    fillContent(swap){
        switch (swap) {
            case value:
                
                break;
        
            default:
                break;
        }

/*
solicita contenido de la url pokemon y lo guarda en @var (array) resultfetch
@param (object) fetchContent guarda las caracteristicas de coneccion
let fetchContent = await(
    fetch("https://pokeapi.co/api/v2/pokemon/").then(
        response => response.json()).then(
            data => resultfetch = data)
)
solicita contenido de las url dadas y lo guarda en @var (array) resultData
resultfetch.results.forEach((e, i) =>{
    fetch(e.url).then(
        response=>response.json()).then(
            data=>resultData[i]=data
        )
solicita imagen/sprites de las url dadas y lo guarda en @var (array) IMGSresults
resultData.forEach((e, i) =>{
    fetch(e.forms[0].url).then(
        response=>response.json()).then(
            data=>IMGSresults[i]=data
        )
    }
)
})*/
    }
    concatContent(id, swap, Response = null){
        switch (swap) {
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