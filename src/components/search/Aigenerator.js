import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import SearchAiGen from "./SearchAiGen";
import axios from "axios";
import BackToTop from "../BackToTop";
import ChatWithHistory from "./ChatWithHistory";
import AiPictures from "./AiPictures";
import ChatWithHistoryAir from "./ChatWithHistoryAir";
import AiVideo from "./AiVideo";

const Aigenerator = () => {

    const [aitext, setAitext] = useState([]);
    const [aitextM, setAitextM] = useState([]);
    const [aitextPer, setAitextPer] = useState([]);
    const [aitextLar, setAitextLar] = useState([]);
    const [aitextQwen, setAitextQwen] = useState([]);
    const [error, setError] = useState(null);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getModels();
        getText(searchStringValue);
        getAmazon(searchStringValue);
        getPerple(searchStringValue);
        getLarge(searchStringValue);
        getQwen(searchStringValue);
    }, [searchStringValue]);

    const getModels = async () => {
        const urlM = `https://gen.pollinations.ai/text/models?key=pk_N3F6nCawqxWe8khl`

        try {
            const response = await axios.get(urlM);
            const data = response

        } catch (err) {
            setError(err);
        }
    }

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

    const getQwen = async (searchStringValue) => {
        const urlQ = `https://gen.pollinations.ai/text/${searchStringValue}?model=kimi&key=pk_N3F6nCawqxWe8khl`
        try {
            const responseQ = await axios.get(urlQ);
            const dataQ = responseQ
            setAitextQwen(dataQ);

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
                    <p>Ai generated text for</p>
                    <div className="aiSearch">
                        {searchStringValue}
                    </div>
                    <div style={{ padding: "5px" }}>
                        <SearchAiGen placeholder={'write anything and wait'} linkTo={'/aiGenerator'} />
                    </div>
                </div>

                <div className="polli">Mistral</div>
                <div >
                    {aitext.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitext.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>

                <div className="polli">Nova-fast Amazon</div>
                <div >
                    {aitextM.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextM.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <div className="polli">Perplexity fast</div>
                <div >
                    {aitextPer.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextPer.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <div className="polli">GPT 5.2</div>
                <div >
                    {aitextLar.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextLar.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <div className="polli">Kimi</div>
                <div >
                    {aitextQwen.data ? <div className="totalPer"
                        dangerouslySetInnerHTML={{ __html: makeLinks(aitextQwen.data) }}
                    >
                    </div>
                        : <p>Loading text...</p>}
                </div>
                <br></br>
                <div style={{ height: "20px" }}>
                </div>
            </div>
            <ChatWithHistory />
            <ChatWithHistoryAir />
            <AiPictures />
            <AiVideo />
            <BackToTop />
        </>
    )
}
export default Aigenerator;