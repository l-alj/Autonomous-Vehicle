class Car{
    constructor(x,y,width,height, controlType, speedLimit = 4){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.3;
        this.speedLimit = speedLimit;
        this.friction = 0.04;
        this.angle=0;
        this.damaged = false;

        if(controlType!="DUMMY"){
            this.borderSensors = new BorderSensors(this);
            this.brain=new NeuralNetwork(
                [this.borderSensors.beamCount,6,4]
            );
        }
        this.controller = new Controller(controlType);
    }

    update(roadBorders,traffic){
        if(!this.damaged){
            this.#move();
            this.shape=this.#createShape();
            this.damaged = this.#assessDamage(roadBorders,traffic);
        }
        if (this.borderSensors){ 
            this.borderSensors.update(roadBorders,traffic);
            const offsets = this.borderSensors.readings.map(
                s=>s==null ? 0 : 1-s.offset
            );
            const outputs=NeuralNetwork.feedForward(offsets,this.brain);
            console.log(outputs);  
            if(this.useBrain){
                this.controls.forward=outputs[0];
                this.controls.left=outputs[1];
                this.controls.right=outputs[2];
                this.controls.reverse=outputs[3];
            }
        }
    }

    #assessDamage(roadBorders,traffic){
        for(let i=0; i<roadBorders.length; i++){
            if(shapesIntersect(this.shape,roadBorders[i])){
                return true;
            }
        }
        for(let i=0; i<traffic.length; i++){
            if(shapesIntersect(this.shape,traffic[i].shape)){
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

    draw(ctx, color){

        if(this.damaged){
            ctx.fillStyle="red";
        } else{
            ctx.fillStyle=color;
        }

        ctx.beginPath();
        ctx.moveTo(this.shape[0].x, this.shape[0].y);
        for(let i=1; i<this.shape.length; i++){
            ctx.lineTo(this.shape[i].x, this.shape[i].y);
        }
        ctx.fill();

        if(this.borderSensors){
            this.borderSensors.draw(ctx);
        }
        



    }
}