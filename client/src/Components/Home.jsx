import { useEffect, useState } from 'react';
import { uniqueId } from '../hooks/UniqueId';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io("http://localhost:8000", {
  transports: ['websocket']
});

const Home = () => {

    const rooms = [];
    const roomId = uniqueId();
    const joinRoom = ()=>{
      socket.emit('join-room',roomId);
    }
  

    useEffect(()=>{
   
      
    },[socket])
  return (
    <div className=' h-full flex justify-center items-center flex-col '>
      <Link className=' bg-green-400 text-white p-3 shadow-md rounded-md mb-3' to={`/game_board/create/${roomId}`} onClick={()=> joinRoom()}>Create room</Link>
      <Link className=' bg-green-400 text-white p-3 shadow-md rounded-sm mb-3' to="/join_room/">Join room</Link>
    </div>
  )
}

export default Home