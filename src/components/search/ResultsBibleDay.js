import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const ResultsBibleDay = () => {
    const [error, setError] = useState(null);
    const [bible, setBible] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {

        getBible();
    }, []);

    const getBible = async () => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/bibleDay`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data;

            setBible(response.data.passages);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (reference) => {
        const LinkTo = `/bible/${reference}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="facts">
                <div className="table">
                    <p className="category">Bible</p>
                    <p>{bible?.[0].text}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(bible?.[0].reference);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {bible?.[0].reference}</p>
                </div>
            </div>
        </>
    );
};
export default ResultsBibleDay;