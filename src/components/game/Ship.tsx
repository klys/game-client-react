import React, { useState, useContext, useEffect, useCallback } from "react";
import { ScriptElementKindModifier } from "typescript";
import { AppContext } from "../../context/appContext";

const Ship = (props:any) => {
  const [death, setDeath] = useState(false)
  const { socket } = useContext(AppContext)

  const [pos, setPos] = useState({x:100,y:100,angle:0})

  //console.log("props:", props.playerInfo)
  const playerId = props.playerInfo.playerId;
  // useEffect(() => {
  //   socket.on("playerHurt", (data:any) => {
  //     console.log("playerHurt received!!")
  //     if (playerId == data.playerId) setLife(data.life)
  //   })
  // }, [life])
  // socket.on("move", (data:any) => {
  //   //console.log("move", data)
  //   if (playerId == data.playerId) movePlayer(data)
    
  // })
  const socketPlayerDeath = useCallback(() => {
    console.log("playerDeath"+playerId)
    setDeath(true)
    socket.off("move"+playerId)
  
  },[])

  const socketPlayerReborn = useCallback(() => {
    setDeath(false)
    move()
},[])

  let camLoop: NodeJS.Timer;
  useEffect(()=> {

  socket.on("playerDeath"+playerId, socketPlayerDeath)

  socket.on("playerReborn"+playerId, socketPlayerReborn)
  
  if (death === false) {
    move()
  }
  

  

  return(()=> {
    //socket.off("playerDeath"+playerId)
    //socket.off("playerReborn"+playerId)
    //if(death === false) socket.off("move"+playerId)
  })
},[death])

const move = useCallback(() => {
  socket.on("move"+playerId, (data:any)=>{
    setPos({x:data.x,y:data.y,angle:data.angle})
    
  })
},[])

const updateCamera = useCallback( () => {
  //if (playersIds[socket.id] !== undefined) {
    //console.log("updateCamera")
      const cam_x = pos.x - (window.visualViewport.width/2)
      const cam_y = pos.y - (window.visualViewport.height/2)
      window.scroll(cam_x,cam_y)
  //}

},[pos])

useEffect(()=>{
  if (socket.id === playerId) {
    // setup camera for our player
    //console.log("camera mounted")
        
        camLoop = setInterval(updateCamera, 1)
  }
  return () => {
    clearInterval(camLoop)
  }
},[pos])
  
  
  return (<>
    <div
      id = {playerId}
      hidden={death}
      style={{
        position: "absolute",
        top: pos.y + "px",
        left: pos.x + "px",
        zIndex: 999,
        
      }}
    >

      <img
        style={{ 
        transform: "rotate(" + pos.angle + "deg)"
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


