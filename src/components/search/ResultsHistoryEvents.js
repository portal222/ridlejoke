import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import SearchHistoryEvents from "./searchHistoryEvents";
import BackToTop from "../BackToTop";

const ResultsHistoryEvents = () => {
    const [error, setError] = useState(null);
    const [historyEvents, setHistoryEvents] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getHistoryEvents(searchStringValue);
    }, [searchStringValue]);

    const getHistoryEvents = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/historicalevents?text=${searchStringValue}`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;

            setHistoryEvents(data);
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
                    <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />
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
                        <th className="history">Historical Event {searchStringValue}</th>
                    </tr>
                    <tr className="results">
                        <th>Number of Event:
                            {results}</th>
                    </tr>
                </thead>
                {historyEvents.map((dataObj) => (
                    <tbody key={historyEvents.word}>
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
export default ResultsHistoryEvents;