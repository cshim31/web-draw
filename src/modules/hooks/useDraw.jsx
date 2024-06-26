import { useEffect, useContext, useState } from "react";
import { useInterval } from "react-use";
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";
import { BACKGROUND_SIZE } from "../../common/constants/backgroundSize";

const canvasMotions = {};
let movedX = [];
let movedY = [];

export default function useDraw() {

    const { drawLayer, mode, setMode, drawCanvasRef } = useContext(DrawContext);

    const  [isMouseDown, setMouseDown] = useState(false);

    let nullableCtx = drawCanvasRef.current?.getContext("2d"); 

    function isNull(obj) {

        if (!obj) {

            return true;

        } 

        return false;
    }

    function getCanvasMotionStructure() {
        return {
            x: [],
            y: [],
            strokeStyle: "",
            lineWidth: "",
            lineJoin: "",
            lineCap: "",
            globalCompositeOperation: ""
        };
    }

    function addMove(x,y) {
        movedX.push(x);
        movedY.push(y);
    } 


    function sendDrawData() {

        if (isNull(nullableCtx)) return;

        
        socket.emit("action", "draw_add", canvasMotions);

        for (const [mode, data] of Object.entries(canvasMotions)) {
            data.x = [];
            data.y = [];
        }
    }

    function setMedium(mode) {

        if (isNull(nullableCtx)) return;

        switch (mode) {
            case "draw":
                nullableCtx.strokeStyle = "#000000";
                nullableCtx.lineWidth = 10;
                nullableCtx.lineJoin = "round";
                nullableCtx.lineCap = "round";
                nullableCtx.globalCompositeOperation = "source-over";
                break;
            case "erase":
                nullableCtx.lineWidth = 30;
                nullableCtx.globalCompositeOperation="destination-out";
                break;
            case "image":
                break;
            case "clear":
                nullableCtx.clearRect(0,0, BACKGROUND_SIZE.width, BACKGROUND_SIZE.height);
                setMode("draw");
            default:
                break;
        }
    }

    function handleStartDraw(e) {
        movedX.push(e.pageX);
        movedY.push(e.pageY);
        return ;
    }

    function handleEndDraw(e) {
        canvasMotions[mode].x.push(movedX.slice());
        canvasMotions[mode].y.push(movedY.slice());
        movedX = [];
        movedY = [];
        return ;
    }

    function drawLine(prevX, prevY, x, y) {

        if (isNull(nullableCtx) || !isMouseDown) return;
        
        nullableCtx.beginPath();
        nullableCtx.moveTo(prevX, prevY);
        nullableCtx.lineTo(x,y);
        nullableCtx.stroke();
        nullableCtx.closePath();

        return ;
    }


    useInterval(() => {
        sendDrawData();
    }, 1000)

    useEffect(() => {

        nullableCtx = drawCanvasRef.current?.getContext("2d");
        
        if (isNull(nullableCtx)) return;

        socket.on("action", "draw_add", (drawData) => {
            // need to figure out how to manage data strcture
            for (const [mode, data] of Object.entries(drawData)) {
                setMedium(mode);
                
                for (let i = 1; i < data.x.length; i++) {
                    drawLine(data.x[i-1], data.y[i-1], data.x[i], data.y[i]);
                }
            }
        });
    });

    useEffect(() => {

        nullableCtx = drawCanvasRef.current?.getContext("2d");

        if (isNull(nullableCtx)) return;

        setMedium(mode);
        canvasMotions[mode] = getCanvasMotionStructure();
        canvasMotions[mode].strokeStyle = nullableCtx.strokeStyle;
        canvasMotions[mode].lineWidth = nullableCtx.lineWidth;
        canvasMotions[mode].lineJoin = nullableCtx.lineJoin;
        canvasMotions[mode].lineCap = nullableCtx.lineCap;
        canvasMotions[mode].globalCompositeOperation = nullableCtx.globalCompositeOperation;
        

    }, [mode]);
    

    return {
        handleEndDraw,
        handleStartDraw,
        drawLine,
        addMove,
        setMouseDown,
        movedX,
        movedY
    };
};