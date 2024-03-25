var canvas = document.getElementById('canvas').getContext("2d")
canvas.imageSmoothingEnabled = false

document.addEventListener("click", (e)=>{
  if(cenaCorrente.click){
    cenaCorrente.click()
  }
});

document.addEventListener("mousemove", (e)=>{
  if(cenaCorrente.movePlanta){
    cenaCorrente.movePlanta(e)
  }
})

let cenaCorrente = {}
function mudaCena(cena){
  cenaCorrente = cena
}



let bullets = 15
let pts = 0

let groupShoot = []
let shoots = {
  draw(){
    groupShoot.forEach((shoot)=>{
      shoot.draw()
    })
  },
  update(){
    groupShoot.forEach((shoot)=>{
      shoot.move()
      if(shoot.x>=1400){
        groupShoot.splice(shoot[0],1)
      }
    })
  },
}

let grupoZumbis = []
let zumbis ={
  time : 0,
  spawZumbi(){
    this.time +=1
    pos_Y = Math.random() *(500 - 80) + 80
    if(this.time>=60){
      grupoZumbis.push(new Zumbi(1400, pos_Y, 120, 120, "assets/zumbidesenhado.png"))
      this.time=0
    }
  },
  destroyZumbi(){
    groupShoot.forEach((shoot)=>{
      grupoZumbis.forEach((zumbi)=>{
        if(shoot.colid(zumbi)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          grupoZumbis.splice(grupoZumbis.indexOf(zumbi),1)
          bullets = 15
          pts += 1
          
        }
      })
    })
  },

  draw(){
    grupoZumbis.forEach((zumbi)=>{
      zumbi.draw()
    })
  },
  update(){
    this.spawZumbi()
    this.destroyZumbi()
    grupoZumbis.forEach((zumbi)=>{
      zumbi.move()
      if(zumbi.x < -100){
        grupoZumbis.splice(grupoZumbis.indexOf(zumbi),1)
        mudaCena(gameOver)
      }
    })
  }
}
let fundo = new Audio('./assets/PvZ_1.wav')
let disparo = new Audio('./assets/Tiro.wav')
let zumbiA = new Audio('./assets/Zumbis.wav')

fundo.volume = 0.6
fundo.loop = true

zumbiA.volume = 0.9

disparo.volume = 0.6

let infinityBg = {
  bg: new Obj(0,0,1300,600,"assets/fundojogo.png"),
  
  draw(){
    this.bg.draw()
    
  },

  moveBg(){
   
  },

}

let menu = {
  
  titulo: new Text("Plantas vs Zumbis"),
  titulo2: new Text("Click para Iniciar"),
  planta: new Obj(30,380,80,120, "assets/planta.png"),
  
  click(){
    mudaCena(game)
  },

  draw(){
    infinityBg.draw()
    this.titulo.draw_text(80,"Tahoma",500,200,"darkolivegreen")
    this.titulo2.draw_text(40,"Verdana",430,400,"white")
    this.planta.draw()
  },
  update(){
    infinityBg.moveBg()
  },
}

let game = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  planta: new Obj(30,200,70,90, "assets/planta.png"),

  click(){
    if(bullets > 0){
      bullets -= 1
      
      groupShoot.push(new Shoot((this.planta.x+60),(this.planta.y+this.planta.height/2)-30,30,30, "assets/tiro.png"))
    }
  },

  movePlanta(event){
    this.planta.x = event.offsetX - 40
    this.planta.y = event.offsetY - this.planta.height/2
  },

  draw(){
    infinityBg.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.planta.draw()
    shoots.draw()
    zumbis.draw()
    
     
  },
  update(){
    infinityBg.moveBg()
    shoots.update()
    zumbis.update()
    this.placar.update_text(pts)
    fundo.play()
    zumbiA.play()
  },
}

let gameOver = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  lbl_game_over: new Text("Game Over"),

  draw(){
    infinityBg.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.lbl_game_over.draw_text(80,"Verdana",400,300,"white")
    som1.pause()
    som3.play()
  },
  update(){
    infinityBg.moveBg()
    this.placar.update_text(pts)
  },

  limpa_cena(){
    pts = 0
    bullets = 15
    grupoZumbis = []
    groupShoot = []    
  },

  click(){
    this.limpa_cena()
    mudaCena(menu)

  }
}

function main(){
  canvas.clearRect(0,0,1300,600)
  cenaCorrente.draw()
  cenaCorrente.update()
  requestAnimationFrame(main)
}

mudaCena(menu)
main()
