import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import SearchPerson from "./SearchPerson";
import BackToTop from "../BackToTop";








const ResultsPerson = () => {
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [celebs, setCelebs] = useState([]);
    const [resultsCel, setResultsCel] = useState([]);

    const navigate = useNavigate();




    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getPerson(searchStringValue);
    }, [searchStringValue]);
    console.log("iz resultPerson searchStringValue:", searchStringValue)

    const getPerson = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/historicalfigures?name=${searchStringValue}`;
        const urlCel = `https://api.api-ninjas.com/v1/celebrity?name=${searchStringValue}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const responseCel = await axios.get(urlCel,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;
            const dataCel = responseCel.data;




            console.log("rezultat poznatih", data)
            setPersons(data);
            setResults(data.length);
            setCelebs(dataCel);
            setResultsCel(dataCel.length);
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
            <SearchPlace />,
            <Loader />)
    } else if (results == 0 && resultsCel == 0) {
        return (
            <div>
                <SearchPlace />
                <h2 className="history">Nothing found</h2>
            </div>
        )

    } else if (results == 0) {


        return (
            <>
                <div>
                    <SearchPlace />
                    <h2 className="history">Nothing found in history</h2>
                </div>
                <table className="tabelaZemlje">
                    {celebs.map((dataObj, id) => (
                        <tbody key={id} >
                            <tr>
                                <td className="navod">Name:</td>
                                <td className="historyPerson"
                                    onClick={() => handleClick(dataObj.name)}
                                >{dataObj.name}</td>

                            </tr>
                            <tr>
                                <td className="navod">Gender:</td>
                                <td className="nameComm">{dataObj.gender}</td>

                            </tr>
                            <tr>
                                <td colSpan={2}
                                    className="more"
                                    onClick={() => handleClick(dataObj.name)}>

                                    more...
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >

                    <tr>
                        <th colSpan={2}>
                            <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                        </th>
                    </tr>
                    <tr>
                        <th className="history"
                            colSpan={2}>
                            Persons {searchStringValue}</th>
                    </tr>
                    <tr className="results">
                        <th colSpan={2}>Number of Historyc persons: {results}</th>
                    </tr>
                </thead>
                {persons.map((dataObj) => (
                    <tbody key={dataObj.name} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="historyPerson"
                                onClick={() => handleClick(dataObj.name)}>
                                {dataObj.name}</td>
                        </tr>
                        {dataObj.title && (
                            <tr>
                                <td className="navod">Title:</td>
                                <td className="nameComm">{dataObj.title}</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}
                                className="more"
                                onClick={() => handleClick(dataObj.name)}>

                                more...
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table >

            <table className="tabelaZemlje">
                <thead>
                    <tr className="results">
                        <th colSpan={2}>Number of Celebrity persons: {resultsCel}</th>
                    </tr>
                </thead>
                {celebs.map((dataObj, id) => (
                    <tbody key={id} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="historyPerson"
                                onClick={() => handleClick(dataObj.name)}
                            >{dataObj.name}</td>

                        </tr>
                        {dataObj.gender && (
                            <tr>
                                <td className="navod">Gender:</td>
                                <td className="nameComm">{dataObj.gender}</td>

                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}
                                className="more"
                                onClick={() => handleClick(dataObj.name)}>

                                more...
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <BackToTop />
        </>
    );
};
export default ResultsPerson;