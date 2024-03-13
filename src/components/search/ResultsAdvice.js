import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "../GlobalContext";
import SearchAdvice from "./SearchAdvice";
import BackToTop from "../BackToTop";

const ResultsAdvice = () => {
    const [error, setError] = useState(null);
    const [advice, setAdvice] = useState({});
    const [results, setResults] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getAdvices(searchStringValue);
    }, [searchStringValue]);
    console.log("iz advice searchStringValue:", searchStringValue)

    const getAdvices = async (searchStringValue) => {
        const url = `https://api.adviceslip.com/advice/search/${searchStringValue}`;

        try {
            const response = await axios.get(url);
            const data = response.data.slips;



            console.log("rezultat advicea", data)
            setAdvice(data);
            setResults(data.length);
        } catch (err) {
            setError(err);

        }

    };



    if (results == 0) {
        return (
            <>
                <br></br>
                <br></br>
                <table className="tabelaZemlje">
                    <thead>
                        <tr>
                            <th><SearchPlace /></th>
                        </tr>
                        <tr>
                            <th>Nothing found</th>
                        </tr>
                    </thead>
                </table></>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >

                    <tr>
                        <th colSpan={2}>
                        <SearchAdvice placeholder={'Advice'} linkTo={'/advice'} />
                        </th>
                    </tr>
                    <tr>
                        <th className="celebrity"
                            colSpan={2}>
                             {searchStringValue} Advice
                            </th>
                    </tr>
                    <tr className="results">
                        <th>Number of Advice: {results}</th>
                    </tr>
                    <tr>
                        <th></th>
                    </tr>
                

                </thead>



{advice.map((dataAdv) => (



                <tbody key={dataAdv.id}>
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
             



            </table >
       
<BackToTop />
        </>
    );
};
export default ResultsAdvice;