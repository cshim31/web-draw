import './App.css';
import { DrawContextProvider } from './modules/Context/DrawContext';
import { WebsocketContextProvider } from "./modules/Context/WebsocketContext";
import DrawPage from './modules/DrawPage';

export async function loader({params}) {
  const roomId = params.roomId;
  
  return roomId;
}

export default function App() {

  return (
    <WebsocketContextProvider>
        <DrawContextProvider>
            <DrawPage/>
        </DrawContextProvider>
    </WebsocketContextProvider>
  );
}