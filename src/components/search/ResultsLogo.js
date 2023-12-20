import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";
import Footers from "../Footers";
import Loader from "../Loader";








const ResultsCelebs = () => {
    const [error, setError] = useState(null);
    const [logo, setLogo] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getLogos(searchStringValue);
    }, [searchStringValue]);
    console.log("iz resultLogo searchStringValue:", searchStringValue)

    const getLogos = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/logo?name=${searchStringValue}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }


                }

            );
            const data = response.data;



            console.log("rezultat Logoa", data)
            setLogo(data);
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
                <div>
                    <SearchPlace />
                    <h2 className="history">Nothing found</h2>
                </div>
            </>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >

                    <tr>
                        <th colSpan={2}>
                            <SearchPlace />
                        </th>
                    </tr>
                    <tr>
                        <th className="history"
                            colSpan={2}
                        >Logo {searchStringValue}</th>
                    </tr>
                    <tr className="results">
                        <th>Number of Logo:
                        {results}</th>
                    </tr>

                </thead>

                {logo.map((dataObj) => (



                    <tbody key={dataObj.name} >
                        <tr>

                            <td className="celebrity">{dataObj.name}</td>

                        </tr>
                        <tr>

                            <td className="celebrity">{dataObj.ticker}</td>

                        </tr>
                        <tr>

                            <td >
                                <img src={dataObj.image} /></td>

                        </tr>

                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>


                ))}
            </table >
            <Footers />

        </>
    );
};
export default ResultsCelebs;