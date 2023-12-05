import { BsArrowsMove } from "react-icons/bs";
import { useContext,useState,useEffect } from "react";
import { DrawContext } from "../../Context/DrawContext";

const ImagePicker = () => {

    const { imageLayer, mode, setMode } = useContext(DrawContext);


    const handlePickImage = () => {
        
        const nullableLayer = imageLayer.current;
        
        if (!nullableLayer) return ;

        nullableLayer.style.zIndex = 20;

        return ;
    }


    const undoPickImage = () => {
        const nullableLayer = imageLayer.current;
        
        if (!nullableLayer) return ;

        nullableLayer.style.zIndex = 0;

        return ;
    }

    useEffect(()=> {
        
        if (mode == 'image') {
            handlePickImage();
        }

        else {
            undoPickImage();
        }

    }, [mode]);

    return (
        <button
        onClick={()=> {setMode('image')}}>
            <BsArrowsMove/>
        </button>
    );
}

export default ImagePicker;