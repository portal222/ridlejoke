import React, { useState, useEffect } from "react";
import axios from "axios";

const XkcdComics = () => {

    const [comics, setComics] = useState([]);
    const [error, setError] = useState(null);

    const [randomNumber] = useState(() => Math.floor(Math.random() * 3400) + 1);

    useEffect(() => {
        getComic(randomNumber);
    }, [randomNumber]);



    const getComic = async (randomNumber) => {
        const urlCom = `https://ridlejoke-proxy.kvaka32.workers.dev/xkcd?num=${randomNumber}`;
        try {
            const response = await axios.get(urlCom);
            setComics(response.data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="mainBook">
                <div className="polli">
                    <div>Xkcd Comics</div>
                    <img src={comics.img} alt="" style={{ width: "700px" }} />
                </div>
                <div className="polli2">
                    {comics.alt}
                </div>

            </div>
        </>
    )
}
export default XkcdComics;