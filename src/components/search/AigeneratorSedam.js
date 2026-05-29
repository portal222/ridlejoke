import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import SearchAiGen from "./SearchAiGen";
import axios from "axios";
import BackToTop from "../BackToTop";
import ChatWithHistory from "./ChatWithHistory";
import AiPictures from "./AiPictures";
import AiPolliVid from "./AiPolliVid";

const Aigenerator = () => {

    const [aitext, setAitext] = useState([]);
    const [aitextM, setAitextM] = useState([]);
    const [aitextLar, setAitextLar] = useState([]);
    const [aitextQwen, setAitextQwen] = useState([]);
    const [aitextNom, setAitextNom] = useState([]);
    const [aitextGemma, setAitextGemma] = useState([]);
    const [aitextGpt, setAitextGpt] = useState([]);
    const [error, setError] = useState(null);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getModels();
        getText(searchStringValue);
        getAmazon(searchStringValue);
        getLarge(searchStringValue);
        getQwen(searchStringValue);
        getNom(searchStringValue);
        getGemma(searchStringValue);
        getGpt(searchStringValue);
    }, [searchStringValue]);

    const getModels = async () => {
        const urlM = `https://gen.pollinations.ai/image/models?key=pk_N3F6nCawqxWe8khl`

        try {
            const response = await axios.get(urlM);
            const data = response

        } catch (err) {
            setError(err);
        }
    }

    const getText = async (searchStringValue) => {
        const url = `https://gen.pollinations.ai/text/${searchStringValue}?model=glm&key=pk_N3F6nCawqxWe8khl`

        try {
            const response = await axios.get(url);
            const data = response
            setAitext(data);

        } catch (err) {
            setError(err);
        }
    }

    const getAmazon = async (searchStringValue) => {

        const urlM = `https://gen.pollinations.ai/text/${searchStringValue}?model=polly&key=pk_N3F6nCawqxWe8khl`

        try {
            const responseM = await axios.get(urlM);
            const dataM = responseM
            setAitextM(dataM);

        } catch (err) {
            setError(err);
        }
    }

       const getGpt = async (searchStringValue) => {


        const urlM = `https://gen.pollinations.ai/text/${searchStringValue}?model=gpt-5.5&key=pk_N3F6nCawqxWe8khl`

        try {
            const responseM = await axios.get(urlM);
            const dataM = responseM
            setAitextGpt(dataM);

        } catch (err) {
            setError(err);
        }
    }

       const getGemma = async (searchStringValue) => {

        const urlM = `https://gen.pollinations.ai/text/${searchStringValue}?model=gemma&key=pk_N3F6nCawqxWe8khl`

        try {
            const responseM = await axios.get(urlM);
            const dataM = responseM
            setAitextGemma(dataM);

        } catch (err) {
            setError(err);
        }
    }

    const getLarge = async (searchStringValue) => {
        const urlLar = `https://gen.pollinations.ai/text/${searchStringValue}?model=mistral-4&key=pk_N3F6nCawqxWe8khl`
        try {
            const responseLar = await axios.get(urlLar);
            const dataLar = responseLar
            setAitextLar(dataLar);

        } catch (err) {
            setError(err);
        }
    }

    const getQwen = async (searchStringValue) => {
        const urlQ = `https://gen.pollinations.ai/text/${searchStringValue}?model=nova-fast&key=pk_N3F6nCawqxWe8khl`
        try {
            const responseQ = await axios.get(urlQ);
            const dataQ = responseQ
            setAitextQwen(dataQ);

        } catch (err) {
            setError(err);
        }
    }

     const getNom = async (searchStringValue) => {
        const urlN = `https://gen.pollinations.ai/text/${searchStringValue}?model=kimi-k2.6&key=pk_N3F6nCawqxWe8khl`
   
        try {
            const responseN = await axios.get(urlN);
            const dataN = responseN
            setAitextNom(dataN);

        } catch (err) {
            setError(err);
        }
    }

    function makeLinks(text) {
        return text.replace(
            /(https?:\/\/[^\s]+)/g,
            (url) => {
                try {
                    const domain = new URL(url).hostname;
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${domain}</a>`;
                } catch {
                    return url;
                }
            }
        );
    }

    return (
        <>
            <div className="mainBook">
                <div className="aiTitle" >
                    <p className="intro">Test various Artificial Intelligence models, get five answers for one query, or chat with them. You can use any language in the prompt.
                        And generate images or video.
                    </p>
                    <div className="aiSearch">

                        <div style={{ padding: "5px" }}>
                            <SearchAiGen placeholder={'write anything and wait'} linkTo={'/aiGenerator'} />
                        </div>
                        <div style={{ padding: "15px" }}>
                            {searchStringValue}
                        </div>
                    </div>
                </div>

                <div className="polli">GLM 5</div>
                <div >
                    {aitext.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitext.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>

                <div className="polli">Polly by @Itachi-1824</div>
                <div >
                    {aitextM.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextM.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>

                         <div className="polli">GPT</div>
                <div >
                    {aitextGpt.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextGpt.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                
                 <div className="polli">Gemma 4 26B A4B</div>
                <div >
                    {aitextGemma.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextGemma.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <div className="polli">Mistral Small 4</div>
                <div >
                    {aitextLar.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextLar.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <div className="polli">Nova Micro, Amazon</div>
                <div >
                    {aitextQwen.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextQwen.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
            
                <div className="polli">Moonshot Kimi K2.6</div>
                
        
                
                <div >
                    {aitextNom.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextNom.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <br></br>
                <div style={{ height: "20px" }}>
                </div>
            </div>
            <ChatWithHistory />
            <AiPictures />
            <AiPolliVid />
            <BackToTop />
        </>
    )
}
export default Aigenerator;