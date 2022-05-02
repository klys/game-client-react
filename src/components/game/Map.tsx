
const Map = ({children}:{children:any}) => {
    return(<>
        <div id="map" style={{height:'3200px', width:'3200px', backgroundColor:'gray'}}>
            {children}
        </div>
    </>)
}

export default Map;