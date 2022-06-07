import {useContext} from 'react';
import { AppContext } from '../../context/appContext';

const Mouse = () => {
    const {mouse} = useContext(AppContext)
    return (<>
        <div
          style={{
            position: "absolute",
            top: mouse.y + "px",
            left: mouse.x + "px",
            zIndex: 999,
            width:20,
            height:20,
            boxSizing:"content-box",
            backgroundColor:"red"
          }}
        >
          
        </div>
      </>)

}

export default Mouse;