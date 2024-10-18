import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";
import Dictionary from "./Dictionary";
import TableRowDictionary from "./TableRowDictionary";
import TableRowDictionary2 from "./TableRowDictionary2";
import BackToTop from "../BackToTop";






const ResultsDictionary = () => {
    const [error, setError] = useState(null);
    const [dictionary, setDictionary] = useState([]);
    const [dictionary2, setDictionary2] = useState([]);
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);



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
        } catch (err) {
            setError(err);
        }
    };
    if (results == 0 && results2 == 0) {
        return (
            <>
                <div className="pickTrivia">
                <Dictionary placeholder={'Word'} linkTo={'/dictionary'} />
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
                        <th className="results">Word {searchStringValue}</th>
                    </tr>


                </thead>

                <tbody>
              
                        <TableRowDictionary  dictRow={dictionary} />            
                    {dictionary2.map((dict2, id) => (
                        <TableRowDictionary2 key={id} dictRow2={dict2} />
                    ))}
                </tbody>
            </table >
            <BackToTop />
        </>
    );

};
export default ResultsDictionary;