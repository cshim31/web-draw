import { useContext, useEffect } from 'react';
import { DrawContext } from '../../Context/DrawContext';
import ImageFrame from './ImageFrame';
import { socket } from "../../../common/lib/socket";
/**
 * Creates a layer for uploading and dragging image
 *  
 * @returns 
 */

const ImageLayer = () => {

    const { imageLayer, imageDatas, setImageDatas } = useContext(DrawContext);
    const loadedImages = loadImages(imageDatas);

    useEffect(() => {
        socket.on("image_add", (data) => {
            setImageDatas(data);
        });

        socket.on("image_update", (data) => {
            setImageDatas(data);
        });
    })

    {/*generate dragging motion to each image*/ }
    function loadImages(imageDatas) {
        const result = imageDatas.map((imageData, index) => 
            <ImageFrame
                imageData={imageData}
                index={index}
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