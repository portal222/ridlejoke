import React, { useState, useEffect } from "react";
import PaginatePok from "./PaginationPok";
import { Box, Typography, Pagination, TableRow } from "@mui/material";
import Loader from "../Loader";


import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import BackToTop from "../BackToTop";
import PokemonImg from "./PokemonImg";


const PokemonPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const navigate = useNavigate();

    const params = useParams();
    const numId = params.numId;

    useEffect(() => {
        getPokemons();
    }, [])

    const getPokemons = async () => {
        const url = `https://api.pokemontcg.io/v2/cards?page=${numId}`;

        try {
            const response = await axios.get(url)
            const data = response.data;
            console.log("iz pokemonPage", data.data)
            setPokemon(data.data);
            setIsLoading(false);
        } catch (err) {
            setError(err);
        }
    };

    const clickHandle = () => {
        const LinkTo = `/pokJson`;
        navigate(LinkTo);
    }

    const pageSize = 15;
    const paginatedPosts = PaginatePok(pokemon, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];


    if (isLoading) {
        return <Loader />
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
            <div className="main">
                <div className="button" onClick={() => clickHandle()}>More...</div>
            </div>
            <BackToTop />
        </>

    );

}

export default PokemonPage;