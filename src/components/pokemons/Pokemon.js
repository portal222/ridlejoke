import React, { useState, useEffect } from "react";
import PaginatePok from "./PaginationPok";
import { Box, Pagination } from "@mui/material";
import Loader from "../Loader";
import axios from 'axios';
import PokemonSound from "./PokemonSound";
import PokJson from "./PokJson";
import BackToTop from "../BackToTop";

const Pokemon = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get(`https://api.pokemontcg.io/v2/cards?page=1`).then(res => {
            const data = res.data;
            setPokemon(data.data);
            console.log("iz pokemona podaci", data.data)
            setIsLoading(false);
        });

    }, [])




    const pageSize = 30;
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

                            <>
                                <div key={post.id} className="dropDown"
                                >
                                    <img src={post.images.small} alt="no picture" className="small" />

                                <PokemonSound sound={post.name} />

                                    <div className="dropdownImg">
                                        <img src={post.images.large} alt="no picture" className="large" />
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
          
            </Box>
            <PokJson />
            <BackToTop />
        </>
    );

}

export default Pokemon;