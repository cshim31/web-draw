import { useContext } from 'react';
import { DrawContext } from '../../Context/DrawContext';
import ImageFrame from './ImageFrame';
/**
 * Creates a layer for uploading and dragging image
 *  
 * @returns 
 */

const ImageLayer = () => {

    const { imageLayer, imageDatas } = useContext(DrawContext);
    const loadedImages = loadImages(imageDatas);

    {/*generate dragging motion to each image*/ }
    function loadImages(imageDatas) {
        const result = imageDatas.map((imageData, index) => 
            <ImageFrame
                imageData={imageData}
            />
        );
    
        return result;
    }

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