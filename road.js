class Road{
    constructor(x, width, numOfLanes=3){
        this.x = x;
        this.width = width;
        this.numOfLanes = numOfLanes;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
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
                ctx.setLineDash([15,15]);
            }else{
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }  
    }
}

