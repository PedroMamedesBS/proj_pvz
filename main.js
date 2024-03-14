let des = document.getElementById('des').getContext('2d')

let planta = new Planta(330,260,63,90,'./assets/planta.png')




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