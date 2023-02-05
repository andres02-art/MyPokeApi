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
                datasPokemons = [], 
                imgsPokemons = [], 
                abilitiesPokemons = [], 
                UrlsPokemons=[];
                InitPokeBD.setAttribute('id', '__init__bd')
                InitPokeBD.setAttribute('method', 'post')
                InitPokeBD.setAttribute('action', './Api/php/Restartbd.php')
                this.Pokemons.names.forEach((e, i) => {
                    namesPokemons[i] = document.createElement('input')
                    namesPokemons[i].setAttribute('value', (e.name))
                    namesPokemons[i].setAttribute('name', `_NamesPokemons[${i}]`)
                    namesPokemons[i].setAttribute('id', `myPoke${i}`)
                    namesPokemons[i].setAttribute('type', 'hidden')
                    InitPokeBD.append(namesPokemons[i])
                    UrlsPokemons[i] = document.createElement('input')
                    UrlsPokemons[i].setAttribute('value', JSON.stringify(e))
                    UrlsPokemons[i].setAttribute('name', `_UrlsPokemons${i}`)
                    UrlsPokemons[i].setAttribute('id', `myPoke${i}`)
                    UrlsPokemons[i].setAttribute('type', 'hidden')
                    InitPokeBD.append(UrlsPokemons[i])
                });
                this.Pokemons.datas.forEach((e,i)=>{
                    datasPokemons[i] = document.createElement('input') 
                    datasPokemons[i].setAttribute('value', JSON.stringify(e))
                    datasPokemons[i].setAttribute('name', `_DescriptionPokemons${i}`)
                    datasPokemons[i].setAttribute('id', `myPokeData${i}`)
                    datasPokemons[i].setAttribute('type', 'hidden')
                    InitPokeBD.append(datasPokemons[i])
                    abilitiesPokemons[i] = document.createElement('input')
                    abilitiesPokemons[i].setAttribute('value', JSON.stringify(e.abilities))
                    abilitiesPokemons[i].setAttribute('name', `_Abilities${i}`)
                    abilitiesPokemons[i].setAttribute('id', `myPokeAbi${i}`)
                    abilitiesPokemons[i].setAttribute('type', 'hidden')
                    InitPokeBD.append(abilitiesPokemons[i])
                })
                this.Pokemons.imgs.forEach((e,i) =>{
                    imgsPokemons[i] = document.createElement('input')
                    imgsPokemons[i].setAttribute('value',  JSON.stringify(e.sprites))
                    imgsPokemons[i].setAttribute('name', `_ImgsPokemons${i}`)
                    imgsPokemons[i].setAttribute('id', `myPokeImg${i}`)
                    imgsPokemons[i].setAttribute('type', 'hidden')
                    InitPokeBD.append(imgsPokemons[i]) 
                })
                document.body.appendChild(InitPokeBD)
                InitPokeBD.submit()
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