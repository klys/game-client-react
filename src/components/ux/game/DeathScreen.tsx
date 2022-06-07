import {useContext,useEffect, useState} from "react"
import {AppContext} from "../../../context/appContext"
const DeathScreen = () => {
    const {waiting} = useContext(AppContext)
    const [seconds, setSeconds] = useState(15)
    
    if (seconds > 0) {
        setTimeout(()=> {
            setSeconds(seconds-1)
        },1000)

    }

    useEffect(()=>{
        setSeconds(15)
    }, [waiting])

    return (<>
        <div
          style={{
            position: "fixed",
            top: "150px",
            left: "150px",
            zIndex: 999,
          }}
        >
            {(seconds > 0) ?
        <p>Wait {seconds} to respawn</p>
            : <p>Respawning...</p>}
        </div>
    </>)
}

export default DeathScreen;