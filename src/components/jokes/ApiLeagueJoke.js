import React, { useState, useEffect } from "react";
import axios from 'axios';

const ApiLeagueJoke = () => {

    const [error, setError] = useState(null);
    const [joke, setJoke] = useState([]);

    useEffect(() => {
        getHumor();
    }, [])

    const getHumor = async () => {
        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/apileague";
   
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            const data = response.data;
            setJoke(data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="dadJokes">
                <div className="titleJoke">
                    ApiLeague Joke
                </div>
                <div className="border">
                {joke.joke}
                </div>
            </div>
        </>
    )
}
export default ApiLeagueJoke;