import { useRef, useState } from "react";
import { useMouse } from "react-use";
import { useEffect,useContext } from "react";
import { motion } from 'framer-motion';
import { DrawContext } from "../../Context/DrawContext";
import { BACKGROUND_SIZE } from "../../../common/constants/backgroundSize";
import { socket } from "../../../common/lib/socket";

/*
    Creates a layer for drawing on screen

    ref: https://codepen.io/mfosker/pen/ZYgoqG
*/

let movedX = [];
let movedY = [];



const DrawMouse = () => {

    const { drawLayer, mode, setMode, drawCanvasRef } = useContext(DrawContext);
    const {docX, docY, posX, posY, elX, elY, elW, elH} = useMouse(drawCanvasRef); //??? what is ref used for
    const [isDragging, setDragging] = useState(false);
    const  [isMouseDown, setMouseDown] = useState(false);

    let ctx = drawCanvasRef.current?.getContext("2d");
    setInterval(sendDrawData, 3000);

    useEffect(() => {
        ctx = drawCanvasRef.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        switch (mode) {
            case 'draw':
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 10;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.globalCompositeOperation="source-over";
                break;
            case 'erase':
                ctx.lineWidth = 30;
                ctx.globalCompositeOperation="destination-out";
                break;
            case 'image':
                break;
            case 'clear':
                ctx.clearRect(0,0, BACKGROUND_SIZE.width, BACKGROUND_SIZE.height);
                setMode('draw');
            default:
                break;
        }
    }, [mode]);


    useEffect(() => {
        ctx = drawCanvasRef.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        socket.on('action', (action) => {
            ctx.putImageData(action, 0, 0);
        });
    })

    /*

    */
    function handleStartDraw(e) {
        movedX.push(e.pageX);
        movedY.push(e.pageY);
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
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        movedX.push(x);
        movedY.push(y);
        

        return ;
    }

    function sendDrawData() {
        ctx = drawCanvasRef.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        /*
        let roomID = "1";
        let obj = {
            "roomID": roomID,
            "action": ctx.getImageData(0,0,BACKGROUND_SIZE.width, BACKGROUND_SIZE.height)
        }
        */
        
        //socket.emit("action", "hi");

        //console.log("Sent draw data");
    }

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
                drawLine(e.pageX, e.pageY);
            }}
            onMouseUp={(e) => {
                if (e.button !== 0) return;
                
                drawLine(e.pageX, e.pageY);
                setMouseDown(false);
                handleEndDraw(e);
            }}
            onMouseMove={(e) => {
                drawLine(e.pageX, e.pageY);
            }}
            width={BACKGROUND_SIZE.width}
            height={BACKGROUND_SIZE.height}
            ref={drawCanvasRef}
        />
        </div>
    );
};

export default DrawMouse;