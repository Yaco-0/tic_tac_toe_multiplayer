import React, { useEffect, useState, useId } from 'react'
import { useParams } from 'react-router-dom';
import Square from "./Square";
import {CopyToClipboard} from "react-copy-to-clipboard";
import io from 'socket.io-client';

const socket = io("http://localhost:8000", {
  transports: ['websocket']
});



const GameBoard = () => {
    
    // const [squares,setSquares] = useState(Array(9).fill(null));
    const [isX,setIsX] = useState(true);
    const [matchInfo,setMatchInfo] = useState("");
    const [winner,setWinner] = useState(null);
    const {roomId,state} = useParams();
    const initialGameState = {

        state:{
            squares:Array(9).fill(null),
            winner:"",
            gameover:false,
            draw:false,
        },
        player1:{
            
            name: "p1",
            value:"X",
            trun:true,
            
        },
        player2:{
            
            name:"p2",
            value:"O",
            trun:false,
        },
    };
    const [gameState,setGameState] = useState({

        state:{
            squares:Array(9).fill(null),
            winner:"",
            gameover:false,
            draw:false,
        },
        player1:{
            
            name: "p1",
            value:"X",
            trun:true,
            
        },
        player2:{
            
            name:"p2",
            value:"O",
            trun:false,
        },
    });
    const currentPlayer = state == "create"? gameState.player1 : gameState.player2;
    const opponent = state == "join"? gameState.player1 : gameState.player2;
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
        if( gameState.state.squares[i] || gameState.state.winner !== null || currentPlayer.trun == false  || !gameState.state.gameover ){
            return;
        }
  
        
        gameState.state.squares[i] = currentPlayer.value;
        setIsX(!isX);   
        currentPlayer.trun = false;
        opponent.trun = true;
        socket.emit("player-click",{gameState,roomId});


    }

    const checkWinner = ()=>{
        for (let i = 0; i < windCondition.length; i++) {

            const [a,b,c] = windCondition[i];
            if(gameState.state.squares[a] && gameState.state.squares[a] === gameState.state.squares[b] && gameState.state.squares[b] === gameState.state.squares[c]){
                return gameState.state.winner = gameState.state.squares[a];
            }

        }
    }

    const resetGame = ()=>{
        gameState.state.squares = Array(9).fill(null);
        setIsX(true);
        setWinner(null);
        setMatchInfo(isX ? "next turn : X" : "next turn : O")
        setGameState(initialGameState);
    }

    useEffect(()=>{
        socket.emit("join-room",roomId)
        setMatchInfo(isX ? "next turn : X" : "next turn : O")
        
        
        socket.emit("game-over",checkWinner())
        socket.on("game-end",(winner)=>{
            gameState.state.winner = winner;
            gameState.state.gameover = true;
            winner? setMatchInfo("Winner is "+ '"'+winner+'"' ) : (gameState.state.draw ? setMatchInfo("Game is draw") : setMatchInfo(isX ? "next turn : X" : "next turn : O"));
        })
        if(gameState.state.squares.filter(s=> s == null).length === 0){
            gameState.state.gameover = true;
            gameState.state.draw = true;
        }
        socket.on("get-player-click",(data)=>{
            setGameState(data)
            currentPlayer.trun = state == "create" ? data.player1.trun : data.player2.trun;
            opponent.trun = state == "create" ? data.player1.trun : data.player2.trun;
            
        })
    },[isX,socket,gameState]);
  return (
    <div>
        
        <CopyToClipboard text={roomId} onCopy={()=> alert("id copied")}>
        <button className=' text-black my-8 ms-10  p-3 bg-white  shadow-md outline-none '>Room id : {roomId}</button>
        </CopyToClipboard>
        
        <div className=' flex p-5 justify-between'>
            <h1 className='text-white font-bold '>You are : {currentPlayer.value} </h1>
            <h1 className='text-white font-bold '>Your opponent is : {opponent.value} </h1>
        </div>
        <div className='w-full flex justify-center' >
            <div className=' grid grid-cols-3 mt-10'>
                {gameState.state.squares.map((val,index)=>(
                    <Square value={val} key={index} onClick={squareClick} index={index}/>
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