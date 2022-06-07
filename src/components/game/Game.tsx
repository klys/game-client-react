import React from "react"
import { Provider } from "../../context/appContext";
import Ships from "./Ships"
import Network from "./Network";
import UserControl from "./UserControl"
import Map from "./Map"
import Camera from "./Camera"
import Missiles from "./Missiles";
import Debug from "../Debug"
import Mouse from "./Mouse";
import LifeBar from "../ux/game/lifeBar";
import DeathMessage from "../ux/game/DeathMessage"

const Game = () => {
    return (<>
        <Provider>
            <Camera />
            <Network />
            <UserControl />
            <Map>
                
            </Map>
            <Missiles />
            <Ships />
            <Mouse/>
            
            <LifeBar/>
            <DeathMessage/>
                        
        </Provider>
    </>)
}

export default Game;