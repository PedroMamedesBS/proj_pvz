let des = document.getElementById('des').getContext('2d')

let planta = new Planta(330,260,63,90,'./assets/planta.png')

let grupoTiros = []
let tiros = {
    des() {
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

function desenha(){
    planta.des_img()
}
function atualiza(){

}

function main(){
    des.clearRect(0,0,500,700)
    desenha()
    atualiza()

}

setInterval(main,10)