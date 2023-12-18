import { useRef } from "react";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { BACKGROUND_SIZE } from "../../../common/constants/backgroundSize";

const BackDropCanvas = () => {
    const canvas = useRef(null);
    
    useEffect(() => {
        const nullableObj = canvas.current;
        if (nullableObj) {
            const ctx = nullableObj.getContext("2d");
            ctx.strokeStyle = "#C8C8C8";
            ctx.lineWidth = 1;
            
            for (let i = 0; i < BACKGROUND_SIZE.height; i += 25) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(ctx.canvas.width, i);
                ctx.stroke();
              }
      
              for (let i = 0; i < BACKGROUND_SIZE.width; i += 25) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, ctx.canvas.height);
                ctx.stroke();
              }
        }
    });
    
    {/* TODO: add dragging motion to update grids as you drag */}
    return (
        <motion.div 
        className="absolute w-full h-full m-0 p-0"
        >
            <canvas id="grid"
            width={BACKGROUND_SIZE.width}
            height={BACKGROUND_SIZE.height}
            ref={canvas}   
            />
        </motion.div>
    );
};

export default BackDropCanvas;