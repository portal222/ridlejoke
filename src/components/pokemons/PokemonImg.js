import React, { useState } from "react";
import PokemonSound from "./PokemonSound";

const PokemonImg = (props) => {

    const [style, setStyle] = useState("largeImg");

    const changeStyle = () => {
     
        if (style !== "largeImg") setStyle("largeImg");
        else setStyle("largeImgOpen");
    }

    return (
        <>
            <div key={props.post.id} className="dropDown"
            >
                <img src={props.post.images.small} alt="no picture" className="small"
                    onClick={changeStyle} />
                <PokemonSound sound={props.post.name} />
                <div className={style}>
                    <img src={props.post.images.large} alt="no picture" className="image"
                        onClick={changeStyle} />
                </div>
            </div>
        </>
    )
}
export default PokemonImg;