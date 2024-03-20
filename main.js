let des = document.getElementById('des').getContext('2d')

let planta = new Planta(330,260,63,90,'./assets/planta.png')

let tiro = new Tiro (330,260,40,40,'./assets/tiro.png')

let zumbi_1 = new Zumbi(1250,260,90,120,'./assets/zumbidesenhado.png')
let zumbi_2 = new Zumbi(1250,360,90,120,'./assets/zumbidesenhado.png')
let zumbi_3 = new Zumbi(1250,460,90,120,'./assets/zumbidesenhado.png')



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


document.addEventListener("click", (e)=>{
    if(e.key === 'click'){
        tiro = true
    }
  });




function desenha(){
    planta.des_img()

    tiro.des_tiro()

    zumbi_1.des_zumbi()
    zumbi_2.des_zumbi()
    zumbi_3.des_zumbi()
    
}
function atualiza(){
    planta.atual_planta()
    tiro.atual_tiro()
    
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