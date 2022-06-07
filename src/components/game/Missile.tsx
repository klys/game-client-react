

const Missile = (props:any) => {
  
  return (<>
    <div
      style={{
        position: "absolute",
        top: props.data.y+"px",
        left: props.data.x+"px",
        zIndex: 999,
      }}
    >
      <img
        style={{ transform: "rotate("+props.data.angle+"deg)" }}
        src="/missile0.gif"
        alt="Picture of a missile shot"
        width={32}
        height={32}
      />
    </div>
  </>)
}

export default Missile;


