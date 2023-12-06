import { BsPencilFill } from "react-icons/bs";
import { useContext } from "react";
import { DrawContext } from "../../Context/DrawContext";

const Draw = () => {

    const { mode, setMode } = useContext(DrawContext);

    return (
        <button
        onClick={()=> {setMode('draw')}}>
            <BsPencilFill/>
        </button>
    )
};

export default Draw;