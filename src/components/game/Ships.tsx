import React, { useContext, useRef } from "react";
import { AppContext } from "../../context/appContext";

const Ships = () => {
    let players = useRef(useContext(AppContext))




    return (<>
        {players.current.players.map((player:any) => player.jsx)}
    </>)
}

export default Ships;