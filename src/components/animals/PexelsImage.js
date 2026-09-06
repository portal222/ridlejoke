import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";

const PexelsImage = () => {
    const [error, setError] = useState(null);
    const [picture, setPicture] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const search = globalCtx.searchStringValue;

    useEffect(() => {
        getAnimals();
    }, []);


    const getAnimals = async () => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/pexels?query=${search}`;



        try {
            const response = await axios.get(url,
                {
                    headers: {

                        'Accept': 'application/json',
                    }
                }
            );

            setPicture(response.data.photos);


        } catch (err) {
            setError(err);

        }
    };

    return (
        <>
            <div className="mainBook">
                <div className="polli">
                    <a href="https://www.pexels.com" target="_blank">
                        <img src="https://images.pexels.com/lib/api/pexels-white.png" alt="pexels" style={{ width: "100px" }} />
                    </a>
                    <p>

                        images for {search}
                    </p>
                </div>

                <br />


                {picture.map((pic, id) => (
                    <div style={{ marginTop: "20px" }} key={id}>
                        <img
                            src={pic.src.large}
                            alt="Pexels"
                            style={{ maxWidth: "100%", borderRadius: "8px" }}
                        />
                    </div>
                ))}
                <br/>
                <a href="https://www.pexels.com" target="_blank" >Photos provided by Pexels </a>
                
      
            </div>

        </>
    );
};
export default PexelsImage;