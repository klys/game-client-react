import React, { useState, useContext } from "react";
import { AppContext } from "../../context/appContext";

const Ship = (props:any) => {
  const [death, setDeath] = useState(false)
  const { socket, movePlayer } = useContext(AppContext)

  //console.log("props:", props.playerInfo)
  const playerId = props.playerInfo.playerId;
  // useEffect(() => {
  //   socket.on("playerHurt", (data:any) => {
  //     console.log("playerHurt received!!")
  //     if (playerId == data.playerId) setLife(data.life)
  //   })
  // }, [life])
  socket.on("move", (data:any) => {
    //console.log("move", data)
    if (playerId == data.playerId) movePlayer(data)
    
  })

  socket.on("playerDeath", (data:any) => {
    if (playerId == data.playerId) {
      setDeath(true)
    }
  })

  socket.on("playerReborn", (data:any) => {
    if (playerId == data.playerId) {
      setDeath(false)
    }
  })
  
  
  
  return (<>
    <div
      hidden={death}
      style={{
        position: "absolute",
        top: props.playerInfo.y + "px",
        left: props.playerInfo.x + "px",
        zIndex: 999,
        
      }}
    >
      <img
        style={{ 
        transform: "rotate(" + props.playerInfo.angle + "deg)"
       }}
        src="/ship.png"
        alt="Picture of a spaceship"
        width={32}
        height={32}
      />
    </div>
  </>)
}

export default Ship;


