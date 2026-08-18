import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Quotes = () => {
    const [error, setError] = useState(null);
    const [random, setRandom] = useState([]);
    const [random2, setRandom2] = useState([]);
    const [random3, setRandom3] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getDomain();
    }, []);

    const getDomain = async () => {
        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/quotes";
        const url2 = "https://ridlejoke-proxy.kvaka32.workers.dev/quotes";
        const url3 = "https://ridlejoke-proxy.kvaka32.workers.dev/quotes";

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const response2 = await axios.get(url2,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const response3 = await axios.get(url3,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            const data = response.data;
            const data2 = response2.data;
            const data3 = response3.data;

            setRandom(data[0]);
            setRandom2(data2[0]);
            setRandom3(data3[0]);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div className="facts">
                <div className="table">
                    <h3>Random Quotes:</h3>
                    <p className="category">{random.category}</p>
                    <p>{random.quote}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(random.author);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {random.author}</p>
                </div>
                <div className="table">
                    <p className="category">{random2.category}</p>
                    <p>{random2.quote}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(random2.author);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {random2.author}</p>
                </div>
                <div className="table">
                    <p className="category">{random3.category}</p>
                    <p>{random3.quote}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(random3.author);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {random3.author}</p>
                </div>
            </div>
        </>
    );
};
export default Quotes;