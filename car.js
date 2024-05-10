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
        this.controller = new Controller();
    }

    update(){
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
        

        this.y-=this.speed;
    }            


    draw(ctx){
        ctx.beginPath();
        ctx.rect(
            this.x-this.width/2, 
            this.y-this.height/2,
            this.width, 
            this.height,

        );
        ctx.fill();
    }
}