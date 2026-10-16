import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loader from "../Loader";
import fallback from "../../../public/assets/img/fallbackimg.png"

export default function ArtSearchDetails({ id, summary }) {
    const [open, setOpen] = useState(false);
    const [artWork, setArtWork] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadDetails = async () => {
        if (artWork) return;
        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://ridlejoke-proxy.kvaka32.workers.dev/artid/${id}`
            );
            setArtWork(data);
        } catch (err) {
            if (err.response && err.response.status === 402) {
                setError('You have reached your request limit for today. Please try again tomorrow.');
            } else {
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = () => {
        const next = !open;
        setOpen(next);
        if (next) loadDetails();
    };


    if (loading) {
        return <Loader />
    }

    return (
        <>
            {error ? (
                <div className="mainBook">

                    <div className="polli">
                        <p>{error}</p>
                    </div>
                    <SearchPexelsImg placeholder={'Works of art and artists'} linkTo={'/artsearch'} />
                </div>
            ) : (
                <>
                    <div>
                        <img
                            style={{ maxWidth: "100%", borderRadius: "8px" }}
                            src={summary.image || fallback}
                            alt={"no picture" || "unknown"}
                            onError={(e) => {
                                if (!e.target.src.includes(fallback)) {
                                    e.target.src = fallback;
                                }
                            }}
                        />
                        <p className='titleBook'>{summary.title}</p>
                        <p onClick={handleToggle} className='artMore'>
                            {open ? 'less ▲' : 'more ▼'}</p>
                    </div>
                    {open && (
                        <div>
                            <p>
                                {loading && <span>Učitavam…</span>}
                                {error && <span>Greška: {error.message}</span>}
                            </p>
                            {artWork?.author && (
                                <p className='titleBook'>{artWork?.author}</p>
                            )}
                            <div style={{ display: "flex", marginLeft: "30px" }}>
                                {artWork?.start_date && (
                                    <p className='artDate'>
                                        {artWork?.start_date}
                                    </p>
                                )}
                                {artWork?.end_date && (
                                    <p className='artDate'>
                                        -  {artWork?.end_date}
                                    </p>
                                )}
                                {artWork?.materials?.[0] && (
                                    <p className='artDate'>
                                        {artWork?.materials?.[0]}
                                    </p>
                                )}
                                {artWork?.art_types?.[0] && (
                                    <p className='artDate'>
                                        {artWork?.art_types?.[0]}
                                    </p>
                                )}
                                {artWork?.techniques?.[0] && (
                                    <p className='artDate'>
                                        {artWork?.techniques?.[0]}
                                    </p>
                                )}
                                {artWork?.origin && (
                                    <p className='artDate' style={{ fontWeight: "bold" }}>
                                        {artWork?.origin}
                                    </p>
                                )}
                            </div>
                            {artWork?.description && (
                                <p className='total'>
                                    {artWork?.description}
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}


