class BorderSensors{
    constructor(car){
        this.car=car;
        this.beamCount = 3;
        this.beamLength = 100; //sensor cannot see beyond 100 pixel range
        this.beamSpread = Math.PI/4; //45degree angle between the beams
        
        this.beams=[];
    }

    update(){
        this.beams=[];
        for(let i = 0; i < this.beamCount; i++){
            const beamAngle=lerp(
                this.beamSpread/2,
                -this.beamSpread/2,
                i/(this.beamCount-1)
            );
            
            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x -
                    Math.sin(beamAngle)*this.beamLength,       
                y:this.car.y -
                    Math.cos(beamAngle)*this.beamLength            
            }; 
            this.beams.push([start, end]);           
        }
    }
        draw(ctx) {
            for (let i = 0; i < this.beamCount; i++) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "yellow";
                ctx.moveTo(this.beams[i][0].x, this.beams[i][0].y);
                ctx.lineTo(this.beams[i][1].x, this.beams[i][1].y);
                ctx.stroke();
            }
        }
    }