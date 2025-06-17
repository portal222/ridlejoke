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

    const imageUrl = usePollinationsImage(searchStringValue, {
        seed: 12,
        model: 'flux'
    });


    const imageUrl2 = usePollinationsImage(searchStringValue, {
        seed: 35,
        model: 'turbo'
    });


    useEffect(() => {
        getText(searchStringValue);
    }, [searchStringValue]);

    const getText = async () => {

        const url = `https://text.pollinations.ai/${searchStringValue}`

        try {
            const response = await axios.get(url);
            const data = response.data

            console.log("podaci ai genrator", data)
            setAitext(data);
       
        } catch (err) {
            setError(err);
        }
    }
   
    return (
        <>
            <div className="mainBook">
                <div >
                    {aitext ? <div className="total">{aitext} </div> : <p>Loadin text...</p>}
                </div>
                <h1 style={{padding: "20px"}}>Ai generated text and images for {searchStringValue}</h1>
                <div>
                    {imageUrl ? <img src={imageUrl} alt="" className="aiImg" /> : <p>Loadin image...</p>}
                </div>
                <br></br>
                <div>
                    {imageUrl2 ? <img src={imageUrl2} alt="" className="aiImg" /> : <p>Loadin image...</p>}
                </div>
                <br></br>
                <div style={{ padding: "30px" }}>

                    < SearchAiGen />
                </div>
            </div>
        </>
    )




}
export default Aigenerator;