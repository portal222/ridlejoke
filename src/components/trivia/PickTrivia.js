import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PickTrivia = () => {

    const [trivia, setTrivia] = useState([]);
    const [error, setError] = useState(null);


    const navigate = useNavigate();


    useEffect(() => {
        getTrivia();
    }, []);

    const getTrivia = async () => {
        const url = "./triviaCategory.json";

        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log("izabrana trivia", data);
            setTrivia(data);
        } catch (err) {
            setError(err);
        }
    }

    const handleClick = (triviaCat) => {
        console.log("trivia izbor", triviaCat);
        const LinkTo = `/trivia/${triviaCat}`;
        navigate(LinkTo)
    }

    const handleRidles = () => {
        console.log("klik na ridles");
        const LinkTo = '/ridles';
        navigate(LinkTo);
    }
 



    return (
        <>
            <div className="trivia">
              
                <div onClick={() => handleRidles()}
                    className="category">
                    Ridles
                </div>
                {trivia.map((dataObj) => (
                    <div
                    key={dataObj.name}
                    onClick={() => handleClick(dataObj.category)}
                        className="category">
                        {dataObj.name}
                    </div>
                ))}


            </div></>
    )
}
export default PickTrivia;