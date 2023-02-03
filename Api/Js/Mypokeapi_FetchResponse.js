class FetchResponse{
//version 0.1
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
                this.Pokemons = {names: [], datas: [], imgs: []}
                let fetchresult;
                fetchresult = this.fetch.response[1].results.forEach((e, i) =>{
                    fetch(e.url).then(response=>response.json()).then((data) =>{
                        this.Pokemons.names.push(e)
                        this.Pokemons.datas.push(data)
                        fetch(data.forms[0].url).then(response=>response.json()).then((imgsdata)=>{
                            this.Pokemons.imgs.push(imgsdata)
                            if (this.Pokemons.imgs.length === 20) {
                                this.fillContent('pokemonsbd')                                
                            }
                        }).catch((err)=>console.log(err))
                    }).catch((er)=>console.log(er))
                    })
                //console.log(this.mypokefetch)
                break;
            case 'init_search':
                console.log(this.fetch)
                break;        
            case 'pokemonsbd':
                console.log(this.Pokemons)
                let InitPokeBD = document.createElement('form'), 
                namesPokemons = [], 
                datasPokemons = document.createElement('input'), 
                imgsPokemons = document.createElement('input');
                InitPokeBD.setAttribute('id', '__init__bd')
                InitPokeBD.setAttribute('method', 'post')
                InitPokeBD.setAttribute('action', './Api/php/Restartbd')
                this.Pokemons.names.forEach((e, i) => {
                    namesPokemons[i] = document.createElement('input')
                    namesPokemons[i].setAttribute('value', JSON.stringify(e))
                    namesPokemons[i].setAttribute('name', `_NamesPokemons[${i}]`)
                    namesPokemons[i].setAttribute('id', `myPoke${i}`)
                    namesPokemons[i].setAttribute('type', 'hidden')
                    InitPokeBD.append(namesPokemons[i])
                });
                console.log(InitPokeBD)
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