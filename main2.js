let des = document.getElementById('des').getContext('2d')

// let bg1 = new BG(0,0,500,700,'assets/background.jpg')
// let bg2 = new BG(0,-700,500,700,'assets/background2.jpg')
// let bg3 = new BG(0,-1400,500,700,'assets/background.jpg')
// let bg4 = new BG(0,-2100,500,700,'assets/background2.jpg')
let planta = new Planta(200,620,50,70,'assets/nave.png')
let txt_pts = new Text()
let pts = new Text()
let txt_vidas = new Text()
let n_vidas = new Text()
// const som1 = new Audio('assets/nave_som.mp3')
// const som2 = new Audio('assets/batida.mp3')


let grupoTiros = [] 
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
        })
    },
    atual(){
        grupoTiros.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y <= -10){
                grupoTiros.splice(tiro[0],1)
            }
        })
    }
}

let groupZumbis = []
let Zumbi ={
  time : 0,
  spawZumbi(){
    this.time +=1
    // size_X = Math.random() * (100 - 80) + 80
    // size_Y = Math.random() * (140 - 80) + 80
    pos_Y = Math.random() *(500 - 80) + 80
    if(this.time>=60){
      groupZumbis.push(new Zumbi(1400, pos_Y, 150, 150, "assets/zumbidesenhado.png"))
      this.time=0
    }
  },
  destroyZumbis(){
    groupShoot.forEach((shoot)=>{
      groupZumbis.forEach((zumbi_1)=>{
        if(shoot.collide(zumbi_1)){
          groupShoot.splice(groupShoot.indexOf(shoot),1)
          groupZumbis.splice(groupZumbis.indexOf(zumbi_1),1)
          bullets = 5
          pts += 1
          som4.play()
        }
      })
    })
  },

  draw(){
    groupZumbis.forEach((zumbi_1)=>{
      zumbi_1.draw()
    })
  },
  update(){
    this.spawZumbi()
    this.destroyZumbis()
    groupZumbis.forEach((zumbi_1)=>{
      zumbi_1.move()
      if(zumbi_1.x < -100){
        groupZumbis.splice(groupZumbis.indexOf(zumbi_1),1)
        mudaCena(gameOver)
      }
    })
  }
}

document.addEventListener('keydown', (ev)=>{
    if(ev.key === 'w'){
        nav1.dir -=10
    }
    if(ev.key === 's'){
        nav1.dir +=10
    }   
})
document.addEventListener('keyup', (ev)=>{
    if(ev.key === 'w'){
        nav1.dir = 0
    }
    if(ev.key === 's'){
        nav1.dir = 0
    }
})
document.addEventListener('click', (ev)=>{
    
        grupoTiros.push(new Tiro(planta.x - 4 + planta.w / 2, planta.y, 8, 16, 'tiro.png'))
        // console.log(grupoTiros)
    
    // som1.play()
})

function colisao(){
    grupoDiscos.forEach((disc)=>{
        if(planta.colid(disc)){
            grupoDiscos.splice(grupoDiscos.indexOf(disc), 1)
            nav1.vida -=1
        }
    })
}

function desenha(){    
    // bg1.des_obj()
    // bg2.des_obj()
    // bg3.des_obj()
    // bg4.des_obj()    
    planta.des_obj()    
    tiros.des()
    discos.des()
    txt_pts.des_text('Pontos:',20,40,'white','30px Times')
    pts.des_text(nav1.pts,120,40,'white','30px Times')
    txt_vidas.des_text('Vidas:',380,40,'white','30px Times')
    n_vidas.des_text(nav1.vida,460,40,'white','30px Times')
}

function atualiza(){
    // bg1.mov(0,2100)
    // bg2.mov(-700,1400)
    // bg3.mov(-1400,700)
    // bg4.mov(-2100,0)    
    planta.mov()
    tiros.atual()
    discos.atual()
    colisao()    
}

function main(){
    des.clearRect(0,0,500,700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()