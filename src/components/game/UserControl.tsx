import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/appContext"



const UserControl = () => {
    const { socket } = useContext(AppContext);
    useEffect(() => {
        let map = document.getElementById('map')
        if (map != null)
        map.onclick = function clickEvent(e) {
            // e = Mouse click event.
            let target = e.target as HTMLElement;
            if (target == null) return; 
            let rect = target.getBoundingClientRect();
            let x = Math.round(e.clientX - rect.left); //x position within the element.
            let y = Math.round(e.clientY - rect.top);  //y position within the element.
            console.log("Left? : " + x + " ; Top? : " + y + ".");
            socket.emit("move", { x: x, y: y })
          }
        document.addEventListener("contextmenu", (event) => {
            //console.log("mx: " + event.clientX + ", my: " + event.clientY);
            event.preventDefault();
            // 0 means right ciick on event.button
        });
        /*
        // THIS WORK FOR ONLY VIEWPORT
        document.addEventListener("click", (event) => {
            console.log("mx: " + event.clientX + ", my: " + event.clientY);


            socket.emit("move", { x: event.clientX, y: event.clientY })

        });*/

        return () => {
            //socket.off('signup', SignUpListener)
        }
    }, [])



    return (<>
    </>)
}

export default UserControl;

