import React, { useState, useEffect } from "react";
import axios from "axios";

const WorldWonders = () => {

    const [wonder, setWonder] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getWonder();
    }, []);

    const getWonder = async () => {
        const url = `https://www.world-wonders-api.org/v0/wonders/random`;

        try {
            const response = await axios.get(url);
            const data = response.data

            setWonder(data)
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="wonders">
                <h1>World Wonders</h1>
            </div>


            <div className="wonders">

                <div >
                    <div className="titleWon">
                        {wonder.name}
                    </div>
                    <p className="locWon">{wonder.location}</p>
                    <p className="locWon">Build: {wonder.build_year}</p>
                    <p className="locWon">Tiime period: {wonder.time_period}</p>
                    <p className="summWon">
                        {wonder.summary}
                    </p>
                    <p className="mapWon">

                        <a href={wonder.links?.google_maps} target="_blank">Google maps</a>
                    </p>
                </div>
                <div>

                    <img src={wonder.links?.images[0]} className="imgWon" />
                    <img src={wonder.links?.images[1]} className="imgWon" />
                    <img src={wonder.links?.images[2]} className="imgWon" />
                    <img src={wonder.links?.images[3]} className="imgWon" />
                    <img src={wonder.links?.images[4]} className="imgWon" />

                </div>
                <hr></hr>
            </div>


        </>
    )
}
export default WorldWonders;