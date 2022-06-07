import {useContext, useState} from 'react'

import { AppContext } from '../../../context/appContext'

// import {
//     Slider,
//     SliderTrack,
//     SliderFilledTrack
//   } from '@chakra-ui/react'

const LifeBar = () => {
    const { socket } = useContext(AppContext)
    const [life, setLife] = useState(100)
    

    socket.on("playerHurt", (data:any) => {
        console.log("playerHurt received!!", data)
        if (socket.id === data.playerId) setLife(data.life)
    })

    socket.on("playerReborn", (data:any) => {
        if (socket.id === data.playerId) setLife(100)
    })
  

    //const life = useRef(useContext(AppContext));
     //console.log("Life:",life.current.life)
     //console.log("Current Life: ",life)
    return(<>
    <div style={{
            position: "fixed",
            top: "1px",
            left: "1px",
            width:"100%",
            height:"20px",
            zIndex: 999,
          }}>
    <div style={{
        width:"100%",
        height:"5px",
        backgroundColor:"gray"
    }}>
        <div style={{
            height:"5px",
            backgroundColor:"red",
            width:`${life}%`
        }}></div>

    </div>
    </div>
    </>)
}

export default LifeBar;