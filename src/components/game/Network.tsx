import { fsyncSync } from "fs";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/appContext"


const Network = () => {

    const { socket, addPlayer, removePlayer, addProjectil,moveProjectil, removeProjectil, setLife, startWait, stopWait } = useContext(AppContext);
    
    useEffect(() => {
        console.log("Network mounted!")
        socket.emit("addPlayer")




        socket.on("addPlayer", (data:any) => {

            console.log("addPlayer", data)
            addPlayer(data)
            if (data.playerId == socket.id) {
                console.log("SETTING LIFE OF PLAYER TO FULL LIFE")
                setLife(100)
            }

        })

        socket.on("removePlayer", (data:any) => {
            removePlayer(data.playerId)
        })

        socket.on("shotProjectil", (data:any) => {
            console.log("shotProjectil",data)
            addProjectil(data)
        })

        socket.on("moveProjectil", (data:any) => {
            //console.log("moveProjectil", data)
            moveProjectil(data)
        })

        socket.on("explodeProjectil", (data:any) => {
            removeProjectil(data)
        })

        socket.on("playerDeath", (data:any) => {
            console.log(`player:${data.playerId} has die!`)
            if (data.playerId == socket.id) startWait()

        })

        socket.on("playerReborn", (data:any) => {
            console.log("playerReborn")
            if (data.playerId == socket.id) stopWait()
        })
        
          
      
        

        return
    }, [])


    return (<></>)
}

export default Network;
