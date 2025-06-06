import React, { useState, useEffect, useContext } from "react";
import BackToTop from "../BackToTop";
import data from "../../../public/colors.json";

const ResultsColors = () => {
   
    return (
        <>
            <div className="gridColor">
                {data.map((dataObj, id) => (
                    <div className="dropdown" key={id}
                        style={{ backgroundColor: `${dataObj.hex}` }}>
                        <span className="dropdown-content"
                            onClick={() => {
                                navigator.clipboard.writeText(dataObj.hex)
                            }}>
                            <p>{dataObj.name}</p>
                            <p    >
                                {dataObj.hex}</p>
                        </span>
                    </div>
                ))}
            </div >
            <BackToTop />
        </>
    );
};
export default ResultsColors;