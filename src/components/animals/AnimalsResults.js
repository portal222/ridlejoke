import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import Cat from "./Cat";
import Dog from "./Dog";
import SearchAnimals from "../search/SearchAnimals";
import BackToTop from "../BackToTop";
import Animals from "./Animals";

const AnimalsResults = () => {
    const [error, setError] = useState(null);
    const [dog, setDog] = useState([]);
    const [cat, setCat] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [resultsDog, setResultsDog] = useState([]);
    const [resultsCat, setResultsCat] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getDog(searchStringValue);
    }, [searchStringValue]);

    console.log("iz resultDog searchStringValue:", searchStringValue)

    const getDog = async (searchStringValue) => {
        const url = `https://api.api-ninjas.com/v1/animals?name=${searchStringValue}`;
        const urlDog = `https://api.api-ninjas.com/v1/dogs?name=${searchStringValue}`;
        const urlCat = `https://api.api-ninjas.com/v1/cats?name=${searchStringValue}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const responseCat = await axios.get(urlCat,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const responseDog = await axios.get(urlDog,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;
            const dataCat = responseCat.data;
            const dataDog = responseDog.data;

            setResults(data.length);
            setResultsCat(dataCat.length);
            setResultsDog(dataDog.length);
            setIsLoading(false);

            setAnimals(data);
            setCat(dataCat);
            setDog(dataDog);
        } catch (err) {
            setError(err);
        }
    };

    if (isLoading) {
        return <Loader />
    } else if (results == 0 && resultsCat == 0 && resultsDog == 0) {
        return (
            <>
                <table className="tabelaZemlje">
                    <thead>
                        <tr className="results">
                            <th>Nothing found</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <SearchAnimals placeholder={'Animals'} linkTo={'/animals'} />
                            </td>
                        </tr>

                        <tr className="razmak"></tr>
                    </tbody>
                </table>
                <div className="place"></div>
            </>
        )
    } else if (results == 0 && resultsCat == 0) {
        return (
            <>
                <Dog dog={dog} results={resultsDog} />
                <div className="place"></div>
                <BackToTop />
            </>
        );
    } else if (results == 0 && resultsDog == 0) {
        return (
            <>
                <Cat cat={cat} results={resultsCat} />
                <div className="place"></div>
                <BackToTop />
            </>
        );
    } else if (resultsCat == 0 && resultsDog == 0) {
        return (
            <>
                <Animals animals={animals} results={results} />
                <div className="place"></div>
                <BackToTop />
            </>
        );
    } else if (resultsCat == 0) {
        return (
            <>
                <Animals animals={animals} results={results} />
                <Dog dog={dog} results={resultsDog} />
                <div className="place"></div>
                <BackToTop />
            </>
        );
    } else if (resultsDog == 0) {
        return (
            <>
                <Animals animals={animals} results={results} />
                <Cat cat={cat} results={resultsCat} />
                <div className="place"></div>
                <BackToTop />
            </>
        );
    } else if (results == 0) {
        return (
            <>
                <Cat cat={cat} results={resultsCat} />
                <Dog dog={dog} results={resultsDog} />
                <div className="place"></div>
                <BackToTop />
            </>
        );
    }
    return (
        <>
            <Animals animals={animals} results={results} />
            <Cat cat={cat} results={resultsCat} />
            <Dog dog={dog} results={resultsDog} />
            <div className="place"></div>
            <BackToTop />
        </>
    );
};
export default AnimalsResults;