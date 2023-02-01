class animatedObjs {
//version 0.1
  // esta clase establece en un objeto como la relacion entre dos etiquetas html mediante su atributo class
  // principalmente usada para la animation entre ellas
 constructor(led, background, animate1, animate2, delay) {
  // DEFINE LOS PARAMETROS INICIALES
  if (background===true) {
    this.PreviusAnimates=led
  } else {
    this.nameAnimate = led + background
    this.DefaultAnimate = null
    this.animation = [animate1, animate2];
    this.pantalla = window.document.body.querySelector(`.${led}`);
    this.OldLed = led
    this.fondo = window.document.body.querySelector(`.${background}`);
    this.OldBG = background
    this.retraso = delay * 1000
    this.NaturalStage = ``
    this.nextAnimate = null
    this.invertAnimate = []
    this.modeAnimate = []
    this.animation.forEach((e, i)=>{
      this.invertAnimate[i]=this.invert_ainmation(e)
    })
  }
 }
 invert_ainmation(animation){
  switch (animation) {
    case `natural`:
      return `null`;
    case `apear`:
      return `desapear`;
    case `darken`:
      return `lighten`;
    case `enable`:
      return `disable`;
      

    case `disable`:
      return `enable`;
    case `ligthen`:
      return `darken`;
    case `desapear`:
      return `apear`
    case `null`:
      return `natural`;

    default:
      return null;
  }

 }
 Enddelay_animation(x, y) {
  //  si tiene unretrazo se realiza
   setTimeout(() => {
    let promise = new Promise((resolve)=>{})
    this.end_animate(x, y)
   }, this.delay);
 }
 Stardelay_animation(x, y) {
  //  si tiene unretrazo se realiza
   setTimeout(() => {
    this.start_animate(x,y)
   }, this.delay);
 }
 start_animate(animation, destinate) {
  if (this.pantalla.hasAttribute(`style`)) {
    let backup = this.pantalla.getAttribute(`style`)
    this.pantalla.setAttribute(`class`,
    `${animation} ${destinate}`)
    this.pantalla.setAttribute(`style`,
    backup)
  } else {
    this.pantalla.setAttribute(`class`,
   `${animation} ${destinate}`)
 }}
 end_animate(animation, origin) {
   if (this.fondo.hasAttribute(`style`)) {
    let backup = this.fondo.getAttribute(`style`)
    this.fondo.setAttribute(`class`,
     `${animation} ${origin}`)
     this.fondo.setAttribute(`style`, 
     backup)
  }else{ 
     this.fondo.setAttribute(`class`, 
     `${animation} ${origin}`);
   }
 }
 play_animate(){
   this.start_animate(this.animation[0], this.OldLed)
   if (this.animation[1] !== null) {
     this.Enddelay_animation(this.animation[1], this.OldBG)
    }
  }
  swap_animate(){
    if (this.animation[1] !== null) {
      this.start_animate(this.animation[1], this.OldLed)
    }
    this.Enddelay_animation(this.animation[0], this.OldBG)
  }
  goBack_animate(delay){
    if ((this.animation[1] !== null )) {
      this.end_animate(this.animation[1], this.OldBG)
    }
    let oldDelay = this.delay
    this.delay = delay
    this.Stardelay_animation(this.animation[0], this.OldLed)
    this.delay = oldDelay
  }
  Repeat_animate(x, mode='play'){
    for (let i = 1; i <= x; i++) {
      if (mode == 'play'){
        this.play_animate()
        this.goBack_animate()
      }else{
        this.goBack_animate()
        this.play_animate()
      }
    }
  }
  invertPlay_animate(){
    this.start_animate(this.invertAnimate[0], this.OldLed)
    if(this.invertAnimate[1] !== null){
      this.Enddelay_animation(this.invertAnimate[1], this.OldBG)
    }
  }
  invertswap_animate(){
    if (this.invertAnimate[1] !== null) {
      this.start_animate(this.invertAnimate[1], this.OldLed)
    }
    this.Enddelay_animation(this.invertAnimate[1], this.OldBG)
  }
  invertGoBack_animate(delay){
    if ((this.invertAnimate[1] !== null )) {
      this.end_animate(this.invertAnimate[1], this.OldBG)
    }
    let oldDelay = this.delay
    this.delay = delay
    this.Stardelay_animation(this.invertAnimate[0], this.OldLed)
    this.delay = oldDelay
  }
  invertRepeat_animate(x, mode='invertPlay'){
        for (let i = 1; i <= x; i++) {
      if (mode == 'invertPlay'){
        this.invertPlay_animate()
        this.invertGoBack_animate()
      }else{
        this.invertGoBack_animate()
        this.invertPlay_animate()
      }
    }
  }
  extra_animate(ConcatAnimate, autoplay=false){
    this.nextAnimate = ConcatAnimate
    if (autoplay !== false) {
      this.nextAnimate.play_animate()
    }
  }
  NaturalStage_animate(action=false, view='none', animate=this.animation){
    /* expresa que si no se define ninguna de las variables requeridas
    el programa por defecto ambos objetos irán al estado natural 
    
    de lo contrario si se define la primera, el valor en view
    activara una animation como desencadenamiento*/
    if (view === 'led') {
      this.start_animate(this.NaturalStage, this.OldLed)
    }
    if ( view === 'bg') {
      this.start_animate(this.NaturalStage, this.OldBg)      
    }
    if ( view !== 'bg' || view !== 'led' && view === 'none') {
      this.start_animate(this.NaturalStage, this.OldLed)
      this.end_animate(this.NaturalStage, this.OldBG)
    }
    if (action === true) {
      if (view='bg') {
        this.end_animate(animate[1], this.OldBG)
      } else {
        this.start_animate(animate[0], this.OldLed)
      }
    }
    console.log('No hay estado natural')
  }
  retrive_animates(mode='none', num=1){
    for (let i = 0; i < this.PreviusAnimates.length; i++) {
      let Current_animate = new animatedObjs(this.PreviusAnimates[i].OldLed, this.PreviusAnimates[i].OldBG, this.PreviusAnimates[i].animation[0], this.PreviusAnimates[i].animation[1], this.PreviusAnimates[i].retraso)
      switch (mode) {
        case 'invertReverse':
          Current_animate.invertGoBack_animate()
          break;
        case 'invert':
          Current_animate.invertPlay_animate()
          break;
        case 'reverse':
          Current_animate.goBack_animate()
          break;
        case 'repeat':
          Current_animate.Repeat_animate(num)
          break;
        case 'save':
          Current_animate.play_animate()
          Current_animate.Backup_animate()
          break;
      
        default:
          Current_animate.play_animate()
          break;
      }
    }
  }
  Backup_animate(mode = 'play_animate()', option="save", arraySend=null){
    this.modeAnimate.push(mode) 
    switch (option) {
      case "Delete":
        localStorage.removeItem("LastObjAnimation")
        break;
      case "Reset":
        localStorage.setItem("LastObjAnimation", JSON.stringify([this]))
        break;
      case "Resize":
        let currentStory = JSON.parse(localStorage.getItem("LastObjAnimation")), StoryResult = []
        if (!currentStory) {
          StoryResult = arraySend
        } else {
          arraySend.forEach((ele, i)=> {
              if(currentStory.find(elem=>elem.nameAnimate!==ele.nameAnimate)){
                StoryResult[i] = currentStory.find(e=>e.nameAnimate===ele.nameAnimate)
            }})
        }
        StoryResult.push(this)
        localStorage.setItem("LastObjAnimation", JSON.stringify(StoryResult))
        break;
      default:
        if (localStorage.getItem("LastObjAnimation")) {
          let currentStory = JSON.parse(localStorage.getItem("LastObjAnimation"));
          if(!currentStory.find((e)=>{e!==this}))currentStory.push(this);
          localStorage.setItem("LastObjAnimation", JSON.stringify(currentStory))
        }else{
          localStorage.setItem("LastObjAnimation", JSON.stringify([this]))
        }
        break;
    }
  }
  ChangePage(Page, Position = "none"){
    if (Position === 'led') {
      this.pantalla = document.querySelector(`.${Page}`) 
    } else if (Position === 'bg'){
      this.fondo = document.querySelector(`.${Page}`)
    } else{
      console.log('posicion no encontrada')
    }
  }
  RetrivePages(){
    this.pantalla = document.querySelector(`.${this.OldLed}`);
    this.fondo = document.querySelector(`.${this.OldBG}`);
  }
}
