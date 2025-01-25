import React from "react";
import { useNavigate } from "react-router-dom";



const PickTrivia = () => {





    const navigate = useNavigate();








    const handleRidle = () => {
        const LinkTo = '/ridles';
        navigate(LinkTo);
    }

    const handleGeneral = () => {
        const LinkTo = '/general';
        navigate(LinkTo);
    }
    const handleArt = () => {
        const LinkTo = '/art';
        navigate(LinkTo);
    }
    const handleFood = () => {
        const LinkTo = '/food';
        navigate(LinkTo);
    }
    const handleScience = () => {
        const LinkTo = '/science';
        navigate(LinkTo);
    }
    const handlePeople = () => {
        const LinkTo = '/people';
        navigate(LinkTo);
    }
    const handleHistory = () => {
        const LinkTo = '/holidays';
        navigate(LinkTo);
    }
    const handleGeography = () => {
        const LinkTo = '/geography';
        navigate(LinkTo);
    }
    const handleEntertainment = () => {
        const LinkTo = '/entertainment';
        navigate(LinkTo);
    }
    const handleToys = () => {
        const LinkTo = '/toys';
        navigate(LinkTo);
    }
    const handleMusic = () => {
        const LinkTo = '/music';
        navigate(LinkTo);
    }
    const handleLanguage = () => {
        const LinkTo = '/language';
        navigate(LinkTo);
    }
    const handleReligion = () => {
        const LinkTo = '/religion';
        navigate(LinkTo);
    }
    const handleSport = () => {
        const LinkTo = '/sport';
        navigate(LinkTo);
    }
    const handleMathematics = () => {
        const LinkTo = '/mathematics';
        navigate(LinkTo);
    }

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