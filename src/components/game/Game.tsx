import React from "react"
import { Provider } from "../../context/appContext";
import Ships from "./Ships"
import Network from "./Network";
import UserControl from "./UserControl"
import Map from "./Map"
import Camera from "./Camera"
const Game = () => {
    return (<>
        <Provider>
            <Camera />
            <Network />
            <UserControl />
            <Map><Ships /></Map>
            
        </Provider>
    </>)
}

export default Game;