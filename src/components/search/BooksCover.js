import React, { useState, useEffect } from "react";

const BooksCover = ({ covers = [] }) => {
    const [style, setStyle] = useState("cover");
    const [validCovers, setValidCovers] = useState([]);

    const limitedCovers = covers.slice(1, 21);

    const changeStyle = () => {
        setStyle((prevStyle) => (prevStyle !== "cover" ? "cover" : "coverOpen"));
    };

    useEffect(() => {
        const checkImages = async () => {
            if (!Array.isArray(covers)) {
                console.error("covers is not array");
                return;
            }

            const promises = limitedCovers.map(async (img) => {
                // const url = `https://covers.openlibrary.org/b/olid/${img}-L.jpg`;
                const url = `https://covers.openlibrary.org/b/isbn/${img}-S.jpg`;
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        return url;
                    } else {
                        console.warn(`Image at ${url} not found, substituting...`);
                        return null;
                    }
                } catch (error) {
                    console.error(`Error fetching image ${url}: `, error);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            setValidCovers(results.filter(Boolean));
        };
        checkImages();
    }, [covers]);

    return (
        <>
            <div onClick={changeStyle} className="moreCovers">more covers</div>
            <div className={style} onClick={changeStyle}>
                {validCovers.length === 0 ? (
                    <p>No valid covers found</p>
                ) : (

                    validCovers.map((img, id) => (
                        <div key={id} className="imgContainer">
                            <img
                                src={img}
                                alt=""
                                className="imgCovers"
                                loader={<div>Loading...</div>} unloader={<div style={{ width: '143px', height: '200px', backgroundColor: 'lightgray'}}>No Image</div>}            
                            />
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
export default BooksCover;
