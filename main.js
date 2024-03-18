let des = document.getElementById('des').getContext('2d')

let planta = new Planta(330,260,63,90,'./assets/planta.png')
let tiro = new Tiro (330,260,40,40,'./assets/tiro.png')


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
    
}
function atualiza(){
    planta.atual_planta()
    tiro.atual_tiro()
    
}

function main(){
    des.clearRect(0,0,1300,600)
    desenha()
    atualiza()

}

setInterval(main,10)