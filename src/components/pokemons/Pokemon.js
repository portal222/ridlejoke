import React, { useState, useEffect } from "react";
import PaginatePok from "./PaginationPok";
import { Box, Pagination } from "@mui/material";
import Loader from "../Loader";
import axios from 'axios';
import PokJson from "./PokJson";
import BackToTop from "../BackToTop";
import PokemonImg from "./PokemonImg";

const Pokemon = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [style, setStyle] = useState("large");


    useEffect(() => {
        axios.get(`https://api.pokemontcg.io/v2/cards?page=1`).then(res => {
            const data = res.data;
            setPokemon(data.data);
            console.log("iz pokemona podaci", data.data)
            setIsLoading(false);
        });

    }, [])

    const pageSize = 12;
    const paginatedPosts = PaginatePok(pokemon, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];


    if (isLoading) {
        return <Loader />
    }

    return (
        <>
<div >

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

                <PokemonImg post={post}/>

                        ))}
                </div>
          
            </Box>
            <PokJson />
            </div>
            <BackToTop />
        </>
    );

}

export default Pokemon;