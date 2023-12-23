import Board from "../Board";
import Palette from "../Palette";
import { DrawContextProvider } from "../Context/DrawContext";
import { WebsocketContextProvider } from "../Context/WebsocketContext";

const DrawPage = () => {
    return (
        <WebsocketContextProvider>
            <DrawContextProvider>
                <Board/>
                <Palette/>
            </DrawContextProvider>
        </WebsocketContextProvider>
    )
}

export default DrawPage;