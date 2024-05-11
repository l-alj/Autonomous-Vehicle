class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.3;
        this.speedLimit = 4;
        this.friction = 0.04;
        this.angle=0;
        this.damaged = false;

        this.borderSensors = new BorderSensors(this);
        this.controller = new Controller();
    }

    update(roadBorders){
        if(!this.damaged){
            this.#move();
            this.shape=this.#createShape();
            this.damaged = this.#assessDamage(roadBorders);
        }
        this.borderSensors.update(roadBorders);
    }

    #assessDamage(roadBorders){
        for(let i=0; i<roadBorders.length; i++){
            if(shapesIntersect(this.shape,roadBorders[i])){
                return true;
            }
        }
        return false;
    }
    #createShape(){
        const coords=[];
        const rad = Math.hypot(this.width, this.height)/2;
        const alpha= Math.atan2(this.width,this.height);
        coords.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        coords.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        coords.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        coords.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return coords;

    }

    #move(){
        if(this.controller.forward){
            this.speed+=this.acceleration;
        }
        if(this.controller.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.speedLimit){
            this.speed=this.speedLimit;
        }
        if(this.speed<-this.speedLimit/2){
            this.speed=-this.speedLimit/2;
        }
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controller.left){
                this.angle+=0.03*flip;
            }
            if(this.controller.right){
                this.angle-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){

        if(this.damaged){
            ctx.fillStyle="red";
        } else{
            ctx.fillStyle="black";
        }

        ctx.beginPath();
        ctx.moveTo(this.shape[0].x, this.shape[0].y);
        for(let i=0; i<this.shape.length; i++){
            ctx.lineTo(this.shape[i].x, this.shape[i].y);
        }
        ctx.fill();
        this.borderSensors.draw(ctx);
        



    }
}