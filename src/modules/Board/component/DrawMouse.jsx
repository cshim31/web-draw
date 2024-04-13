import { useState } from "react";
import { useContext } from "react";
import { motion } from 'framer-motion';
import { DrawContext } from "../../Context/DrawContext";
import { BACKGROUND_SIZE } from "../../../common/constants/backgroundSize";
import useDraw from "../../hooks/useDraw";

/*
    Creates a layer for drawing on screen

    ref: https://codepen.io/mfosker/pen/ZYgoqG
*/
/*
    records user draw actions for 0.3 seconds
{
    mode (draw, image, erase, clear): {
        x: [],
        y: [],
        canvasProps: CanvasRenderingContext2D,
    },
}
*/


const DrawMouse = () => {

    const { drawLayer, drawCanvasRef } = useContext(DrawContext);
    const [isDragging, setDragging] = useState(false);

    const {
        handleEndDraw,
        handleStartDraw,
        drawLine,
        addMove,
        setMouseDown,
        movedX,
        movedY,
        isMouseDown
    } = useDraw();
    
    return (
       <div className="absolute w-full h-full top-0 left-0 z-0"
       ref={drawLayer}
       >
        <motion.canvas
            drag={isDragging} 
            onMouseDown={(e) => {
                if (e.button !== 0) return;
                
                setMouseDown(true);
                handleStartDraw(e);
                drawLine(movedX[movedX.length-1], movedY[movedY.length-1], e.pageX, e.pageY);
            }}
            onMouseUp={(e) => {
                if (e.button !== 0) return;
                
                drawLine(movedX[movedX.length-1], movedY[movedY.length-1], e.pageX, e.pageY);
                setMouseDown(false);
                handleEndDraw(e);
            }}
            onMouseMove={(e) => {
                if (!isMouseDown) return;
                drawLine(movedX[movedX.length-1], movedY[movedY.length-1], e.pageX, e.pageY);
                addMove(e.pageX, e.pageY);
            }}
            width={BACKGROUND_SIZE.width}
            height={BACKGROUND_SIZE.height}
            ref={drawCanvasRef}
        />
        </div>
    );
};

export default DrawMouse;