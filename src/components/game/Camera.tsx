import react, {useEffect, useContext, useRef} from "react"
import { AppContext } from "../../context/appContext"
const Camera = () => {
    const { socket, players, playersIds} = useContext(AppContext);
    //let players = useRef(useContext(AppContext))
    useEffect(() => {
        console.log("camera mounted")
        const updateCamera = () => {
            if (playersIds[socket.id] !== undefined) {
                const cam_x = players[playersIds[socket.id]].x - (window.visualViewport.width/2)
                const cam_y = players[playersIds[socket.id]].y - (window.visualViewport.height/2)
                window.scroll(cam_x,cam_y)
            }
        }
        setInterval(updateCamera, 1)


        
    },[])

    

    return (<></>)
}

export default Camera;