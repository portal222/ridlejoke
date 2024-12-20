import React, { useState, useEffect } from "react";
import axios from 'axios';

const RandomJoke = () => {
    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [memes, setMemes] = useState([]);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getJokes();
        getMeme();
        getFoods();
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
    //proba sa hranom sa sajta spoonacular.com ne radi greska 401 not autorised

    const getFoods = async () => {
        const url = `https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&api-key=9dc2ab130eca44bc9e2aba4f4105bc3b`;
        
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            const data = response.data
            console.log("detalji Hrane", data)
            setFoods(data);
            
        } catch (err) {
            setError(err);
        }
    };
    // proba sa memama ali je problem sa cors police


    const getMeme = async () => {
        const url = `https://api.humorapi.com/jokes/random?api-key=b24572de7bd9447fbe7b2a7dae8e0eb8`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Quota-Request': 1,
                        'X-API-Quota-Used': 10
                    }
                }
            );
            const data = response.data
            console.log("detalji mema", data)
            setMemes(data);

        } catch (err) {
            setError(err);
        }
    };


   

    return (
        <>
            <div className="dadJokes">
                <div>
                    <img src={memes.url} alt=" " />
                </div>
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