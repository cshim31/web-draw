import BackDropCanvas from "./component/BackDropCanvas";
import DrawMouse from "./component/DrawMouse";
import ImageLayer from "./component/ImageLayer";

const Board = () => {
    return (
        <>
            <BackDropCanvas/>
            <ImageLayer/>
            <DrawMouse/>
        </>
    )
};

export default Board;