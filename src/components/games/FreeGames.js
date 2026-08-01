import React, { useState, useEffect } from "react";
import paginateProba from "./PaginationMui";
import { Box, Typography, Pagination } from "@mui/material";
import axios from "axios";



const FreeGames = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames();
    }, []);

      const getGames = async () => {
        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/freeGames";
        const response = await fetch(url);
        const data = await response.json();
 
        setGames(data);
    }

    const pageSize = 5;
    const paginatedPosts = paginateProba(games, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];


    return (
        <>
            <Box>
                {paginatedPosts.length > 1 && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <Pagination
                            count={paginatedPosts.length}
                            page={currentPage}
                            onChange={(_, newPage) => setCurrentPage(newPage)}
                        />
                    </Box>
                )}
                {currentPosts &&
                    currentPosts.map((post) => (
                        <div key={post.id} className="mainBook">

                            <div className="polli">
                                {post.title}
                            </div>
                            <div className="mainGame">
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <p>{post.genre}</p>
                                        <p>{post.platform}</p>
                                    </div >
                                    <div style={{ width: "350px" }}>

                                        <img src={post.thumbnail} alt="no picture"
                                            style={{ width: "100%" }} />
                                    </div>
                                </div>
                                <div>

                                    <div className="description">
                                        {post.short_description}</div>
                                    <p >{post.publisher}</p>
                                    <p >{post.developer + " " + post.release_date}</p>
                                    <div style={{ display: "flex" }}>

                                        <p ><a href={post.freetogame_profile_url} target="_blank">Game profil</a></p>
                                        <p className="freeButt"><a href={post.game_url} target="_blank">PLAY GAME</a></p>
                                    </div>
                                </div>
                            </div>




                            <div>

                            </div>
                            <hr></hr>
                        </div>
                    ))}
                {paginatedPosts.length > 1 && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <Pagination
                            count={paginatedPosts.length}
                            page={currentPage}
                            onChange={(_, newPage) => setCurrentPage(newPage)}
                        />
                    </Box>
                )}
            </Box>
        </>
    )

}
export default FreeGames;