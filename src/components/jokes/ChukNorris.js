import React, { useState, useEffect } from "react";
import axios from 'axios';

const ChukNorris = () => {

    const [error, setError] = useState(null);
    const [facts, setFacts] = useState([]);
    const [robot, setRobot] = useState([]);
    const [chuck2, setChuck2] = useState([]);

    useEffect(() => {
        getFacts();
        getRobot();
    }, [])

    const getFacts = async () => {

        const url = `https://api.api-ninjas.com/v1/chucknorris?`

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;
            setFacts(data);

        } catch (err) {
            setError(err);
        }
    };

    const name = Math.random();

    const getRobot = async () => {
        const url = `https://robohash.org/set_set1/${name}.png`
        const urlChuck = `https://api.chucknorris.io/jokes/random`

        try {
            const response = await axios.get(url);
            const responseC = await axios.get(urlChuck);
            const data = response;
            const dataC = responseC;

            console.log("vicevi novi chuck", dataC)
            setChuck2(dataC.data)
            setRobot(url)
        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="dadJokes">
                <div className="titleJoke">
                    CHUCK NORRIS JOKE
                </div>
                <div className="border">{facts.joke}</div>
                <div className="border">{chuck2.value}</div>
                <div>
                    <img src={robot}></img>
                </div>
            </div>
        </>
    )
}
export default ChukNorris;