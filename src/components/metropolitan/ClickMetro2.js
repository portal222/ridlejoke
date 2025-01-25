import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchMetro from "./SearchMetro";
import { Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import BackToTop from "../BackToTop";
import MetroID from "./MetroID";
import PaginationMetro from "./PaginationMetro";

const ClickMetro2 = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [metro, setMetro] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results2, setResults2] = useState([]);

    const params = useParams()
    const personName = params.linkName;

    useEffect(() => {
        getMetro();
    }, []);

    const getMetro = async () => {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?artist=true&q=${personName}`

        try {
            const response = await axios.get(url);
            const data = response.data;

            setIsLoading(false);
            setMetro(data.objectIDs);
            setResults2(data.total);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    if (isLoading) {
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
                    </thead>
                </table>
                <Loader />
            </>
        )
    }

    else if (results2 == 0) {
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

    else if (results2 !== 0) {
        const pageSize = 7;
        const paginatedPosts = PaginationMetro(metro, pageSize);
        const currentPosts = paginatedPosts[currentPage - 1];

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
                            <th >
                                <h2 className="results">  Results: {results2}, by artist name </h2>
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
                        {paginatedPosts.length > 1 && (
                            <Box mt={2} display="flex" justifyContent="center"
                                margin="auto" height="60px" backgroundColor="rgb(241, 241, 225)" paddingTop="20px">
                                <Pagination
                                    count={paginatedPosts.length}
                                    page={currentPage}
                                    onChange={(_, newPage) => {
                                        setCurrentPage(newPage);
                                        window.scrollTo({ top: 0, behavior: 'smooth'});
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                    <BackToTop />

                </table>
                <div className="place"></div>
            </>
        )
    }
};
export default ClickMetro2;