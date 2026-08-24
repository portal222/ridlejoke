import React, { useState, useEffect } from "react";
import axios from 'axios';

const HumorApi = () => {

    const [error, setError] = useState(null);
    const [joke, setJoke] = useState([]);
    const [humorMeme, setHumorMeme] = useState([]);

    useEffect(() => {
        getHumor();
        getMeme();
    }, [])

    const getHumor = async () => {

        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/humorapi";
   
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

    const getMeme = async () => {

        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/humorapimeme";

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            const data = response.data;
            setHumorMeme(data);
            console.log("humor api meme detalji", data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="dadJokes2">
                <div className="border">
                    {joke.joke}
                </div>
                <div >
                    {humorMeme.url && (
                        <img src={humorMeme.url} alt="no picture" />
                    )}
                    <p style={{padding: "8px"}}>{humorMeme.description}</p>
                </div>
            </div>
        </>
    )
}
export default HumorApi;