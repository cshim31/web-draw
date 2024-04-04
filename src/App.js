import './App.css';
import DrawPage from './modules/DrawPage';

export async function loader({ params }) {
  const roomId = params.roomId;
  const userName = localStorage.getItem("userName");

  return {
    userName: userName, 
    roomId: roomId
  };
}

export default function App() {

  return (
    <DrawPage/>
  );
}