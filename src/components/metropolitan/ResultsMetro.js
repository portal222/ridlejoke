import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchMetro from "./SearchMetro";
import GlobalContext from "../GlobalContext";
import { Box, Pagination } from "@mui/material";
import SearchPlace from "../search/SearchPlace";
import Loader from "../Loader";
import BackToTop from "../BackToTop";
import MetroID from "./MetroID";
import MetroID2 from "./MetroID2";
import PaginationMetro from "./PaginationMetro";
import PaginationMetro2 from "./PaginationMetro2";


const ResultsMetro = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [error, setError] = useState(null);
    const [metro, setMetro] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState([]);


    const [results2, setResults2] = useState([]);
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
            setResults2(data.total);
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

    if (results !== 0 && results2 !== 0) {
        const pageSize = 7;
        const paginatedPosts = PaginationMetro(metro, pageSize);
        const currentPosts = paginatedPosts[currentPage - 1];
        const paginatedPosts2 = PaginationMetro2(title, pageSize);
        const currentPosts2 = paginatedPosts2[currentPage2 - 1];

        return (
            <div className="metropolitanMain">

               
                  
                        <div className="titleMetro">
                            <div>
                                METROPOLITAN MUSEUM
                            </div>
                            <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />

                        </div>
                            <div className="results">  Results: {results2}, by artist, medium or culture </div>

                <Box>
                    {paginatedPosts.length > 1 && (
                        <Box mt={2} display="flex" justifyContent="center"
                            margin="auto" height="60px" backgroundColor="rgb(241, 241, 225)" paddingTop="20px">
                            <Pagination
                                count={paginatedPosts.length}
                                page={currentPage}
                                onChange={(_, newPage) => setCurrentPage(newPage)}
                            />
                        </Box>
                    )}
                    <div>
                        {currentPosts &&
                            currentPosts.map((metroId) => (

                                <MetroID key={metroId} metropolitan={metroId} />
                            ))}
                    </div>
                </Box>
              
                        <div className="results"> Results: {results}, by title  </div>

                           
                
                <Box>

                    {paginatedPosts2.length > 1 && (
                        <Box mt={2} display="flex" justifyContent="center"
                            margin="auto" height="60px" backgroundColor="rgb(241, 241, 225)" paddingTop="20px">
                            <Pagination
                                count={paginatedPosts2.length}
                                page={currentPage2}
                                onChange={(_, newPage) => setCurrentPage2(newPage)}
                            />
                        </Box>
                    )}
                    <div>
                        {currentPosts2 &&
                            currentPosts2.map((metroId) => (

                                <MetroID2 key={metroId} metropolitan2={metroId} />
                            ))}
                    </div>

                </Box>
                <div className="place"></div>
                <BackToTop />

            </div>
        )

    }

    if (results2 !== 0) {
        const pageSize = 7;
        const paginatedPosts = PaginationMetro(metro, pageSize);
        const currentPosts = paginatedPosts[currentPage - 1];

        return (
            <table className="metropolitanMain">
                <thead>
                    <tr>
                        <th className="titleMetro">
                            <h1>
                                METROPOLITAN MUSEUM
                            </h1>
                            <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />

                        </th>
                    </tr>
                    <tr>

                    </tr>
                    <tr>
                        <th >
                            <h2 className="results">  Results: {results2}, by artist, medium or culture </h2>

                        </th>
                    </tr>
                </thead>

                <Box>
                    {paginatedPosts.length > 1 && (
                        <Box mt={2} display="flex" justifyContent="center"
                            margin="auto" height="60px" backgroundColor="rgb(241, 241, 225)" paddingTop="20px">
                            <Pagination
                                count={paginatedPosts.length}
                                page={currentPage}
                                onChange={(_, newPage) => setCurrentPage(newPage)}
                            />
                        </Box>
                    )}
                    <div>
                        {currentPosts &&
                            currentPosts.map((metroId) => (

                                <MetroID key={metroId} metropolitan={metroId} />
                            ))}
                    </div>
                </Box>
                <BackToTop />

            </table>
        )

    }
    if (results !== 0) {
        const pageSize = 7;

        const paginatedPosts2 = PaginationMetro2(title, pageSize);
        const currentPosts2 = paginatedPosts2[currentPage2 - 1];

        return (
            <table className="metropolitanMain">

                <thead>
                    <tr>
                        <th className="titleMetro">
                            <h1>
                                METROPOLITAN MUSEUM
                            </h1>
                            <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />

                        </th>
                    </tr>
                    <tr>

                    </tr>
                    <tr>
                        <th >
                            <h2 className="results">Results: {results}, by title </h2>

                        </th>
                    </tr>
                </thead>

                <Box>

                    {paginatedPosts2.length > 1 && (
                        <Box mt={2} display="flex" justifyContent="center"
                            margin="auto" height="60px" backgroundColor="rgb(241, 241, 225)" paddingTop="20px">
                            <Pagination
                                count={paginatedPosts2.length}
                                page={currentPage2}
                                onChange={(_, newPage) => setCurrentPage2(newPage)}
                            />
                        </Box>
                    )}
                    <div>
                        {currentPosts2 &&
                            currentPosts2.map((metroId) => (

                                <MetroID2 key={metroId} metropolitan2={metroId} />
                            ))}
                    </div>
                    <BackToTop />

                </Box>
            </table>
        )
    }




    else if (results2 == 0 && results == 0) {
        return (
            <>
                <table className="metropolitanMain">
                    <thead>
                        <tr>
                            <th className="titleMetro">
                                <h1>
                                    METROPOLITAN MUSEUM
                                </h1>
                                <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />

                            </th>
                        </tr>
                        <tr>

                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <h2 className="results">Nothing found</h2>

                            </th>
                        </tr>
                    </thead>
                </table>
                <div className="place"></div>
            </>
        )
    }

};
export default ResultsMetro;