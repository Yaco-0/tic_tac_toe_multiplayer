import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io("http://localhost:8000", {
  transports: ['websocket']
});
const JoinRoom = () => {
    
    const [roomId,setRoomId] = useState("");
    const JoinRoom = ()=>{
        socket.emit("join-room",roomId);
    }
  return (
    <div className=' flex justify-center items-center h-full flex-col'>
        <input type="text" className=' mb-5 outline-none text-2xl p-2 text-center rounded-md' value={roomId} onChange={e=>setRoomId(e.target.value)}/>
        <Link className=' text-2xl bg-green-400 text-white px-10 py-2 shadow-md rounded-sm mb-3' to={`/game_board/join/${roomId}`} onClick={()=> JoinRoom()} >Join</Link>
    </div>
  )
}

export default JoinRoom