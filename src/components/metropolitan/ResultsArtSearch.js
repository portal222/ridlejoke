import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import BackToTop from "../BackToTop";
import ArtSearchDetails from "./ArtSearchDetails";
import SearchArtWork from "../search/SearchArtWork";

const ResultsArtSearch = () => {
    const [error, setError] = useState(null);
    const [artWork, setArtWork] = useState([]);
    const [available, setAvailable] = useState(0);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const globalCtx = useContext(GlobalContext);
    const search = globalCtx.searchStringValue;

    useEffect(() => {
        getArt(0);
    }, [search]);

    const getArt = async (newOffset = 0) => {

        setLoading(true);

        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/artsearch?query=${search}&offset=${newOffset}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data;

            setArtWork(data.artworks);
            setAvailable(data.available);
            setOffset(newOffset + 10);
            setIsLoading(false);

        } catch (err) {

            if (err.response && err.response.status === 402) {
                setError('You have reached your request limit for today. Please try again tomorrow.');
            } else {
                setError(err);
            }

        } finally {
            setLoading(false);
        }
    } 

    const loadMore = () => {
        if (!loading && offset < available) {
            getArt(offset);
        }
    };

    if (loading) {
        return <Loader />
    } else if ( available === 0 ) {
         <div className="mainBook">

                    <div className="polli">
                        <p>{search} not found</p>
                    </div>
                    <SearchArtWork placeholder={'Works of art and artists'} linkTo={'/artsearch'}/>

                </div>
    }

    return (
        <>
            {error ? (
                <div className="mainBook">

                    <div className="polli">
                        <p>{error}</p>
                    </div>
                    <SearchArtWork placeholder={'Works of art and artists'} linkTo={'/artsearch'}/>

                </div>
            ) : (
                <div className="mainBook">
                    <div className="polli">
                        <p>

                            {available} results for {search}
                        </p>
                    </div>
                    <br />
                    {artWork.map(art => (
                        <>
                            <ArtSearchDetails key={art.id} id={art.id} summary={art} />
                            <hr></hr>
                            <br></br>
                        </>
                    ))}
                    <div>
                        {offset < available && (
                            <button
                                onClick={() => {
                                    loadMore()
                                    window.scrollTo({ top: 0, behavior: 'smooth' });

                                }}
                                disabled={loading} className="moreButt">
                                {loading ? 'LOADING...' : 'MORE RESULTS'}
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div className="tabelaZemlje">
                <div style={{ padding: "20px", textAlign: "right" }}>

                    We thank <a href="https://artsearch.io/" target="_blank">Art Search</a> for the use of their database.
                </div>
            </div>
            <BackToTop />
        </>
    );
};
export default ResultsArtSearch;



