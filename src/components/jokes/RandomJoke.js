import React, { useState, useEffect } from "react";
import axios from 'axios';

const RandomJoke = () => {
    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getJokes();
    
    }, []);

    const getJokes = async () => {
        const url = `https://api.api-ninjas.com/v1/jokes`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data
            setJokes(data);

        } catch (err) {
            setError(err);
        }
    };

  




    return (
        <>
            <div className="dadJokes">
              
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
        </>
    );
};
export default RandomJoke;