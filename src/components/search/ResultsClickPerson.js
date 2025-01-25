import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import SearchPerson from "./SearchPerson";
import BackToTop from "../BackToTop";
import { useParams } from "react-router-dom";

const ResultsClickPerson = () => {
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [celebs, setCelebs] = useState([]);
    const [resultsCel, setResultsCel] = useState([]);

    const navigate = useNavigate();

    const params = useParams()
    const linkName = params.linkName;


    useEffect(() => {
        getPerson();
    }, []);

    const getPerson = async () => {
        const url = `https://api.api-ninjas.com/v1/historicalfigures?name=${linkName}`;
        const urlCel = `https://api.api-ninjas.com/v1/celebrity?name=${linkName}`;

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
            <Loader />)
    } else if (results == 0 && resultsCel == 0) {
        return (
            <>
                <div className="pickTrivia">
                    <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                </div>
                <div className="tabelaZemlje">
                    <div className="results">Nothing found</div>
                </div>
                <div className="place"></div>
            </>
        )

    } else if (results == 0) {

        return (
            <>
                <div className="tabelaZemlje">
                    <div className="results">Nothing found</div>
                </div>
                <table className="tabelaZemlje">
                    {celebs.map((dataObj, id) => (
                        <tbody key={id} >
                            <tr>
                                <td className="navod">Name:</td>
                                <td className="historyPerson"
                                    onClick={() => {
                                        handleClick(dataObj.name);
                                        window.scrollTo({ top: 0, behavior: 'smooth'});
                                    }}
                                >{dataObj.name}</td>
                            </tr>
                            <tr>
                                <td className="navod">Gender:</td>
                                <td className="nameComm">{dataObj.gender}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}
                                    className="more"
                                    onClick={() => {
                                        handleClick(dataObj.name);
                                        window.scrollTo({ top: 0, behavior: 'smooth'});
                                        }}>
                                    more...
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
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
                            colSpan={2}>
                            Persons {linkName}</th>
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
                                onClick={() => {
                                    handleClick(dataObj.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth'});
                                    }}>
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
                                onClick={() => {
                                    handleClick(dataObj.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth'});
                                    }}>
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
                                onClick={() => {
                                    handleClick(dataObj.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth'});
                                }}
                            >{dataObj.name}</td>
                        </tr>
                        {dataObj.occupation && (
                            <tr>
                                <td className="navod">Title:</td>
                                <td className="nameComm">{dataObj.occupation?.[0]}</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}
                                className="more"
                                onClick={() => {
                                    handleClick(dataObj.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth'});
                                    }}>
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
            <div className="place"></div>
            <BackToTop />
        </>
    );
};
export default ResultsClickPerson;