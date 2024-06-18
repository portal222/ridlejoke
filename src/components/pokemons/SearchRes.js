import React, { useState, useEffect, useContext } from "react";
import PaginatePok from "./PaginationPok";
import { Box, Pagination } from "@mui/material";
import GlobalContext from "../GlobalContext";
import PokemonSound from "./PokemonSound";
import axios from 'axios';
import Pokemon from "./Pokemon";
import PokJson from "./PokJson";
import BackToTop from "../BackToTop";


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


    const pageSize = 20;
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

                            <div key={post.id} className="dropDown">
                                <img src={post.images.small} alt="no picture" className="small" />
                                <PokemonSound sound={post.name} />

                                <div className="dropdownImg">
                                    <img src={post.images.large} alt="no picture" className="large" />
                                </div>
                            </div>

                        ))}
                </div>

            </Box>
            <PokJson />
            <BackToTop />
        </>

    );

}

export default SearchRes;