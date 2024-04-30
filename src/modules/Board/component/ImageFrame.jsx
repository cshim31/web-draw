import { motion } from 'framer-motion';
import { GrTopCorner, GrBottomCorner } from "react-icons/gr";
import { useState } from 'react';
import { BACKGROUND_SIZE } from '../../../common/constants/backgroundSize';
import useImage from '../../hooks/useImage';

const ImageFrame = ({ imageData, index }) => {
    
    const [isDragging, setDragging] = useState(false);

    const {
        x,
        y,
        imageWidth,
        imageHeight,
        setImageWidth,
        setImageHeight
    } = useImage(imageData, index);

    /*
        starting from edge coordinate to middle of the image,
        save each distance difference to current points
        if current points are closer to middle of image than prev points
        then size is shrinking
    */  

    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);

    const resizeRatio = 1;


    function reduceImageWidth(currentX, prevX) {
        return imageWidth - Math.floor(Math.abs(currentX - prevX)*resizeRatio);
    } 

    function reduceImageHeight(currentY, prevY) {
        return imageHeight - Math.floor(Math.abs(currentY - prevY)*resizeRatio);
    } 

    function extendImageWidth(currentX, prevX) {
        return imageWidth + Math.floor(Math.abs(currentX - prevX)*resizeRatio);
    } 

    function extendImageHeight(currentY, prevY) {
        return imageHeight + Math.floor(Math.abs(currentY - prevY)*resizeRatio);
    } 

    function resizeImageStart(e) {
        // remove ghost image
        e.dataTransfer.setDragImage(new Image(), 0, 0);

        // record starting point
        setPrevX(e.clientX);
        setPrevY(e.clientY);
    }

    
    function resizeImage(e) {
        const currentX = e.clientX;
        const currentY = e.clientY;

        
        // reduce width if mid-currentX < mid-prevX. The equation becomes reduce if currentX > prevX
        if (currentX > prevX) {
            setImageWidth(extendImageWidth(currentX, prevX));
        }

        // extend width if mid-currentX > mid-prevX. The equation becomes extend if currentX < prevX
        if (currentX < prevX) {
            setImageWidth(reduceImageWidth(currentX, prevX));
        }
        
        // reduce height if mid-currentY < mid-prevY. The equation becomes reduce if currentY > prevY
        if (currentY > prevY) {
            setImageHeight(extendImageHeight(currentY, prevY));
        }

        // extend height if mid-currentY > mid-prevY. The equation becomes extend if currentY < prevY
        if (currentY < prevY) {
            setImageHeight(reduceImageHeight(currentY, prevY));
        }
        
        setPrevX(currentX);
        setPrevY(currentY);
    }

    function resizeImageEnd(e) {
        setPrevX(0);
        setPrevY(0);
        console.log("drag")
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
                onDragStart={(e) => {
                    resizeImageStart(e)
                }}
                onDrag={(e) => {
                    resizeImage(e)
                }}
                onDragEnd={(e) =>  {
                    resizeImageEnd(e)
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
                onDragEnd={(e) => 
                    resizeImageEnd(e)
                }
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
                onDragEnd={(e) => 
                    resizeImageEnd(e)
                }
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
                onDragEnd={(e) => 
                    resizeImageEnd(e)
                }
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