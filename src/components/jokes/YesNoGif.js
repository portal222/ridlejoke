import React, { useState, useEffect } from "react";
import axios from 'axios';

const CatProb = () => {

    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);


    useEffect(() => {
        getJokes();
     
    }, []);

    const getJokes = async () => {

        const url = "https://yesno.wtf/api";

        try {
            const response = await axios.get(url);
            const data = response.data;
            setJokes(data);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="jokeMain">
                <div className="type">
                    Random GIF
                </div>
                <div>
                    <img src={jokes.image} alt="yesno" className="imgYes" />
                </div>
                <div className="type">
                    {jokes.answer}
                </div>
             
            </div>
        </>
    )
}
export default CatProb;