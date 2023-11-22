import { motion } from 'framer-motion';

/**
 * Creates a layer for uploading and dragging image
 *  
 * @returns 
 */

const ImageLayer = () => {

    {/*generate dragging motion to each image uploaded*/ }
    function loadImage() {
        
    };

    return (
        <div className="absolute w-full h-full top-0 left-0">
            {/*give dragging motion to each image uploaded*/ }
            <motion.div>
                <img
                    src=''
                />
            </motion.div>
        </div>
    );
}

export default ImageLayer;