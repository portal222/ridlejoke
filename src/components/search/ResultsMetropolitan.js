import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchMetropolitan from "./SearchMetropolitan";
import GlobalContext from "../GlobalContext";
import TableRowMetro from "./TableRowMetro";
import TableRowMetroTitle from "./TableRowMetroTitle";
import SearchPlace from "./SearchPlace";
import Loader from "../Loader";
import BackToTop from "../BackToTop";


const ResultsMetropolitan = () => {
    const [error, setError] = useState(null);
    const [metro, setMetro] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState([]);


    const [prikaz, setPrikaz] = useState([]);
    const [results, setResults] = useState([]);



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;






    useEffect(() => {
        getMetro(searchStringValue);
    }, [searchStringValue]);

    const getMetro = async (searchStringValue) => {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=${searchStringValue}`
        // const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?medium="Sculpture"&artistOrCulture=true&q=${searchStringValue}`
        // const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=-300&dateEnd=300&q=${searchStringValue}`
        // const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchStringValue}`
        const urlTitle = `https://collectionapi.metmuseum.org/public/collection/v1/search?title=true&q=${searchStringValue}`


        try {
            const response = await axios.get(url);
            const data = response.data;

            const responseTit = await axios.get(urlTitle);
            const dataTit = responseTit.data;
            console.log("spisak metropolitan", data);
            console.log("spisak metropolitan title", dataTit);

            setIsLoading(false);

            setMetro(data.objectIDs);
            setTitle(dataTit.objectIDs);
            setPrikaz(data.total);
            setResults(dataTit.total);
            setIsLoading(false);
            
        } catch (err) {
            setError(err);
        }
    };

    if (isLoading) {
        return (
            <SearchPlace />,
            <Loader />)
    }
    else if (prikaz == 0 && results == 0) {
        return (
            <>
                <table className="metropolitanMain">
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                <SearchMetropolitan placeholder={'Metropolitan'} linkTo={'/metropolitan'} />
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <h2 className="history">Nothing found</h2>

                            </th>
                        </tr>
                    </thead>
                </table>
            </>


        )
    }

    else if (results == 0) {
        return (
            <table className="metropolitanMain">
                <thead >

                    <tr>
                        <th colSpan={2}>
                            <SearchMetropolitan placeholder={'Metropolitan'} linkTo={'/metropolitan'} />
                        </th>
                    </tr>
                    <tr >
                        <th  colSpan={2}
                        className="results"
                        >Number of Objects by name {prikaz}, by title {results}</th>
                    </tr>
                </thead>
                <tbody>
                    {metro.map((metroId) => (
                        <TableRowMetro key={metroId} metropolitan={metroId} />
                    ))}
                </tbody>
            </table>
        )
    } else if (prikaz == 0) {
        return (
            <table className="metropolitanMain">
                <thead >
                    <tr>
                        <th colSpan={2}>
                            <SearchMetropolitan placeholder={'Metropolitan'} linkTo={'/metropolitan'} />
                        </th>
                    </tr>
                    <tr >
                        <th colSpan={2}
                            className="results"
                        >Number of Objects by name {prikaz}, by title {results}</th>
                    </tr>
                </thead>
                <tbody>
                    {title.map((metroId) => (
                        <TableRowMetroTitle key={metroId} metropolitan={metroId} />
                    ))}
                </tbody>
            </table>)
    }

    return (
        <>

        <table className="metropolitanMain">
            <thead >

                <tr>
                    <th colSpan={2}>
                        <SearchMetropolitan placeholder={'Metropolitan'} linkTo={'/metropolitan'} />
                    </th>
                </tr>
                <tr >
                    <th colSpan={2}
                        className="results"
                    >Number of Objects by name {prikaz}, by title {results}
                    </th>
                </tr>
            </thead>

            {metro.map((metroId) => (
                <TableRowMetro key={metroId} metropolitan={metroId} />
            ))}
            {title.map((metroId) => (
                <TableRowMetroTitle key={metroId} metropolitan={metroId} />
            ))}



        </table>
        <BackToTop />
        </>
        )

};
export default ResultsMetropolitan;