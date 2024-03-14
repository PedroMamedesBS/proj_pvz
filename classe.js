class Obj{
    constructor(x,y,w,h,a){
        this.x = x 
        this.y = y 
        this.w = w 
        this.h = h
        this.a = a
    }
    des_obj(){
        des.fillStyle = this.a
        des.fillRect(this.x,this.y,this.w,this.h)
    }
    des_img(){
        
    }
}

class Planta extends Obj{
    des_planta(){
        des.beginPath()
        des.moveTo(this.x,this.y)
        des.lineTo(this.x+50,this.y)
        des.lineTo(this.x+40,this.y-50)
        des.lineTo(this.x+10,this.y-50)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'blue'
        des.fillStyle = this.a
        des.stroke()
        des.fill()


    }
    atual_planta(){

    }
    ponto(objeto){

    }
    colid(objeto){
        
    }

}

class inimigo{
    des_zumbi(){
        
    }

    atual_zumbi(){

    
     }
     recomeca(){
        
     }
}

class Tiro{
    des_tiro(){
        
    }
    atual_tiro(){
    
    }
    colid_projetil(){

    }
}
