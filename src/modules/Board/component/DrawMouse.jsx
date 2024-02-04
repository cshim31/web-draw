import { useRef, useState } from "react";
import { useMouse, useInterval } from "react-use";
import { useEffect,useContext } from "react";
import { motion } from 'framer-motion';
import { DrawContext } from "../../Context/DrawContext";
import { BACKGROUND_SIZE } from "../../../common/constants/backgroundSize";
import { socket } from "../../../common/lib/socket";

let obj = {
    userID: "sch1261"
}
socket.emit("create_room", obj);

let obj2 = {
    userID: "sch12611",
    roomID: "8009328d6eed5"
}
socket.emit("join_room", obj2);

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
let canvasMotions = {};
let movedX = [];
let movedY = [];

const DrawMouse = () => {

    const { drawLayer, mode, setMode, drawCanvasRef } = useContext(DrawContext);
    const {docX, docY, posX, posY, elX, elY, elW, elH} = useMouse(drawCanvasRef); //??? what is ref used for
    const [isDragging, setDragging] = useState(false);
    const  [isMouseDown, setMouseDown] = useState(false);

    let ctx = drawCanvasRef.current?.getContext("2d");

    useInterval(() => {
        sendDrawData();
    }, 1000)

    useEffect(() => {
        ctx = drawCanvasRef.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        setMedium(mode);
        canvasMotions[mode] = getCanvasMotionStructure();
        canvasMotions[mode].canvasProps = ctx;
    }, [mode]);

    useEffect(() => {
        ctx = drawCanvasRef.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        socket.on('action', (newCanvasMotions) => {
            // need to figure out how to manage data strcture
            for (const [mode, data] of Object.entries(newCanvasMotions)) {
                setMedium(mode);
                
                for (let i = 1; i < data.x.length; i++) {
                    drawLine(data.x[i-1], data.y[i-1], data.x[i], data.y[i]);
                }
            }
        });
    })

    /*

    */
    function getCanvasMotionStructure() {
        return {
            x: [],
            y: [],
            canvasMotions: null
        };
    }

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
        canvasMotions[mode].x.push(movedX.slice());
        canvasMotions[mode].y.push(movedY.slice());
        movedX = [];
        movedY = [];
        return ;
    }


    function drawLine(prevX, prevY, x, y) {
        if (!ctx || !isMouseDown) {
            return;
        }
        
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();

        return ;
    }

    function sendDrawData() {
        ctx = drawCanvasRef.current?.getContext("2d");
        if (!ctx) {
            return;
        } 

        // send out and empty canvasMotion data
        for (const [mode, data] of Object.entries(canvasMotions)) {
            socket.emit("action", mode, data);
            data.x = [];
            data.y = [];
        }
    }

    function setMedium(mode) {
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
                ctx.globalCompositeOperation = "source-over";
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
                drawLine(movedX[movedX.length-1], movedY[movedY.length-1], e.pageX, e.pageY);
            }}
            onMouseUp={(e) => {
                if (e.button !== 0) return;
                
                drawLine(movedX[movedX.length-1], movedY[movedY.length-1], e.pageX, e.pageY);
                setMouseDown(false);
                handleEndDraw(e);
            }}
            onMouseMove={(e) => {
                drawLine(movedX[movedX.length-1], movedY[movedY.length-1], e.pageX, e.pageY);
                movedX.push(e.pageX);
                movedY.push(e.pageY);

            }}
            width={BACKGROUND_SIZE.width}
            height={BACKGROUND_SIZE.height}
            ref={drawCanvasRef}
        />
        </div>
    );
};

export default DrawMouse;