
const Square = ({value,onClick,index}) => {

  return (
    <button className=" w-[100px] h-[100px]  text-7xl text-center border outline-none shadow-md rounded-md pt-4 select-none " style={value == "X" ?{color:"red"}:{color:"blue"} } onClick={()=>onClick(index)}> {value}</button>
  )
}

export default Square