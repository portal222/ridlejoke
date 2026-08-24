import React, { useState, useEffect } from "react";
import axios from 'axios';

const RandomJoke = () => {
    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [geekJoke, setGeekJoke] = useState([]);

    useEffect(() => {
        getJokes();

    }, []);

    const getJokes = async () => {
        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/jokes";
        const urlG = 'https://geek-jokes.sameerkumar.website/api?format=json'

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const responseG = await axios.get(urlG);
            const data = response.data
            const dataG = responseG.data
            setJokes(data);
            setGeekJoke(dataG);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="dadJokes2">

                <div className="titleJoke">
                    Random Joke
                </div>
                {jokes.map((dataObj) => (
                    <div key={dataObj.joke}
                        className="border" >
                        {dataObj.joke}
                    </div>
                ))}
            </div >
            <div className="dadJokes2">
                <div className="titleJoke">
                    Geek Joke
                </div>
                <div className="border">
                    {geekJoke.joke}
                </div>
            </div>
        </>
    );
};
export default RandomJoke;