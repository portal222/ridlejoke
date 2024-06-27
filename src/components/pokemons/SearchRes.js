import React, { useState, useEffect, useContext } from "react";
import PaginatePok from "./PaginationPok";
import { Box, Pagination } from "@mui/material";
import GlobalContext from "../GlobalContext";
import axios from 'axios';
import Pokemon from "./Pokemon";
import PokJson from "./PokJson";
import BackToTop from "../BackToTop";
import PokemonImg from "./PokemonImg";


const SearchRes = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    console.log("trazeno ime", searchStringValue)

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


            console.log("novi pokusaj", data);

            setPokemon(data);
            setResults(data.length);





        } catch (err) {
            setError(err);
        }
    }


    const pageSize = 15;
    const paginatedPosts = PaginatePok(pokemon, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];


    if (results == 0) {
        return (
            <>
                <div className="pokemon">
                    {searchStringValue} is not found
                </div>
                <Pokemon />
            </>

        )
    }
    return (
        <>
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
                <div className="pokemon">
                    {currentPosts &&
                        currentPosts.map((post) => (

                            <PokemonImg post={post}/>

                        ))}
                </div>

            </Box>
            <PokJson />
            <BackToTop />
        </>

    );

}

export default SearchRes;