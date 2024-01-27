import { motion } from 'framer-motion';
import Palette from '../../Palette';
/**
 * Creates a layer for collection of UI components on screen
 *  
 * @param 
 * @returns 
 */

const ComponentLayer = () => {


    return (
        <div className="sticky left-0 flex-col w-40 my-8 ml-2"
        >
            {/*give dragging motion to each image uploaded*/ }
            <motion.div>
                <Palette/>
            </motion.div>
        </div>
    );
}

export default ComponentLayer;