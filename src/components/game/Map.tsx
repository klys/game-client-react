import { useContext, useRef } from "react";
import { AppContext } from "../../context/appContext";
import { useEventListener } from "usehooks-ts";
import { point_direction } from "./gameMath";

const Map = ({children}:{children:any}) => {
    const {setMouse, setPointerAngle, playersIds,players, socket} = useContext(AppContext);

    const mapRef = useRef(null);
    // MOVE THE MOUSE OVER THE GAME
    const mapPointerMoveEvent = (event: MouseEvent) => {
        let target = event.target as HTMLElement;
        if (target == null) return; 
        let rect = target.getBoundingClientRect();
        let x = Math.round(event.clientX - rect.left); //x position within the element.
        let y = Math.round(event.clientY - rect.top);  //y position within the element.
                //console.log("Left? : " + x + " ; Top? : " + y + ".");

                const myId = playersIds[socket.id];
                //console.log("Angle: "+point_direction(players[myId].x,players[myId].y,x, y))
                setMouse({x:x,y:y})
                setPointerAngle(point_direction(players[myId].x,players[myId].y,x, y))
    }

    useEventListener('pointermove',mapPointerMoveEvent, mapRef) 
    
    return(<>
        <div id="map" ref ={mapRef} style={{height:'3200px', width:'3200px', backgroundColor:'gray'}}>
            {(children) ? children : null}
        </div>
    </>)
}

export default Map;