import React, { useState, useEffect } from "react";
import axios from 'axios';
import yomomma from '../../../public/yomomma.json';

const DadJokes = () => {

    const [error, setError] = useState(null);
    const [dad, setDad] = useState([]);
    const [joke, setJoke] = useState([]);

    const number = Math.floor(Math.random() * 977);
    const number2 = Math.floor(Math.random() * 977);



    useEffect(() => {
        getDad();
        getJoke();
    }, [])

    const getDad = async () => {

        const url = 'https://api.api-ninjas.com/v1/dadjokes'

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                });
            const data = response.data;
            setDad(data);

        } catch (err) {
            setError(err);
        }

    };

    const getJoke = async () => {
        const url = "https://icanhazdadjoke.com/"

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            const data = response.data;
            setJoke(data);
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="dadJokes">
                <div className="titleJoke">
                    DAD JOKE
                </div>
                {dad.map((fact) => (
                    <div key={fact.joke}
                        className="border">
                        {fact.joke}
                    </div>
                ))}
                <div className="border">
                    {joke.joke}
                </div>
                <div className="titleJoke">
                    YO MOMMA JOKE
                </div>
                <div className="border">
                    {yomomma?.[number]?.text}
                </div>
                <div className="border">
                    {yomomma?.[number2]?.text}
                </div>
            </div>
        </>
    )
}
export default DadJokes;