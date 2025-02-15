import React from "react";
import { useNavigate } from "react-router-dom";

const PickTrivia = () => {

    const navigate = useNavigate();

    const handleRidle = () => {
        const LinkTo = '/ridles';
        navigate(LinkTo);
    }
    const handleGeography = () => {
        const LinkTo = '/geography';
        navigate(LinkTo);
    }

    window.scrollTo({ top: 0, behavior: 'smooth'});
   
    return (
        <>
            <div className="pickTrivia">
                <div>
                    <div onClick={() => handleRidle()}
                        className="category">
                        Riddles
                    </div>
                </div>
                <div>
                    <div onClick={() => handleGeography()}
                        className="category">
                        Quiz
                    </div>
                </div>
            </div>
            <div className="place"></div>
        </>
    )
}
export default PickTrivia;