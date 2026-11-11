import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Collapse } from "antd";

const JokesOfficial = () => {

    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [fox, setFox] = useState([]);
    const [teehee, setTeehee] = useState([]);

    useEffect(() => {
        getJokes();
        getFox();
        getTeehee();
    }, []);

    const getJokes = async () => {

        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/official";

        try {
            const response = await axios.get(url);
            const data = response.data;
console.log("official joke",data)
           
        } catch (err) {
            setError(err);
        }
    };

    const getTeehee = async () => {
        const urlT = "https://teehee.dev/api/joke"

            try {
            const responseT = await axios.get(urlT);
            const dataT = responseT.data;
            setTeehee(dataT);
        } catch (err) {
            setError(err);
        }
    };

    

    const getFox = async () => {
        const url = "https://randomfox.ca/floof/";

        try {
            const response = await axios.get(url);
            const data = response.data

            setFox(data);

        } catch (err) {
            setError(err);
        }
    };

    const text = jokes.punchline

    return (
        <>
            <div className="jokeMain" >
             
               
                <Collapse
                    size="large"
                    items={[{
                        label: <p className="jokeAnswer">{teehee.question}</p>,
                        children: <p className="jokeAns">{teehee.answer}</p>,
                        showArrow: false,
                    }]} />
                <div>
                    <img src={fox.image} alt="fox" style={{ paddingTop: "20px" }} className="imgYes" />
                </div>
            </div>
        </>
    )
}
export default JokesOfficial;