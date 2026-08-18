import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

const RandomFact = () => {
    const [error, setError] = useState(null);
    const [facts, setFacts] = useState([]);

    useEffect(() => {
        getFacts();
    }, []);

    const getFacts = async () => {

        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/facts";


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data;

            setFacts(data);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <><div className="facts">
            <table className="table">
                <thead >
                    <tr>
                        <th >
                            <h3>Random Facts:</h3></th>
                    </tr>
                </thead>
                <tbody
                >
                    {facts.map((dataObj) => (

                        <tr key={dataObj.fact}>
                            <td >{dataObj.fact}</td>
                        </tr>
                    ))}

                    <tr>
                        <td >
                            <hr></hr>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>
        </>
    );
};
export default RandomFact;