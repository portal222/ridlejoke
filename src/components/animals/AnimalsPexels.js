import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Search from "antd/es/input/Search";

// import AiPolliAnimals from "./AiPolliAnimals";

const AnimalsPexels = ({ search }) => {
    const [error, setError] = useState(null);
    const [picture, setPicture] = useState([]);





    useEffect(() => {
        getAnimals(search);
    }, [search]);


    const getAnimals = async (search) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/pexels?query=${encodeURIComponent(search)}`;



        try {
            const response = await axios.get(url,
                {
                    headers: {

                        'Accept': 'application/json',
                    }
                }
            );

            setPicture(response.data.photos);


            // const data = response.data;
            // setImage(data[0]);


        } catch (err) {
            setError(err);

        }
    };

    return (
        <>
      
            {picture.slice(0, 3).map((pic, id) => (
                <div style={{ marginTop: "20px" }} key={id}>
                    <img
                        src={pic.src.medium}
                        alt="Generated"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                </div>
            ))}
            <p className="pexels">
                The pictures and video are just an illustration, sometimes it can be something completely different from what is requested.
            </p>
            <p className="pexels">

                <a href="https://www.pexels.com" target="_blank" >Photos and video provided by Pexels </a>
            </p>


        </>
    );
};
export default AnimalsPexels;