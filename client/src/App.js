import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import GameBoard from "./Components/GameBoard";
import Home from "./Components/Home";
import JoinRoom from "./Components/JoinRoom";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home/>}/>
        <Route path="/game_board/:state/:roomId" element={<GameBoard/>}/>
        <Route path="/join_room" element={<JoinRoom/>}/>
      </Route>
    )
  )
  return (
    <div className="App h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
