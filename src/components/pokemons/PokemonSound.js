import React, { useState, useEffect } from "react";
import Player from "../Player";
import axios from 'axios';

const PokemonSound = (props) => {

    const [pokemon, setPokemon] = useState([]);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        getSound();
    }, []);

    const getSound = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${props.sound.toLowerCase()}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            setPokemon(data);
            setResults(data.length);
            console.log("zvuci pokemona", data);


        } catch (err) {
            setError(err);
        }
    }



    if (results == 0) {
        return (
            <>
                <div className="sound">
                    No sound in the base
                </div></>
        )
    }
    return (
        <>
            {pokemon.cries?.latest && (
                <div className="sound">
                    <Player url={pokemon.cries?.latest} />
                    <a href={pokemon.cries.latest} target="_blank">download </a>

                </div>
            )}
        </>

    );

}

export default PokemonSound;