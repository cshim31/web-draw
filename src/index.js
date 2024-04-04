import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {
  loader as appLoader
} from './App';
import ErrorPage from './routes/error-page';
import JoinPage, {
  action as joinAction,
  loader as joinLoader
} from './routes/join-page';
import reportWebVitals from './reportWebVitals';
import Root, {
  action as rootAction
} from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DrawContextProvider } from './modules/Context/DrawContext';
import { WebsocketContextProvider } from "./modules/Context/WebsocketContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction
  },
  {
    path:"/join/:roomId",
    element: <JoinPage />,
    action: joinAction,
    loader: joinLoader
  },
  {
    path:"/:roomId",
    element: <App />,
    loader: appLoader
  },
  {
    path:"/test",
    element: <App />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebsocketContextProvider>
        <DrawContextProvider>
          <RouterProvider router={router} />
        </DrawContextProvider>
    </WebsocketContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
