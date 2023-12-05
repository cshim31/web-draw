import Board from "../Board";
import Palette from "../Palette";
import { DrawContextProvider } from "../Context/DrawContext";

const DrawPage = () => {
    return (
        <DrawContextProvider>
            <Board/>
            <Palette/>
        </DrawContextProvider>
    )
}

export default DrawPage;