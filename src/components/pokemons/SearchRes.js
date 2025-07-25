import React, { useState, useEffect, useContext } from "react";
import PaginatePok from "./PaginationPok";
import { Box, Pagination } from "@mui/material";
import GlobalContext from "../GlobalContext";
import axios from 'axios';
import Pokemon from "./Pokemon";
import PokJson from "./PokJson";
import BackToTop from "../BackToTop";
import PokemonImg from "./PokemonImg";
import Loader from "../Loader";

const SearchRes = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getWanted(searchStringValue);
    }, [searchStringValue]);

    const getWanted = async (searchStringValue) => {

        const url = `https://api.pokemontcg.io/v2/cards?q=name:${searchStringValue}`;
        const url2 = `https://api.pokemontcg.io/v2/cards?q=type:${searchStringValue}`;

        try {
            const response = await axios.get(url);
            const response2 = await axios.get(url2);

            const data =
                response.data.data ||
                response2.data.data

            setPokemon(data);
            setResults(data.length);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const pageSize = 12;
    const paginatedPosts = PaginatePok(pokemon, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];

    if (isLoading) {
        return <Loader />
    } else if (results == 0) {
        return (
            <>
                <div className="pokemon" style={{ textAlign: "center" }}>
                    {searchStringValue} was not found but there are other POKEMON
                </div>
                <Pokemon />
            </>
        )
    }
    return (
        <>
            <Box>
                {paginatedPosts.length > 1 && (
                    <Box mt={2} display="flex" justifyContent="center" className="pagination"
                        margin="auto" height="60px" backgroundColor="rgb(241, 241, 225)" paddingTop="20px">
                        <Pagination
                            count={paginatedPosts.length}
                            page={currentPage}
                            onChange={(_, newPage) => setCurrentPage(newPage)}
                        />
                    </Box>
                )}
                <div className="pokemon">
                    {currentPosts &&
                        currentPosts.map((post) => (
                            <PokemonImg post={post} />
                        ))}
                </div>
            </Box>
            <PokJson />
            <BackToTop />
        </>
    );
}
export default SearchRes;