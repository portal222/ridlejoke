import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";

import Loader from "../Loader";






const ResultsDictionary = () => {
    const [error, setError] = useState(null);
    const [dictionary, setDictionary] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [robot, setRobot] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getDictionary(searchStringValue);
        getRobot(searchStringValue);
    }, [searchStringValue]);
    console.log("iz resultDictionary searchStringValue:", searchStringValue)
 
    const getDictionary = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/dictionary?word=${searchStringValue}`;

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
            setDictionary(data);
            setResults(data.length);
            setIsLoading(false);
        } catch (err) {
            setError(err);

        }
        
    };

    const getRobot = async (searchStringValue) => {
        const url = `https://robohash.org/${searchStringValue}.png`
     

        try {
            const response = await axios.get(url);
            const data = response;
            console.log("robot randum slike", data)
            setRobot(url)
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
                        <th className="history">Word {searchStringValue}</th>
                    </tr>
              

                </thead>

              



                    <tbody key={dictionary.word} 
                    >
                        <tr>
                           
                            <td className="celebrity">{dictionary.word}</td>
                        </tr>
                        <tr>
                           
                           <td className="dictionary">{dictionary.definition}</td>
                       </tr>
                       <tr>
                        <td>
                            <img src={robot}></img>
                        </td>
                       </tr>

                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>


           
            </table >

        </>
    );
};
export default ResultsDictionary;