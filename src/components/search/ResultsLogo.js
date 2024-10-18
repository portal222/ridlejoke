import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import SearchLogo from "./SearchLogo"
import BackToTop from "../BackToTop";








const ResultsCelebs = () => {
    const [error, setError] = useState(null);
    const [logo, setLogo] = useState([]);
    const [logo2, setLogo2] = useState([]);
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getLogos(searchStringValue);
    }, [searchStringValue]);
    console.log("iz resultLogo searchStringValue:", searchStringValue)

    const getLogos = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/logo?name=${searchStringValue}`;
        const url2 = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchStringValue}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }


                }

            );

            const response2 = await axios.get(url2);

            const data = response.data;
            const data2 = response2.data;



            console.log("rezultat Logoa", data)
            console.log("drugi logo podaci", data2)

            setLogo(data);
            setLogo2(data2);
            setResults(data.length);
            setResults2(data2.length);

            setIsLoading(false);
        } catch (err) {
            setError(err);

        }

    };



    if (isLoading) {
        return <Loader />
    } else if (results == 0 && results2 == 0) {
        return (
            <>
                <div className="pickTrivia">
                    <SearchLogo placeholder={'Logo'} linkTo={'/logo'} />
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
                        <th className="history"
                            colSpan={2}
                        >Logo {searchStringValue}</th>
                    </tr>
                    <tr className="results">
                        <th>Number of Logo:
                            {results + results2}</th>
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
                                <img
                                    className="logoImg" src={dataObj.image} /></td>

                        </tr>

                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>


                ))}
                {logo2.map((dataObj2) => (
                    <tbody>
                        <tr>
                            <td className="celebrity">
                                {dataObj2.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="celebrity">
                                <a href={`https://www.${dataObj2.domain}`} target="_blank">{dataObj2.domain}</a>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <img src={dataObj2.logo}
                                    className="logoImg" alt="no picture" />
                            </td>
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
export default ResultsCelebs;