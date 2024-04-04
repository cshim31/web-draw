import Board from "../Board";
import Palette from "../Palette";
import useRoom from "../hooks/useRoom";

const DrawPage = () => {
    

    const { response } = useRoom();

    

    return (
        <>
            <Board/>
            <Palette/>
        </>
    )
}

export default DrawPage;