import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import SearchAiGen from "./SearchAiGen";
// import Loader from "../Loader";


import axios from "axios";

const Aigenerator = () => {

    const [aitext, setAitext] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    // const [isLoading, setIsLoading] = useState(true);


    const [error, setError] = useState(null);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;


    useEffect(() => {
        getText(searchStringValue);
    }, [searchStringValue]);

    const getText = async () => {

        const url = `https://text.pollinations.ai/${searchStringValue}`
        const urlImg = `https://image.pollinations.ai/prompt/${searchStringValue}`


        try {
            const response = await axios.get(url);

            const responseImg = await axios.get(urlImg, { responseType: "blob" }); // Preuzimamo binarne podatke slike
            const imageObjectURL = URL.createObjectURL(responseImg.data); // Pretvaramo ih u URL za prikaz

            const data = response.data



            console.log("podaci ai genrator", data)


            // setIsLoading(false);

            setAitext(data);
            setImageUrl(imageObjectURL);

        } catch (err) {
            setError(err);
        }
    }

    // if (isLoading) {
    //     return <Loader />
    // }

    return (
        <>
            <div className="mainBook">

                {/* <div className="total" dangerouslySetInnerHTML={{ __html: aitext }}> */}
                <div >
                    {aitext ? <div className="total">{aitext} </div> : <p>Loadin text...</p>}
                </div>
                <div>
                    {imageUrl ? <img src={imageUrl} alt="" className="aiImg" /> : <p>Loadin image...</p>}

                </div>

                <hr></hr>
                <br></br>
                <br></br>
                < SearchAiGen />
            </div>
        </>
    )




}
export default Aigenerator;