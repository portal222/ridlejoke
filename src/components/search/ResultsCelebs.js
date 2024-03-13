import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";
import SearchBox from "./SearchBox";
import Loader from "../Loader";
import BackToTop from "../BackToTop";

const ResultsCelebs = () => {
    const [error, setError] = useState(null);
    const [celebrity, setCelebrity] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

  



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getCelebs(searchStringValue);
       
     
    }, [searchStringValue]);
    console.log("iz resultCelebs searchStringValue:", searchStringValue)
  
    const getCelebs = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/celebrity?name=${searchStringValue}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;



            console.log("rezultat poznatih", data)
            setCelebrity(data);
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
                <SearchBox placeholder={'Celebrity'} linkTo={'/poznati'} />
                          
                        </th>
                    </tr>
                    <tr>
                        <th className="history"
                            colSpan={2}>
                            Celebrity {searchStringValue}</th>
                    </tr>
                    <tr >
                        <th 
                        className="results"
                        colSpan={2}>Number of Celebrity: {results}
                        </th>
                    </tr>

                </thead>

                {celebrity.map((dataObj) => (



                    <tbody key={dataObj.name} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="celebrity">{dataObj.name}</td>

                        </tr>
                        <tr>
                            <td className="navod">Gender:</td>
                            <td className="nameComm">{dataObj.gender}</td>

                        </tr>
                        <tr>
                            <td className="navod">Age:</td>
                            <td className="nameComm">{dataObj.age}</td>

                        </tr>
                        <tr>
                            <td className="navod">Occupation:</td>
                            <td className="nameComm">
                                <ul>
                                    <li>{dataObj.occupation?.[0]}</li>
                                    <li>{dataObj.occupation?.[1]}</li>
                                    <li>{dataObj.occupation?.[2]}</li>
                                    <li>{dataObj.occupation?.[3]}</li>
                                    <li>{dataObj.occupation?.[4]}</li>
                                    <li>{dataObj.occupation?.[5]}</li>
                                    <li>{dataObj.occupation?.[6]}</li>
                                    <li>{dataObj.occupation?.[7]}</li>
                                    <li>{dataObj.occupation?.[8]}</li>
                                    <li>{dataObj.occupation?.[9]}</li>
                                    <li>{dataObj.occupation?.[10]}</li>
                                    <li>{dataObj.occupation?.[11]}</li>
                                    <li>{dataObj.occupation?.[12]}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Birthday:</td>
                            <td className="nameComm">{dataObj.birthday}</td>

                        </tr>
                        <tr>
                            <td className="navod">Death:</td>
                            <td className="nameComm">{dataObj.death}</td>

                        </tr>
                        <tr>
                            <td className="navod">Nationality:</td>
                            <td className="celebrity">{dataObj.nationality}</td>

                        </tr>
                        <tr>
                            <td className="navod">Height:</td>
                            <td className="nameComm">{dataObj.height}</td>

                        </tr>
                        <tr>
                            <td className="navod">Net worth:</td>
                            <td className="networth">{dataObj.net_worth}</td>
                        </tr>
                      

                        <tr>
                            <td colSpan={2}>
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