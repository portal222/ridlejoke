import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../Loader";
import BackToTop from "../BackToTop";

const ResultsBiblePhrase = () => {
    const [error, setError] = useState(null);
    const [passages, setPassages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAppending, setIsAppending] = useState(false);

    const passagesRef = useRef(null); // ref na scrollabilni kontejner

    const params = useParams();
    const reference = params.reference;

    useEffect(() => {
        let cancelled = false;
        setPassages([]);
        setIsLoading(true);
        setError(null);

        fetchPhrase(reference).then((passage) => {
            if (cancelled) return;
            if (passage) setPassages([passage]);
            setIsLoading(false);
        });

        return () => { cancelled = true; };
    }, [reference]);

    const fetchPhrase = async (ref) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/bibleref?ref=${encodeURIComponent(ref)}`;
        try {
            const response = await axios.get(url, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data.passages[0];
        } catch (err) {
            setError(err);
            return null;
        }
    };

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            if (passagesRef.current) {
                passagesRef.current.scrollTop = passagesRef.current.scrollHeight;
            }
        });
    };

    const scrollToTop = () => {
        requestAnimationFrame(() => {
            if (passagesRef.current) {
                passagesRef.current.scrollTop = 0;
            }
        });
    };

    const loadNext = async () => {
        if (isAppending || passages.length === 0) return;
        const last = passages[passages.length - 1];
        if (!last.next) return;

        setIsAppending(true);
        const nextPassage = await fetchPhrase(last.next);
        if (nextPassage) {
            setPassages(prev => [...prev, nextPassage]);
            scrollToBottom(); // prikaži novo dodati pasus
        }
        setIsAppending(false);
    };

    const loadPrevious = async () => {
        if (isAppending || passages.length === 0) return;
        const first = passages[0];
        if (!first.previous) return;

        setIsAppending(true);
        const prevPassage = await fetchPhrase(first.previous);
        if (prevPassage) {
            setPassages(prev => [prevPassage, ...prev]);
            scrollToTop(); // prikaži novo dodati pasus sa vrha
        }
        setIsAppending(false);
    };

    if (isLoading) return <Loader />;
    if (error) return <div>Greška: {error.message}</div>;
    if (passages.length === 0) return <div>Nema rezultata.</div>;

    return (
        <>
            <div className="bibleContainer">
                <div className="bibleHeader">
                    Bible {passages[0].reference}
                    {passages.length > 1 ? ` – ${passages[passages.length - 1].reference}` : ""}
                </div>

                <div className="bibleScroll" ref={passagesRef}>
                    {passages.map((p) => (
                        <div key={p.reference} className="biblePassage">
                            <div style={{fontWeight: "bold"}}>{p.reference}</div>
                            <div>{p.text}</div>
                        </div>
                    ))}
                </div>

                <div className="bibleButtons">
                    <button
                        className="biblButt"
                        onClick={loadPrevious}
                        disabled={isAppending || !passages[0].previous}
                    >
                        PREVIOUS
                    </button>
                    <button
                        className="biblButt"
                        onClick={loadNext}
                        disabled={isAppending || !passages[passages.length - 1].next}
                    >
                        {isAppending ? "LOADING..." : "NEXT"}
                    </button>
                </div>
            </div>
            <BackToTop />
        </>
    );
};

export default ResultsBiblePhrase;