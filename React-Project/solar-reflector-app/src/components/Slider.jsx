function Slider(label, min, max, val, funcOnChange) {
    console.log("Slider component used")
    return (
        <div style={{ display: "flex", alignItems: "center", width: "30%", height: "10%",}}>
            <label htmlFor="height-slider">{label}</label>
            <input
                id="height-slider"
                type="range"
                min={min}
                max={max}
                value={val}
                onChange={funcOnChange}
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            />
            <span>{val}</span>
        </div>
    )
}
export default Slider;