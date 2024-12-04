import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../GlobalContext";
import axios from "axios";
import BackToTop from "../BackToTop";
import Loader from "../Loader";
// import NyTimes from "./NyTimes";

const SearchResutsNYT = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [nyTimes, setNyTimes] = useState([]);
    const [totalNyt, setTotalNyt] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageNyt, setPageNyt] = useState(1);



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    console.log("trazi se u NYT", searchStringValue)

    useEffect(() => {
        getTimes(searchStringValue, pageNyt);
    }, [searchStringValue, pageNyt]);

    const getTimes = async (searchStringValue, pageNyt) => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchStringValue}&page=${pageNyt}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        try {
            const response = await axios.get(url);
            const data = response.data;
            const dataHits = response.data.response.meta.hits;

            console.log("NOVI podaci NYT", data);
            console.log("broj hitova NYT", dataHits);
            setTotal(dataHits);
            setNyTimes(data.response.docs);
            setResults(data.response.docs.length);
            // setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const totalPagesNyt = Math.ceil(total / 10);

    return (
        <>
            {/* <div>

            <NyTimes name={searchStringValue} news={nyTimes} number={totalNyt} />
        </div> */}

            <div className="nytFont">
                <div>The New York Times</div>
                <div className="archive">{total} hits for {searchStringValue} in archive</div>
                <hr></hr>
            </div>
            <div className="tableNYT">
                {nyTimes.map((details, id) => (
                    <div key={id} >
                        <div className="nytTitle"> {details.headline.main} </div>
                        <div className="nytAbs">{details.abstract} </div>
                        <div className="nytPar">{details.lead_paragraph} </div>
                        {details.multimedia[0]?.url && (
                            <div className="imgHold">
                                <img className="nytImg" src={`https://www.nytimes.com/${details.multimedia[0]?.url}`} alt="no picture" />
                            </div>
                        )}
                        <div className="nytDate">
                            <div>{details.byline.original}</div>
                            <div>{details.pub_date} </div>
                            <a href={details.web_url} target="_blank">NYT</a>
                        </div>
                        <hr></hr>
                    </div>
                ))}
            </div>

            <div className="imageNum">
                {Array.from({ length: totalPagesNyt }, (_, i) => (
                    <div className={pageNyt === i + 1 ? 'numbActIm' : 'numbIm'}
                        key={i + 1}
                        onClick={() => setPageNyt(i + 1)}
                        disabled={i + 1 === pageNyt}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <div>{<BackToTop />}</div>
        </>
    )
};
export default SearchResutsNYT;