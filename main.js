var canvas = document.getElementById('canvas').getContext("2d")
canvas.imageSmoothingEnabled = false

document.addEventListener("click", (e)=>{
  if(cenaCorrente.click){
    cenaCorrente.click()
  }
});

document.addEventListener("mousemove", (e)=>{
  if(cenaCorrente.moveHeroi){
    cenaCorrente.moveHeroi(e)
  }
})

let cenaCorrente = {}
function mudaCena(cena){
  cenaCorrente = cena
}

let som1 = new Audio("assets/batalha.wav")
let som2 = new Audio("assets/flecha.mp3")
let som3 = new Audio("assets/game-over.wav")
let som4 = new Audio("assets/hit-impact.ogg")
let som5 = new Audio("assets/dark-forest.mp3")

let bullets = 5
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

let groupOrcs = []
let orcs ={
  time : 0,
  spawOrcs(){
    this.time +=1
    // size_X = Math.random() * (100 - 80) + 80
    // size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() *(500 - 80) + 80
    if(this.time>=60){
      groupOrcs.push(new Orcs(1400, pos_Y, 150, 150, "assets/zumbidesenhado.png"))
      this.time=0
    }
  },
  destroyOrcs(){
    groupShoot.forEach((shoot)=>{
      groupOrcs.forEach((orc)=>{
        if(shoot.collide(orc)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupOrcs.splice(groupOrcs.indexOf(orc),1)
          bullets = 5
          pts += 1
          som4.play()
        }
      })
    })
  },

  draw(){
    groupOrcs.forEach((orc)=>{
      orc.draw()
    })
  },
  update(){
    this.spawOrcs()
    this.destroyOrcs()
    groupOrcs.forEach((orc)=>{
      orc.move()
      if(orc.x < -100){
        groupOrcs.splice(groupOrcs.indexOf(orc),1)
        mudaCena(gameOver)
      }
    })
  }
}

let infinityBg = {
  bg: new Obj(0,0,1300,600,"assets/fundojogo.png"),
  bg2: new Obj(-1300,0,1300,600,"assets/fundo2.png"),
  bg3: new Obj(-2600,0,1300,600,"assets/fundo.png"),

  draw(){
    this.bg.draw()
    
  },

  moveBg(){
    // this.bg.x +=1
    // this.bg2.x +=1
    // this.bg3.x +=1

    // if(this.bg.x >= 2600){
    //   this.bg.x = 0
    // }
    // if(this.bg2.x >= 1300){
    //   this.bg2.x = -1300
    // }
    // if(this.bg3.x >= 0){
    //   this.bg3.x = -2600
    // }
  },

}

let menu = {
  
  titulo: new Text("ORCs"),
  titulo2: new Text("Click para Iniciar"),
  heroi: new Obj(30,380,80,120, "assets/planta.png"),
  
  click(){
    mudaCena(game)
  },

  draw(){
    infinityBg.draw()
    this.titulo.draw_text(80,"Tahoma",500,200,"darkolivegreen")
    this.titulo2.draw_text(40,"Verdana",430,400,"white")
    this.heroi.draw()
  },
  update(){
    infinityBg.moveBg()
  },
}

let game = {
  placar_txt: new Text("Pontos: "),
  placar: new Text(pts),
  heroi: new Obj(30,200,80,120, "assets/planta.png"),

  click(){
    if(bullets > 0){
      bullets -= 1
      som2.play()
      groupShoot.push(new Shoot((this.heroi.x+60),(this.heroi.y+this.heroi.height/2)-30,30,30, "assets/tiro.png"))
    }
  },

  moveHeroi(event){
    this.heroi.x = event.offsetX - 40
    this.heroi.y = event.offsetY - this.heroi.height/2
  },

  draw(){
    infinityBg.draw()
    this.placar_txt.draw_text(30,"Tahoma",1100,50,"white")
    this.placar.draw_text(30,"Tahoma",1210,50,"white")
    this.heroi.draw()
    shoots.draw()
    orcs.draw()
    som1.play()
    som3.pause()    
  },
  update(){
    infinityBg.moveBg()
    shoots.update()
    orcs.update()
    this.placar.update_text(pts)
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
    bullets = 5
    groupOrcs = []
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
