class Road{
    constructor(x, width, numOfLanes=4){
        this.x = x;
        this.width = width;
        this.numOfLanes = numOfLanes;

        this.left = x-width/2;
        this.right = x+width/2;

        const infinity=1000000;
        this.top = infinity;
        this.bottom = infinity;

    }

    draw(ctx){
        ctx.lineWidth =6;
        ctx.strokeStyle = "white";

        for(let i=0; i<=this.numOfLanes; i++){
            //linear interpolation
            const x = lerp(
                this.left,
                this.right,
                i/this.numOfLanes
            );
            if (i>0 && i<this.numOfLanes){
                ctz.setLineDash([15,15]);
            ctx.beginPath();
            ctx.moveTo(this.right, this.top);
            ctx.lineTo(this.right, this.bottom);
            ctx.stroke();
            }
        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.stroke();
        }    
    }
}

