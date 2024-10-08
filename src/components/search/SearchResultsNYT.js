import React, { useState, useEffect, useContext } from "react";

import GlobalContext from "../GlobalContext";
import axios from "axios";
import BackToTop from "../BackToTop";
import Loader from "../Loader";

import NyTimes from "./NyTimes";

const SearchResutsNYT = () => {

    const [error, setError] = useState(null);
   
    const [isLoading, setIsLoading] = useState(true);

    const [nyTimes, setNyTimes] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;
  

    console.log("searchStringvalue NYT", searchStringValue)

    useEffect(() => {
        getTimes(searchStringValue);
    }, [searchStringValue]);

    const getTimes = async (searchStringValue) => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchStringValue}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        try {
            const response = await axios.get(url);
            const data = response.data;
            
            console.log("NYT podaci", data);

            setIsLoading(false);
            setNyTimes(data.response.docs);
        setResults(data.response.docs.length)


        } catch (err) {
            setError(err);
        }
    };



    // const getTimes = async (searchStringValue) => {
    //     const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchStringValue}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

    //     const response = await fetch(url);
    //     const data = await response.json();
    //     console.log(" podaci NYTymes ", data.response.docs);
    //     setIsLoading(false);

    //     setNyTimes(data.response.docs);
    //     setResults(data.response.docs.length)
    // }

    if (isLoading) {
        return <Loader />
    } 

    return (
        <>  
            <NyTimes news={nyTimes} />
            <div>{<BackToTop />}</div>
        </>
    )
};
export default SearchResutsNYT;