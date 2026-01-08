import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import SearchAiGen from "./SearchAiGen";
// import { usePollinationsImage } from "@pollinations/react";
import axios from "axios";





const Aigenerator = () => {

    const [aitext, setAitext] = useState([]);
    const [aitextM, setAitextM] = useState([]);
    const [aitextPer, setAitextPer] = useState([]);
    const [aitextLar, setAitextLar] = useState([]);
    // const [searchStringValue3, setSearchStringValue3] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    const [error, setError] = useState(null);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;



  



    useEffect(() => {
        getText(searchStringValue);
        getAmazon(searchStringValue);
        getPerple(searchStringValue);
        getLarge(searchStringValue);
    }, [searchStringValue]);

    const getText = async (searchStringValue) => {
        const url = `https://gen.pollinations.ai/text/${searchStringValue}?model=mistral&key=pk_N3F6nCawqxWe8khl`
   
        try {
            const response = await axios.get(url);
            const data = response
            setAitext(data);

        } catch (err) {
            setError(err);
        }
    }

    const getAmazon = async (searchStringValue) => {

        const urlM = `https://gen.pollinations.ai/text/${searchStringValue}?model=nova-micro&key=pk_N3F6nCawqxWe8khl`

        try {
            const responseM = await axios.get(urlM);
            const dataM = responseM
            setAitextM(dataM);
        

        } catch (err) {
            setError(err);
        }
    }

    const getPerple = async (searchStringValue) => {


        const urlPer = `https://gen.pollinations.ai/text/${searchStringValue}?model=perplexity-fast&key=pk_N3F6nCawqxWe8khl`

        try {
            const responsePer = await axios.get(urlPer);
            const dataPer = responsePer
            setAitextPer(dataPer);

        } catch (err) {
            setError(err);
        }
    }

    const getLarge = async (searchStringValue) => {
        const urlLar = `https://gen.pollinations.ai/text/${searchStringValue}?model=openai-large&key=pk_N3F6nCawqxWe8khl`
        try {
            const responseLar = await axios.get(urlLar);
            const dataLar = responseLar
            setAitextLar(dataLar);

        } catch (err) {
            setError(err);
        }
    }

     

    return (
        <>
            <div className="mainBook">
                <h1 style={{ padding: "20px 40px" }}>Ai generated text  for {searchStringValue}</h1>

                <div className="polli">Mistral</div>
                <div >
                    {aitext.data ? <div className="total">{aitext.data} </div> : <p>Loading text...</p>}
                </div>
      

                <div className="polli">Amazon nova micro</div>
                <div >
                    {aitextM.data ? <div className="total">{aitextM.data} </div> : <p>Loading text...</p>}
                </div>
          

                <div className="polli">Perplexity fast</div>
                <div >
                    {aitextPer.data ? <div className="total">{aitextPer.data} </div> : <p>Loading text...</p>}
                </div>

                <div className="polli">GPT 5.2</div>
                <div >
                    {aitextLar.data ? <div className="total">{aitextLar.data} </div> : <p>Loading text...</p>}
                </div>

                <br></br>
                <div style={{ padding: "30px" }}>
                    <SearchAiGen placeholder={'write anything and wait'} linkTo={'/aiGenerator'} />
                </div>
                <div style={{ height: "20px" }}>

                </div>
            </div>
            <div className="place"></div>

        </>
    )
}
export default Aigenerator;