import BackDropCanvas from "./component/BackDropCanvas";
import DrawMouse from "./component/DrawMouse";
import ImageLayer from "./component/ImageLayer";

const Board = () => {
    return (
        <div 
            onDragOver={(e)=> {
                e.preventDefault()
                e.stopPropagation()
        }}>
            <BackDropCanvas/>
            <ImageLayer/>
            <DrawMouse/>
        </div>
    )
};

export default Board;