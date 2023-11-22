import BackDropCanvas from "./component/BackDropCanvas";
import DrawMouse from "./component/MouseDraw";
import ImageLayer from "./component/ImageLayer";
import ComponentLayer from "./component/ComponentLayer";

const Board = () => {
    return (
        <>
            <BackDropCanvas/>
            <DrawMouse/>
            <ImageLayer/>
            <ComponentLayer/>
        </>
    )
};

export default Board;