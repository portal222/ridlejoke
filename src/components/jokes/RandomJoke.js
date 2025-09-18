import React, { useState, useEffect } from "react";
import axios from 'axios';

const RandomJoke = () => {
    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [geekJoke, setGeekJoke] = useState([]);

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getJokes();
    
    }, []);

    const getJokes = async () => {
        const url = `https://api.api-ninjas.com/v1/jokes`;
        const urlG = 'https://geek-jokes.sameerkumar.website/api?format=json'

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
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
                    RANDOM JOKE
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
                    GEEK JOKE
                </div>
                <div className="border">
                    {geekJoke.joke}
                </div>
            </div>
        </>
    );
};
export default RandomJoke;