import { motion } from 'framer-motion';
import { useContext } from 'react';
import { DrawContext } from '../../Context/DrawContext';
/**
 * Creates a layer for uploading and dragging image
 *  
 * @returns 
 */

const ImageLayer = () => {

    const { imageLayer, imageDatas } = useContext(DrawContext);
    const loadedImages = loadImage(imageDatas);

    {/*generate dragging motion to each image*/ }
    function loadImage(imageDatas) {
        if (!imageDatas[0]) return null;

        const result = imageDatas.map((imageData) => 
            <motion.div
            className="resize inline-block"
            drag
            dragMomentum={false}
            >
                <img
                    className="pointer-events-none"
                    src={imageData.base64}
                />
            </motion.div>
        );

        return result;
    };

    return (
        <div className="absolute top-0 z-0 cursor-grab"
        style={{ x: 50, y: 50 }}
        ref={imageLayer}
        >
            { loadedImages }
        </div>
    );
}

export default ImageLayer;