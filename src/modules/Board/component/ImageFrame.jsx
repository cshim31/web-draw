import { motion, useMotionValue } from 'framer-motion';
import { GrTopCorner, GrBottomCorner } from "react-icons/gr";
import { useCallback, useEffect, useState,useContext } from 'react';
import { useInterval } from 'react-use';
import { DrawContext } from '../../Context/DrawContext';
import { BACKGROUND_SIZE } from '../../../common/constants/backgroundSize';
import { socket } from '../../../common/lib/socket';


const ImageFrame = ({ imageData, index }) => {
    const { roomID } = useContext(DrawContext);
    const [imageWidth, setImageWidth] = useState(imageData.width);
    const [imageHeight, setImageHeight] = useState(imageData.height);
    
    const [isDragging, setDragging] = useState(false);
    const x = useMotionValue(imageData.x);
    const y = useMotionValue(imageData.y);

    useInterval(() => {
        sendImageData();
    }, 1000)


    useEffect(() => {
        socket.on("action", "image_update", (newImageMotion) => {
            x = newImageMotion.x;
            y = newImageMotion.y;
            setImageWidth(newImageMotion.imageWidth);
            setImageWidth(newImageMotion.imageHeight);
        })
    })

    // TODO: Deal with how to update with image based on object structure from client
    function sendImageData() {

        let data = {
            index: index,
            data: {
                base64: imageData.base64,
                width: imageWidth,
                height: imageHeight,
                x: x,
                y: y
            }
        }

        socket.emit("action", "image_update", roomID, data);
    }

    /*
        starting from edge coordinate to middle of the image,
        save each distance difference to current points
        if current points are closer to middle of image than prev points
        then size is shrinking

    */  
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);

    const resizeRatio = 1;

    function resizeImageStart(e) {
        // remove ghost image
        e.dataTransfer.setDragImage(new Image(), 0, 0);
        setStartX(e.clientX);
        setStartY(e.clientY);
    }

    function resizeImage(e) {
        let currentX = (startX-e.clientX);
        let currentY = (startY-e.clientY);

        // shirink if mid-currentX < mid-prevX
        // becomes shrink if currentX > prevX
        // extend if mid-currentX > mid-prevX
        // becomes extend if currentX < prevX
        if (currentX > prevX) {
            setImageWidth(imageWidth-Math.floor(Math.abs(currentX - prevX)*resizeRatio));
        }

        if (currentX < prevX) {
            setImageWidth(imageWidth + Math.floor(Math.abs(currentX - prevX)*resizeRatio));
        }

        if (currentY > prevY) {
            setImageHeight(imageHeight-Math.floor(Math.abs(currentY - prevY)*resizeRatio));
        }

        if (currentY < prevY) {
            setImageHeight(imageHeight+Math.floor(Math.abs(currentY - prevY)*resizeRatio));
        }
        setPrevX(currentX);
        setPrevY(currentY);
    }

    return (
        <motion.div
        className="absolute"
        style={{
            width: imageWidth,
            height: imageHeight,
            minHeight: 100,
            minWidth: 100,
            x,
            y
        }}
        drag
        dragConstraints={{
            left: 50,
            right: BACKGROUND_SIZE.width,
            top: 50,
            bottom: BACKGROUND_SIZE.height
        }}
        dragMomentum={false}
        onDragOver={(e)=> {
            e.preventDefault()
            e.stopPropagation()
        }}
        >   
            <div>
                <div
                className="absolute top-0 left-0"
                style={{
                    cursor: isDragging? "nw-resize":""
                }}
                draggable={true}
                onDragStart={(e) => 
                    resizeImageStart(e)
                }
                onDrag={(e) => {
                    resizeImage(e)
                }}
                onMouseEnter={() => {
                    setDragging(true);
                }}
                onMouseLeave={() => {
                    setDragging(false);
                }}
                >
                    <GrTopCorner
                    size={35}
                    />
                </div>
                <div
                className="absolute top-0 right-0"
                style={{
                    cursor: isDragging? "ne-resize":""
                }}
                draggable={true}
                onDragStart={(e) => 
                    resizeImageStart(e)
                }
                onDrag={(e) => {
                    resizeImage(e)
                }}
                onMouseEnter={() => {
                    setDragging(true);
                }}
                onMouseLeave={() => {
                    setDragging(false);
                }}
                >
                    <GrTopCorner
                    size={35}
                    style={{
                        scale: "-1 1"
                    }}
                    />
                </div>
                <div
                className="absolute bottom-0 left-0"
                style={{
                    cursor: isDragging? "sw-resize":""
                }}
                draggable={true}
                onDragStart={(e) => 
                    resizeImageStart(e)
                }
                onDrag={(e) => {
                    resizeImage(e)
                }}
                onMouseEnter={() => {
                    setDragging(true);
                }}
                onMouseLeave={() => {
                    setDragging(false);
                }}
                >
                    <GrBottomCorner 
                    size={35}
                    style={{
                        scale: "-1 1"
                    }}
                    />
                </div>
                <div
                className="absolute bottom-0 right-0"
                style={{
                    cursor: isDragging? "se-resize":""
                }}
                draggable={true}
                onDragStart={(e) => 
                    resizeImageStart(e)
                }
                onDrag={(e) => {
                    resizeImage(e)
                }}
                onMouseEnter={() => {
                    setDragging(true);
                }}
                onMouseLeave={() => {
                    setDragging(false);
                }}
                >
                    <GrBottomCorner
                    size={35}
                    />
                </div>
                <div>
                    <img
                        alt="image uploaded"
                        className="rounded-md pointer-events-none"
                        src={imageData.base64}
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                            minHeight: 100,
                            minWidth: 100
                        }}
                    />
                </div>
            </div>
            
            
        </motion.div>
    );
}

export default ImageFrame;