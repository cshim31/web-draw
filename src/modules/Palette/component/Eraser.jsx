import { BsEraserFill } from "react-icons/bs";
import { useContext } from "react";
import { DrawContext } from "../../Context/DrawContext";

const Eraser = () => {

    const { mode, setMode } = useContext(DrawContext);

    return (
        <button
        onClick={()=> {setMode('erase')}}>
            <BsEraserFill/>
        </button>
    )
};

export default Eraser;