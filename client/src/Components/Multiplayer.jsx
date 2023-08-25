import React, { useEffect, useState } from 'react'
import Square from "./Square";
import io from 'socket.io-client';
const socket = io("http://localhost:8000", {
  transports: ['websocket']
});

const GameBoard = () => {
    const [squares,setSquares] = useState(Array(9).fill(null));
    const [isX,setIsX] = useState(true);
    const [matchInfo,setMatchInfo] = useState("");
    const [winner,setWinner] = useState(null);
    const [gameState,setGameState] = useState({
        squares,
        winner,
        matchInfo,
        isX,
        turn:true,
    });
    const windCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [2,5,8],
        [1,4,7],
        [0,4,8],
        [2,4,6]
    ]

    const squareClick = (i)=>{
        if(squares[i] || winner ){
            return;
        }
    
        
        squares[i] = isX? 'X':'O';
        setSquares(squares);
        setIsX(!isX);
        setGameState({
            squares,
            winner,
            matchInfo,
            isX,
        })
        socket.emit("user-click",gameState);

    }

    const checkWinner = ()=>{
        for (let i = 0; i < windCondition.length; i++) {

            const [a,b,c] = windCondition[i];
            if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
                return squares[a];
            }

        }
    }

    const resetGame = ()=>{
        setSquares(Array(9).fill(null));
        setIsX(true);
        setWinner(null);
        setMatchInfo(isX ? "next turn : X" : "next turn : O")
    }

    useEffect(()=>{
        setMatchInfo(isX ? "next turn : X" : "next turn : O")
        if(checkWinner()){
            setWinner(checkWinner());
            setMatchInfo("Winner is "+ '"'+checkWinner()+'"' );
        }
        socket.on("user-click-get",(data)=>{
            setSquares(data.squares);
            setIsX();
        })
    },[isX,socket]);
  return (
    <div>
        <div className='w-full flex justify-center' >
            <div className=' grid grid-cols-3 mt-10'>
                {squares.map((val,index)=>(
                    <Square value={squares[index]} key={index} onClick={squareClick} index={index}/>
                ))}
            </div>
        </div>
        <h1 className=' text-white mt-10 text-center text-2xl'>{matchInfo}</h1>
        <div className='w-full  flex justify-center'>
        <button className='mt-10  bg-green-400 px-3 py-2 rounded shadow text-white outline-none ' onClick={()=> resetGame()}>Restart</button>
        </div>
    </div>
  )
}

export default GameBoard