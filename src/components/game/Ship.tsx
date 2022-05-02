import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/appContext";

const Ship = (props:any) => {
  const { socket, movePlayer } = useContext(AppContext)
  //console.log("props:", props.playerInfo)
  const playerId = props.playerInfo.playerId;
  useEffect(() => {
    socket.on("move", (data:any) => {
      //console.log("move", data)
      movePlayer(data)

    })
  }, [])
  return (<>
    <div
      style={{
        position: "absolute",
        top: props.playerInfo.y + "px",
        left: props.playerInfo.x + "px",
        zIndex: 999,
      }}
    >
      <img
        style={{ transform: "rotate(" + props.playerInfo.angle + "deg)" }}
        src="/ship.png"
        alt="Picture of a spaceship"
        width={32}
        height={32}
      />
    </div>
  </>)
}

export default Ship;


