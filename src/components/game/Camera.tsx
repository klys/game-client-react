import react, {useEffect, useContext, useState} from "react"
import { AppContext } from "../../context/appContext"
const Camera = () => {
    const {socket} = useContext(AppContext);
    const [player, setPlayer] = useState<any>({x:0,y:0})
    let camLoop: NodeJS.Timer;
    //let players = useRef(useContext(AppContext))
    useEffect(() => {
        //console.log("camera mounted")
        const updateCamera = () => {
            //if (playersIds[socket.id] !== undefined) {
                const cam_x = player.x - (window.visualViewport.width/2)
                const cam_y = player.y - (window.visualViewport.height/2)
                window.scroll(cam_x,cam_y)
            //}

        }
        camLoop = setInterval(updateCamera, 1)


        socket.once("move", (data:any)=>{
            if (data.playerId == socket.id) {
              setPlayer({x:data.x,y:data.y})
            }
          })


        return() => {
            //socket.off("move")
            clearInterval(camLoop)
        }
    })

    

    return (<></>)
}

export default Camera;