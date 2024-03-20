let des = document.getElementById('des').getContext('2d')

let planta = new Planta(330,260,63,90,'./assets/planta.png')

// let tiro = new Tiro (330,260,40,40,'./assets/tiro.png')

let zumbi_1 = new Zumbi(1250,260,90,120,'./assets/zumbidesenhado.png')
let zumbi_2 = new Zumbi(1250,360,90,120,'./assets/zumbidesenhado.png')
let zumbi_3 = new Zumbi(1250,460,90,120,'./assets/zumbidesenhado.png')

let bullets = 15

let grupoTiros = [] 
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des()
        })
    },
    atual(){
        grupoTiros.forEach((tiro)=>{
            tiro.atual_tiro()
            if(tiro.x >= 1300){
                grupoTiros.splice(tiro[0],1)
            }
        })
    }
}



document.addEventListener('keydown', (e)=>{
    if(e.key === 'w'){
        planta.move -= 10
    }else if(e.key === 's'){
        planta.move += 10
    }
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'w'){
        planta.move = 0
        }else if(e.key === 's'){
         planta.move = 0
    }
})


// document.addEventListener("keypress", (e)=>{
//     if(e.key === 'l'){
//         grupoTiros.push(new Tiro(this.planta.x,(this.planta.y+ this.planta.h/2), -30, 18, 8, './assets/tiro.png'))
//     }
//   });
click(){
    if(bullets > 0){
        bullets -= 1
       grupoTiros.push(new Tiro(this.heroi.x,(this.heroi.y+this.heroi.h/2)-30,18,8, "assets/tiro.png"))
    }

}
function desenha(){
    //planta
    planta.des_img()

    //tiro
    tiros.des()

    // zumbis
    zumbi_1.des_img()
    zumbi_2.des_img()
    zumbi_3.des_img()
    
}
function atualiza(){
    //planta
    planta.atual_planta()
    //tiro
    tiros.atual()
    
    //zumbis
    zumbi_1.atual_zumbi()
    zumbi_2.atual_zumbi()
    zumbi_3.atual_zumbi()
    

}


function main(){
    des.clearRect(0,0,1300,600)
    desenha()
    atualiza()

}

setInterval(main,10)