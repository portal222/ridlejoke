import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";

import Loader from "../Loader";
import TableRowDictionary from "./TableRowDictionary";
import TableRowDictionary2 from "./TableRowDictionary2";






const ResultsDictionary = () => {
    const [error, setError] = useState(null);
    const [dictionary, setDictionary] = useState([]);
    const [dictionary2, setDictionary2] = useState([]);
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getDictionary(searchStringValue);

    }, [searchStringValue]);
    console.log("iz resultDictionary searchStringValue:", searchStringValue)

    const getDictionary = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/dictionary?word=${searchStringValue}`;
        const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchStringValue}`;


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
            const data2 = response2.data



            console.log("rezultat recnika", data)
            console.log("rezultat drugo recnika", data2)
            setDictionary(data);
            setDictionary2(data2);
            setResults(data.length);
            setResults2(data2.length);

            console.log("prvi niz", results)
            console.log("drugi niz", results2)
            setIsLoading(false);
        } catch (err) {
            setError(err);

        }

    };



    if (isLoading) {
        return <Loader />
    } else 
    if (results == 0 && results2 == 0) {
        return (
            <>
                <div>
                    <SearchPlace />
                    <h2 className="history">Nothing found</h2>
                </div>
            </>
        )
    }
    else if (results2 == 0) {
        return (
            <table className="tabelaZemlje">
                <thead>
                    <tr>
                        <th>
                            <SearchPlace />

                        </th>
                    </tr>
                    <tr>
                        <th className="results">
                            Number of Objects {results}
                        </th>
                    </tr>
                </thead>
                <tbody>
                 
                        <TableRowDictionary key={dictionary.phonetic} dictRow={dictionary} />

              
                </tbody>
            </table>
        )
    } else if (results == 0) {
        return (
            <table className="tabelaZemlje">
                <thead>
                    <tr>
                        <th>
                            <SearchPlace />

                        </th>
                    </tr>
                    <tr>
                        <th className="results">
                            Number of Objects {results2}
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                        <TableRowDictionary key={dictionary.id} dictRow={dictionary} />

                
                    {dictionary2.map((dict2) => (
                        <TableRowDictionary2 dictRow2={dict2} />

                    ))}
                </tbody>
            </table>
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
                        <th className="results">Word {searchStringValue}</th>
                    </tr>


                </thead>

                <tbody>
              
                        <TableRowDictionary  dictRow={dictionary} />

                
                    {dictionary2.map((dict2) => (
                        <TableRowDictionary2 dictRow2={dict2} />
                    ))}
                </tbody>



            </table >

        </>
    );

};
export default ResultsDictionary;