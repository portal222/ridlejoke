import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const Quotes = () => {
    const [error, setError] = useState(null);
    const [random, setRandom] = useState([]);
    const [random2, setRandom2] = useState([]);
    const [random3, setRandom3] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getDomain();
    }, []);
    console.log("quotes")

    const getDomain = async () => {

        const url = `https://api.api-ninjas.com/v1/quotes?all`;
        const url2 = `https://api.api-ninjas.com/v1/quotes?all`;
        const url3 = `https://api.api-ninjas.com/v1/quotes?all`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response2 = await axios.get(url2,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response3 = await axios.get(url3,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;
            const data2 = response2.data;
            const data3 = response3.data;

            setRandom(data[0]);
            setRandom2(data2[0]);
            setRandom3(data3[0]);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;

        navigate(LinkTo);
    }

    if (isLoading) {
        return (

            <Loader />)
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
                           window.scrollTo({ top: 0, behavior: 'smooth'});
                        }}>
                        {random.author}</p>
                </div>
                <div className="table">
                    <p className="category">{random2.category}</p>
                    <p>{random2.quote}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(random2.author);
                        window.scrollTo({ top: 0, behavior: 'smooth'});
                        }}>
                        {random2.author}</p>
                </div>
                <div className="table">
                    <p className="category">{random3.category}</p>
                    <p>{random3.quote}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(random3.author);
                            window.scrollTo({ top: 0, behavior: 'smooth'});
                            }}>
                        {random3.author}</p>
                    <hr></hr>
                </div>
            </div>
        </>
    );
};
export default Quotes;