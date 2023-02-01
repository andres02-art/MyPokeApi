class FetchResponse{
    constructor(Fetch, ExtraFetch = false) {
        if (ExtraFetch === true) {
            this.IdFetch = document.querySelector(Fetch)
        }else{
            this.fetch = Fetch
            this.response = this.fetch.response[0]
            this.case = this.fetch.query[0]
        }
        switch (this.response) {
            case 'FillContent':
                this.fillContent(this.case)
                break;
            default:
                break;
        }
    }
    fillContent(swap){
        switch (swap) {
            case '__init__db':
                /*
                solicita contenido de las url dadas y lo guarda en @var (array) resultData
                solicita imagen/sprites de las url dadas y lo guarda en @var (array) IMGSresults
                */
                this.mypokeapiconnect = [];
                

                let fetchresults, resultData = [], IMGSresults = [];
                let a = fetch('https://pokeapi.co/api/v2/pokemon/')
                a.then(response=>response.json()).then(data=>{
                    console.log(data);
                })
                console.
                console.log(this.fetch.response[1].results)
                this.fetch.response[1].results.forEach((e, i) =>{
                    this.pokeapiconnect[0][i] = await(fetch(e.url).then(response=>response.json()).then(data=>resultData[i]=data))
                    }
                )
                console.log(resultData)
                resultData.forEach((e, i) =>{
                    fetch(e.forms[0].url).then(response=>response.json()).then(data=>IMGSresults[i]=data)
                    }
                )
                console.log(IMGSresults)
                this.Pokemons = {names: this.fetch.response.results, datas: resultData, imgs: IMGSresults}
                console.log(this.Pokemons)                
                let InitPokeBD = document.createElement('form'), 
                namesPokemons = document.createElement('input'), 
                datasPokemons = document.createElement('input'), 
                imgsPokemons = document.createElement('input');
                InitPokeBD.setAttribute('id', '__init__bd')
                InitPokeBD.setAttribute('method', 'post')
                InitPokeBD.setAttribute('action', './Api/php/Restartbd')
                this.Pokemons.names.forEach((e, i) => {
                    namesPokemons.setAttribute('value', JSON.stringify(e))
                    namesPokemons.setAttribute('name', `_NamesPokemons[${i}]`)
                });
                break;
            case 'init_search':
                console.log(this.fetch)
                break;        
            default:
                break;
        }

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