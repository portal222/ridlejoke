import React from "react";
import { useNavigate } from "react-router-dom";



const PickTrivia = () => {





    const navigate = useNavigate();








    const handleRidle = () => {
        console.log("klik na ridles");
        const LinkTo = '/ridles';
        navigate(LinkTo);
    }

    const handleGeneral = () => {

        const LinkTo = '/general';
        navigate(LinkTo);
    }
    const handleArt = () => {
        console.log("klik na Art Literature");
        const LinkTo = '/art';
        navigate(LinkTo);
    }
    const handleFood = () => {

        const LinkTo = '/food';
        navigate(LinkTo);
    }
    const handleScience = () => {
        console.log("klik na Science");
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
                    <div onClick={() => handleGeneral()}
                        className="category">
                        General
                    </div>
                    <div onClick={() => handleLanguage()}
                        className="category">
                        Language
                    </div>
                    <div onClick={() => handleArt()}
                        className="category">
                        Art & Literature
                    </div>
                    <div onClick={() => handleScience()}
                        className="category">
                        Science & Nature
                    </div>
                    <div onClick={() => handleFood()}
                        className="category">
                        Food & Drink
                    </div>
                    <div onClick={() => handlePeople()}
                        className="category">
                        People & Place
                    </div>
                    <div onClick={() => handleHistory()}
                        className="category">
                        History & Holidays
                    </div>
                </div>
                <div>
                    <div onClick={() => handleGeography()}
                        className="category">
                        Geography
                    </div>
                    <div onClick={() => handleEntertainment()}
                        className="category">
                        Entertainment
                    </div>
                    <div onClick={() => handleToys()}
                        className="category">
                        Toys & Games
                    </div>
                    <div onClick={() => handleMusic()}
                        className="category">
                        Music
                    </div>
                    <div onClick={() => handleLanguage()}
                        className="category">
                        Language
                    </div>
                    <div onClick={() => handleReligion()}
                        className="category">
                        Religion & Mythology
                    </div>
                    <div onClick={() => handleSport()}
                        className="category">
                        Sports & Leisure
                    </div>
                    <div onClick={() => handleMathematics()}
                        className="category">
                        Mathematicss
                    </div>
                </div>
            </div>
            <div className="place"></div>
            </>
    )
}
export default PickTrivia;