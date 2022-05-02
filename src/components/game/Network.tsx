import { useContext, useEffect } from "react";
import { AppContext } from "../../context/appContext"


const Network = () => {

    const { socket, addPlayer, removePlayer } = useContext(AppContext);
    useEffect(() => {
        console.log("Network mounted!")
        socket.emit("addPlayer")




        socket.on("addPlayer", (data:any) => {

            console.log("addPlayer", data)
            addPlayer(data)

        })

        socket.on("removePlayer", (data:any) => {
            removePlayer(data.playerId)
        })


        return
    }, [])


    return (<></>)
}

export default Network;
