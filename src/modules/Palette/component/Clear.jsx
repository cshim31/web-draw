import { BsFileEarmark } from "react-icons/bs";
import { useContext } from "react";
import { DrawContext } from "../../Context/DrawContext";

const Clear = () => {

    const { mode, setMode } = useContext(DrawContext);

    return (
        <button
        onClick={()=> {setMode('clear')}}>
            <BsFileEarmark/>
        </button>
    )
};

export default Clear;