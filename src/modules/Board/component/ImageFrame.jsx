import { motion, useMotionValue } from 'framer-motion';
import { GrTopCorner, GrBottomCorner } from "react-icons/gr";
import { useCallback, useState } from 'react';

const ImageFrame = ({ imageData }) => {
    const imageWidth = useMotionValue(imageData.width);
    const imageHeight = useMotionValue(imageData.height);
    
    const [isDragging, setDragging] = useState(false);

    const resizeImageFromLeft = useCallback((event, info) => {
        let ratio = Math.max(imageHeight.get(), imageWidth.get()) / Math.min(imageHeight.get(), imageWidth.get());

        if (imageHeight.get() > imageWidth.get()) {
            imageHeight.set(imageHeight.get() - info.delta.y);
            imageWidth.set(imageWidth.get() - info.delta.x/ratio);
        }
        else if (imageHeight.get() < imageWidth.get()) {
            imageWidth.set(imageWidth.get() - info.delta.x);
            imageHeight.set(imageHeight.get() - info.delta.y/ratio);
        }

        else {
            imageHeight.set(imageHeight.get() - info.delta.y);
            imageWidth.set(imageHeight.get() - info.delta.x);
        }

        
    }, []);

    const resizeImageFromRight = useCallback((event, info) => {
        imageHeight.set(imageHeight.get() + info.delta.y);
        imageWidth.set(imageWidth.get() + info.delta.x);
    }, []);

    return (
        <motion.div
        className="inline-block"
        style={{
            maxWidth: imageWidth,
            maxHeight: imageHeight,
            minHeight: 100,
            minWidth: 100
        }}
        drag
        dragConstraints={{
            left: 50,
            right: 2000,
            top: 50,
            bottom: 2000
        }}
        dragMomentum={false}
        >
            <motion.div
            className="fixed top-0 left-0"
            style={{
                cursor: isDragging? "nw-resize":""
            }}
            drag
            onDrag={resizeImageFromLeft}
            dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}
            dragMomentum={false}
            onMouseEnter={() => {
                setDragging(true);
            }}
            onMouseLeave={() => {
                setDragging(false);
            }}
            >
                <GrTopCorner/>
            </motion.div>
            <motion.div
            className="fixed top-0 right-0"
            style={{
                cursor: isDragging? "ne-resize":""
            }}
            drag
            onDrag={resizeImageFromRight}
            dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}
            dragMomentum={false}
            onMouseEnter={() => {
                setDragging(true);
            }}
            onMouseLeave={() => {
                setDragging(false);
            }}
            >
                <GrTopCorner
                style={{
                    scale: "-1 1"
                }}
                />
            </motion.div>
            <motion.div
            className="fixed bottom-0 left-0"
            style={{
                cursor: isDragging? "sw-resize":""
            }}
            drag
            onDrag={resizeImageFromLeft}
            dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}
            dragMomentum={false}
            onMouseEnter={() => {
                setDragging(true);
            }}
            onMouseLeave={() => {
                setDragging(false);
            }}
            >
                <GrBottomCorner 
                style={{
                    scale: "-1 1"
                }}
                />
            </motion.div>
            <motion.div
            className="fixed bottom-0 right-0"
            style={{
                cursor: isDragging? "se-resize":""
            }}
            drag
            onDrag={resizeImageFromRight}
            dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}
            dragMomentum={false}
            onMouseEnter={() => {
                setDragging(true);
            }}
            onMouseLeave={() => {
                setDragging(false);
            }}
            >
                <GrBottomCorner />
            </motion.div>
            <img
                alt="image uploaded"
                className="rounded-md pointer-events-none"
                src={imageData.base64}
            />
        </motion.div>
    );
}

export default ImageFrame;


