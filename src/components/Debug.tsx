import { render } from "@testing-library/react";
import {useContext} from 'react';
import {AppContext} from '../context/appContext'

const Debug = () => {
    const {players, socket, playersIds, mouse, pointerAngle, waiting} = useContext(AppContext) 
    
    if (players.length == 0) {
        return (<>
            <div style={{
            position: "fixed",
            top:"10px",
            left: "10px",
            zIndex: 999,
          }}>
              Connect to show variables.
            </div>
        </>)
    }
    return(<>
        <div style={{
        position: "fixed",
        top:"10px",
        left: "10px",
        zIndex: 999,
      }}>
          ThisPlayer:  {socket.id}<br/>
          waiting:{(waiting) ? 'true' : 'false'}<br/>
          x:{players[playersIds[socket.id]].x}<br/>
          y:{players[playersIds[socket.id]].y}<br/>
          angle:{players[playersIds[socket.id]].angle}<br/>
          pointerAngle: {pointerAngle}<br/>
          mouse.x:{mouse?.x}/mouse.y:{mouse?.y}
        </div>
    </>)
}

export default Debug;