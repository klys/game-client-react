import { useContext, useRef } from "react";
import {AppContext} from "../../context/appContext"
import Missile from "./Missile";
const Missiles = () => {
    const projectiles = useRef(useContext(AppContext));
    return (<>
    {projectiles.current.projectiles.map((projectil:any) => {
        return <Missile data = {projectil} key={projectil.id} />
    })}
    </>)
}

export default Missiles;