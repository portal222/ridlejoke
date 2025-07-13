import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Quotes = () => {
    const [error, setError] = useState(null);
    const [random, setRandom] = useState([]);
    const [random2, setRandom2] = useState([]);
    const [random3, setRandom3] = useState([]);
    const [buda, setBuda] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        getDomain();
        getBuda();
    }, []);

    const getDomain = async () => {

        const url = `https://api.api-ninjas.com/v1/quotes?all`;
        const url2 = `https://api.api-ninjas.com/v1/quotes?all`;



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


            const data = response.data;
            const data2 = response2.data;


            setRandom(data[0]);
            setRandom2(data2[0]);



        } catch (err) {
            setError(err);
        }
    };

    const getBuda = async () => {
        const urlB = `https://buddha-api.com/api/random`
        try {
            const responseB = await axios.get(urlB);
            const dataB = responseB.data

            setBuda(dataB);


        } catch (err) {
            setError(err);
        }


    }

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
                    <p >
                        <img src={buda.byImage} style={{ width: "350px", paddingBottom: "15px" }} /></p>
                    <p>{buda.text}</p>
                    <p className="author"
                        onClick={() => {
                            handleClick(buda.byName);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {buda.byName}</p>
                    <hr></hr>
                </div>
            </div>
        </>
    );
};
export default Quotes;