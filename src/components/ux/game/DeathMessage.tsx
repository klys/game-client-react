import DeathScreen from "./DeathScreen"

import {useContext} from "react"

import { AppContext } from "../../../context/appContext";

const DeathMessage = () => {
    const {waiting} = useContext(AppContext);
    //console.log("waiting:",waiting)
    return(<>
    <div hidden={!waiting}><DeathScreen/></div>
    </>)
}

export default DeathMessage;