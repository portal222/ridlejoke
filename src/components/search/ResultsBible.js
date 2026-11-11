import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import BackToTop from "../BackToTop";
import { useNavigate } from "react-router-dom";
import ResultsBibleDay from "./ResultsBibleDay";

// import SearchBible from "./searchBible";

const ResultsBible = () => {
    const [error, setError] = useState(null);
    const [bible, setBible] = useState([]);
    const [biblePhrase, setBiblePhrase] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getPhrase(searchStringValue)
        getBible(searchStringValue);
    }, [searchStringValue]);

    const getBible = async (searchStringValue) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/bible?q=${searchStringValue}`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data;

            console.log("detalji biblije", response);

            setBible(data.results);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const getPhrase = async (searchStringValue) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/biblephrase?q=${searchStringValue}`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data;

            console.log("detalji biblije fraze", data);

            setBiblePhrase(data.results);
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
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th className="history">Bible {searchStringValue}</th>
                    </tr>

                </thead>
                {bible.map((dataObj, id) => (
                    <tbody key={id}>
                        <tr>
                            <td className="biblRef"
                                onClick={() => {
                                    handleClick(dataObj.reference);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >{dataObj.reference}</td>
                        </tr>
                        <tr>
                            <td className="dictionary">{dataObj.text}</td>
                        </tr>
                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
                <tbody>
                    <tr>
                        <td className="history">
                            Results by psalms
                        </td>
                    </tr>
                </tbody>
                {biblePhrase.map((dataObj, id) => (
                    <tbody key={id}>
                        <tr>
                            <td className="biblRef"
                                onClick={() => {
                                    handleClick(dataObj.reference);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >{dataObj.reference}</td>
                        </tr>
                        <tr>
                            <td className="dictionary">{dataObj.text}</td>
                        </tr>
                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table >
            <ResultsBibleDay />
            <BackToTop />
        </>
    );
};
export default ResultsBible;