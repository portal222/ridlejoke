import React, { useState, useEffect } from "react";

const BooksCoverImg = (covers) => {
    const [style, setStyle] = useState("cover");


    const changeStyle = () => {
        setStyle((prevStyle) => (prevStyle !== "cover" ? "cover" : "coverOpen"));
    };

    return (
        <>
            <div onClick={changeStyle} className="moreCovers">more covers</div>
            <div className={style} onClick={changeStyle}>

                <div className="imgContainer">
                    <img src={`https://covers.openlibrary.org/b/id/${covers}-S.jpg`} alt=" " />
                </div>
            </div>
        </>
    );
};
export default BooksCoverImg;
