import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Collapse } from "antd";
import Loader from "../Loader";


const JokesRandom = () => {

    const [error, setError] = useState(null);
    const [randumJokes, setRandumJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getRandumJokes();
    }, []);

    const getRandumJokes = async () => {

        const url = "https://v2.jokeapi.dev/joke/Any?safe-mode";

        try {
            const response = await axios.get(url);
            const data = response.data;

            setRandumJokes(data);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const text = randumJokes.delivery


    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <div className="jokeMain" >
                <div className="type">Random joke category: {randumJokes.category}</div>
                <Collapse
                    size="large"
                    items={[{
                        label: <p className="jokeAnswer">{randumJokes.setup}  {randumJokes.joke}</p>,
                        children: <p className="jokeAns">{text}</p>,
                        showArrow: false,
                    }]} />
            </div>
        </>
    )
}
export default JokesRandom;