import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Dictionary from "./Dictionary";
import TableRowDictionary from "./TableRowDictionary";
import TableRowDictionary2 from "./TableRowDictionary2";
import BackToTop from "../BackToTop";
import FreeDictionary from "./FreeDictionary";
import FreeDictionarySr from "./FreeDictionarySr";

const ResultsDictionary = () => {
    const [error, setError] = useState(null);
    const [dictionary, setDictionary] = useState([]);
    const [dictionary2, setDictionary2] = useState([]);
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const [advice, setAdvice] = useState({});
    const [resultsAd, setResultsAd] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getDictionary(searchStringValue);

    }, [searchStringValue]);

    const getDictionary = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/dictionary?word=${searchStringValue}`;
        const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchStringValue}`;
        const urlAd = `https://api.adviceslip.com/advice/search/${searchStringValue}`;


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response2 = await axios.get(url2);
            const responseAd = await axios.get(urlAd);

            const data = response.data;
            const data2 = response2.data;
            const dataAd = responseAd.data;

            setDictionary(data);
            setDictionary2(data2);
            setAdvice(dataAd)
            setResults(data.length);
            setResults2(data2.length);
            setResultsAd(dataAd);

        } catch (err) {
            setError(err);
        }
    };


    if (results == 0 && results2 == 0 && resultsAd == 0) {
        return (
            <>
                <div className="pickTrivia">
                    <Dictionary placeholder={'Word'} linkTo={'/dictionary'} />
                </div>
                <div className="tabelaZemlje">
                    <div className="results">Nothing found</div>
                </div>
                <FreeDictionary dictionary={searchStringValue} />
                <FreeDictionarySr dictionary={searchStringValue} />
                <div className="place"></div>
            </>
        )
    }
    return (
        <>
            <div className="pickTrivia">
                <Dictionary placeholder={'Word'} linkTo={'/dictionary'} />
            </div>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th className="results"> Word {searchStringValue}</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowDictionary dictRow={dictionary} />
                    {dictionary2.map((dict2, id) => (
                        <TableRowDictionary2 key={id} dictRow2={dict2} />
                    ))}
                </tbody>
            </table >
            <FreeDictionary dictionary={searchStringValue} />
            <FreeDictionarySr dictionary={searchStringValue} />
            <div className="tabelaZemlje">
                <hr></hr>
            </div>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th className="celebrity"
                            colSpan={2}>
                            {searchStringValue} Advice
                        </th>
                    </tr>
                    <tr className="results">
                        {resultsAd?.message?.text && (
                            <th> {resultsAd?.message?.text}</th>
                        )}
                    </tr>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                {advice.slips && (
                    <>
                        {advice.slips.map((dataAdv, id) => (
                            <tbody key={id}>
                                <tr>
                                    <td className="celebrity">{dataAdv.advice}</td>
                                </tr>
                                <tr>
                                    <td className="nameComm">{dataAdv.date}</td>
                                </tr>
                                <tr>
                                    <td >
                                        <hr></hr>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </>
                )}
            </table >
            <div className="place"></div>

            <BackToTop />
        </>
    );

};
export default ResultsDictionary;