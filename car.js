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
        this.controller = new Controller();
    }

    update(){
        this.#move();
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
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            this.x-this.width/2, 
            this.y-this.height/2,
            this.width, 
            this.height,

        );
        ctx.fill();
        ctx.restore();
    }
}