import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import SearchAiGen from "./SearchAiGen";
import { usePollinationsImage } from "@pollinations/react";
import axios from "axios";

const Aigenerator = () => {

    const [aitext, setAitext] = useState([]);
    const [error, setError] = useState(null);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    const number = Math.floor(Math.random() * 99)

    const imageUrl = usePollinationsImage(searchStringValue, {
        seed: { number },
        model: 'flux',
        enhance: true,
        width: 1280,
        height: 1280
    });

    const imageUrl2 = usePollinationsImage(searchStringValue, {
        seed: { number },
        model: 'turbo',
        enhance: true,
        width: 1280,
        height: 1280
    });

    const imageUrl3 = usePollinationsImage(searchStringValue, {
        seed: { number },
        model: 'kontext',
        enhance: true,
        width: 1280,
        height: 1280
    });

    useEffect(() => {
        getText(searchStringValue);
    }, [searchStringValue]);

    const getText = async () => {

        const url = `https://text.pollinations.ai/${searchStringValue}`

        try {
            const response = await axios.get(url);
            const data = response
            setAitext(data);

        } catch (err) {
            setError(err);
        }
    }

    if (error?.status === 400) {
        return (
            <>
                <div className="mainBook">
                    <div className="polli">Pollinations Ai</div>
                    <div >
                        <div className="total">The prompt contains inappropriate words, so your request cannot be fulfilled. </div>
                    </div>
                    <h1 style={{ padding: "20px" }}>Ai generated text and images for {searchStringValue}</h1>

                    <div style={{ padding: "30px" }}>
                        <SearchAiGen placeholder={'write anything and wait'} linkTo={'/aiGenerator'} />
                    </div>
                </div>
                <div className="place"></div>
            </>
        )
    }
    return (
        <>
            <div className="mainBook">
                <div className="polli">Pollinations Ai</div>
                <div >
                    {aitext.data ? <div className="total">{aitext.data} </div> : <p>Loading text...</p>}
                </div>
                <div>
                    {error?.AxiosError?.status}
                </div>
                <h1 style={{ padding: "20px" }}>Ai generated text and images for {searchStringValue}</h1>
                <div>
                    {imageUrl ? <img src={imageUrl} alt="" className="aiImg" /> : <p>Loading image...</p>}
                </div>
                <p className="model">Flux model</p>
                <br></br>
                <div>
                    {imageUrl2 ? <img src={imageUrl2} alt="" className="aiImg" /> : <p>Loading image...</p>}
                </div>
                <p className="model">Turbo model</p>
                <br></br>
                <div>
                    {imageUrl3 ? <img src={imageUrl3} alt="" className="aiImg" /> : <p>Loading image...</p>}
                </div>
                <p className="model">Kontext model</p>
                   <br></br>
                <div style={{ padding: "30px" }}>
                    <SearchAiGen placeholder={'write anything and wait'} linkTo={'/aiGenerator'} />
                </div>
            </div>
            <div className="place"></div>

        </>
    )
}
export default Aigenerator;