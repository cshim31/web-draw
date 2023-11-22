import { useRef, useState } from "react";
import { useMouse } from "react-use";
import { useEffect } from "react";
import { motion } from 'framer-motion';

/*
    Creates a layer for drawing on screen

    ref: https://codepen.io/mfosker/pen/ZYgoqG
*/

let movedX = [];
let movedY = [];

const Modes = {
    Default: 0,
    Pen: 1,
    Erase: 2
}

const DrawMouse = () => {

    const canvas = useRef(null);
    const {docX, docY, posX, posY, elX, elY, elW, elH} = useMouse(canvas); //??? what is ref used for
    const [isDragging, setDragging] = useState(false);
    const  [isMouseDown, setMouseDown] = useState(false);
    const [mode, setMode] = useState(Modes.Pen);

    let ctx = canvas.current?.getContext("2d");
    

    useEffect(() => {
        ctx = canvas.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        switch (mode) {
            case Modes.Default:
                break;
            case Modes.Pen:
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 10;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.globalCompositeOperation="source-over";
                break;
            case Modes.Erase:
                ctx.lineWidth = 30;
                ctx.globalCompositeOperation="destination-out";
            default:
                break;
        }
    });

    /*

    */
    function handleStartDraw(e) {
        movedX.push(e.clientX);
        movedY.push(e.clientY);
        return ;
    }

    /*

    */
    function handleEndDraw(e) {
        movedX = [];
        movedY = [];
        return ;
    }


    function drawLine(x,y) {
        if (!ctx || !isMouseDown) {
            return;
        }

        
        ctx.beginPath();
        ctx.lineTo(movedX[movedX.length-1],movedY[movedY.length-1]);
        //console.log("from: x: %s y: %s",movedX[movedX.length-1],movedY[movedY.length-1]);
        ctx.lineTo(x, y);
        //console.log("to x: %s y: %s", x,y);
        ctx.stroke();
        ctx.closePath();

        movedX.push(x);
        movedY.push(y);
        

        return ;
    }

    return (
       <div className="absolute w-full h-full top-0 left-0">
        <motion.canvas
            drag={isDragging} 
            onMouseDown={(e) => {
                if (e.button === 0) {
                    setMouseDown(true);
                    handleStartDraw(e);
                    drawLine(e.clientX, e.clientY);
                } 
            }}
            onMouseUp={(e) => {
                if (e.button === 0) {
                    drawLine(e.clientX, e.clientY);
                    setMouseDown(false);
                    handleEndDraw(e);
                }
            }}
            onMouseMove={(e) => {
                drawLine(e.clientX, e.clientY);
            }}
            width={2000}
            height={2000}
            ref={canvas}
        >
        </motion.canvas>
        </div>
    );
};

export default DrawMouse;