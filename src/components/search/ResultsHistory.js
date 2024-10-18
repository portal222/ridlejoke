import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import SearchHistory from "./searchHistory";
import BackToTop from "../BackToTop";

const ResultsHistory = () => {
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getHistory(searchStringValue);
    }, [searchStringValue]);
    console.log("iz resulthistory searchStringValue:", searchStringValue)

    const getHistory = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/historicalevents?year=${searchStringValue}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;

            console.log("rezultat recnika", data)
            setHistory(data);
            setResults(data.length);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };
    if (isLoading) {
        return <Loader />
    } else if (results == 0) {
        return (
            <>
                <div className="pickTrivia">
                    <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                </div>
                <div className="tabelaZemlje">
                    <div className="results">Nothing found</div>
                </div>
                <div className="place"></div>
            </>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th className="history">Historical Year {searchStringValue}</th>
                    </tr>
                    <tr className="results">
                        <th>Number of History Events: {results}</th>
                    </tr>
                </thead>

                {history.map((dataObj) => (
                    <tbody key={history.word}>
                        <tr>
                            <td className="celebrity">{dataObj.day + " " + dataObj.month + " " +
                                dataObj.year}</td>
                        </tr>
                        <tr>
                            <td className="dictionary">{dataObj.event}</td>
                        </tr>
                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table >
            <BackToTop />
        </>
    );
};
export default ResultsHistory;