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
        let img = new Image()
        img.src = this.a 
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }
    
}

class Planta extends Obj{
    move = 0

    des_planta(){
        des.beginPath()
        des.moveTo(this.x,this.y)
        des.lineTo(this.x+50,this.y)
        des.lineTo(this.x+40,this.y-50)
        des.lineTo(this.x+50,this.y-10)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'blue'
        des.fillStyle = this.a
        des.stroke()
        des.fill()


    }
    atual_planta(){

    }
    point(objeto){
        
    }
    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&(this.x + this.w > objeto.x)&&(this.y < objeto.y + objeto.h)&&(this.y + this.h > objeto.y)){
            return true
        }else{
            return false
        }
    }

}

class inimigo{
    des_zumbi(){
        des.beginPath()
        des.moveTo(this.x,this.y)
        des.lineTo(this.x+50,this.y)
        des.lineTo(this.x+40,this.y-50)
        des.lineTo(this.x+50,this.y-10)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'blue'
        des.fillStyle = this.a
        des.stroke()
        des.fill()
    }

    atual_zumbi(){

    
     }
     recomeca(){
        
     }
}

class Tiro extends Obj{
    des_tiro(){
        des.fillStyle = this.a
        des.fillRect = (this.x, this.y, this.w, this.h)
    }
    atual_tiro(){
        this.x -= 10
    }
}
class colid_projetil extends Obj(){
    move(){
        this.x +=10
      }

}


class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    
    }
}
