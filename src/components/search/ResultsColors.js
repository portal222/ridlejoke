import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import BackToTop from "../BackToTop";








const ResultsColors = () => {
    const [error, setError] = useState(null);
    const [colors, setColors] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();






    useEffect(() => {
        getColors();
    }, []);


    const getColors = async () => {
        const url = `./colors.json`;

        try {
            const response = await axios.get(url);
            const data = response.data;



            console.log("rezultat boja", data)
            setColors(data);
            setResults(data.length);
            setIsLoading(false);

        } catch (err) {
            setError(err);

        }

    };






    if (isLoading) {
        return (

            <Loader />)
    }
    return (
        <>
            <div className="gridColor">


                {colors.map((dataObj) => (






                    <div className="dropdown"
                        style={{ backgroundColor: `${dataObj.hex}` }}>
                        <span className="dropdown-content"
                            onClick={() => {
                                navigator.clipboard.writeText(dataObj.hex)
                            }}>
                            <p>{dataObj.name}</p>
                            <p    >
                                {dataObj.hex}</p>
                        </span>
                    </div>
                ))}
            </div >
            <BackToTop />
        </>
    );
};
export default ResultsColors;