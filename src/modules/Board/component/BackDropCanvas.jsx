import { useRef } from "react";
import { useEffect } from "react";

const BackDropCanvas = () => {
    const canvas = useRef(null);
    
    useEffect(() => {
        const nullableObj = canvas.current;
        if (nullableObj) {
            const ctx = nullableObj.getContext("2d");
            ctx.strokeStyle = "#C8C8C8";
            ctx.lineWidth = 1;
            
            for (let i = 0; i < 2000; i += 25) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(ctx.canvas.width, i);
                ctx.stroke();
              }
      
              for (let i = 0; i < 2000; i += 25) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, ctx.canvas.height);
                ctx.stroke();
              }
        }
    });
    
    return (
        <div className="absolute w-full h-full m-0 p-0 overflow-hidden">
            <canvas id="grid"
                    width={2000}
                    height={2000}
                    ref={canvas}   
            />
        </div>
    );
};

export default BackDropCanvas;