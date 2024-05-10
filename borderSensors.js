class BorderSensors{
    constructor(car){
        this.car=car;
        this.beamCount = 15;
        this.beamLength = 150; //sensor cannot see beyond 100 pixel range
        this.beamSpread = Math.PI/2; //45degree angle between the beams
        
        this.beams=[];
        this.readings=[];
    }

    update(roadBorders){
        this.#castBeams();
        this.readings=[];
        for(let i=0; i<this.beams.length; i++){
            this.readings.push(
                this.#getReading(this.beams[i], roadBorders)
            );
        }
    }

    #getReading(beam,roadBorders){
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){
            const touch = getIntersection(
                beam[0],
                beam[1], 
                roadBorders[i][0], 
                roadBorders[i][1]
            );
            if (touch){
                touches.push(touch);
            }
        }
        if (touches.length==0) {
            return null;
        }else{
            const offsets= touches.map(e=>e.offset);
            const minOffset = Math.min(...offsets);//converts array to many values to get min offset
            return touches.find(e=>e.offset==minOffset);
        }

    }
    #castBeams(){
        this.beams=[];
        for(let i = 0; i < this.beamCount; i++){
            const beamAngle=lerp(
                this.beamSpread/2,
                -this.beamSpread/2,
                this.beamCount==1?0.5:i/(this.beamCount-1)
            )+this.car.angle;
            
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
                let end=this.beams[i][1];
                if(this.readings[i]) {
                    end=this.readings[i];
                }

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "yellow";
                ctx.moveTo(this.beams[i][0].x, this.beams[i][0].y);
                ctx.lineTo(end.x, end.y);
                ctx.stroke();


                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeStyle="black";
                ctx.moveTo(
                    this.beams[i][1].x,
                    this.beams[i][1].y
                );
                ctx.lineTo(
                    end.x,
                    end.y
                );
                ctx.stroke();
            }
        }        
    }