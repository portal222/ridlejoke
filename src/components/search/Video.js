import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../GlobalContext";
import axios from "axios";
import Loader from "../Loader";
import BackToTop from "../BackToTop";

const Video = () => {

    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);
    const [totalImage, setTotalImage] = useState(0);
    const [pageVid, setPageVid] = useState(1);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    const limit = 5;

    useEffect(() => {
        getImages(searchStringValue, page, pageVid);
    }, [searchStringValue, page, pageVid]);

    const getImages = async (searchStringValue, page, pageVid) => {

        const url = `https://list.ly/api/v4/search/image?q=${searchStringValue}&page=${page}&per_page=${limit}`
        const urlV = `https://list.ly/api/v4/search/video?q=${searchStringValue}&page=${pageVid}`

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            const responseV = await axios.get(urlV,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data
            const dataV = responseV.data

            setImage(data.results);
            setVideo(dataV.results);
            setTotalImage(data.meta.totalCount);
            setIsLoading(false);
        } catch (err) {
            setError(err);
        }
    }

    const totalPages = Math.ceil(totalImage / limit);
    const totalPagesVid = Math.ceil(200 / 25);

    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
          <div className="mainBook">
                <div className="titleBook">{totalImage} image for {searchStringValue}</div>
                {image.map((object, id) => (
                    <>
                        <div key={id} style={{ textAlign: "center" }}>
                            <img src={object.image} alt="" className="picture" />
                        </div>
                        <div className="tags">
                            <p>Tags:</p>
                            {object.tags.slice(0, 5).map((tag, id) => (
                                <p key={id}>
                                    {tag}
                                </p>
                            ))}
                        </div>
                    </>
                ))}
            </div>
            <div className="imageNum">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div className={page === i + 1 ? 'numbActIm' : 'numbIm'}
                        key={i + 1}
                        onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth'});
                        }}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <div className="videoTop"></div>
            <div className="mainBook">
            <div className="titleBook">Video for {searchStringValue}</div>
            </div>
            <div className="listVideo">
                {video.map((object, id) => (
                    <div key={id} className="content">
                        <img src={object.image} alt="no picture" />
                        <p className="titleVideo" dangerouslySetInnerHTML={{ __html: object.name }}></p>
                        <p dangerouslySetInnerHTML={{ __html: object.description }} style={{paddingBottom: "15px"}}></p>
                        <div className="link">
                            <a href={object.url} target="_blank">Youtube</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="imageNum">
                {Array.from({ length: totalPagesVid }, (_, i) => (
                    <div className={pageVid === i + 1 ? 'numbActIm' : 'numbIm'}
                        key={i + 1}
                        onClick={() => {
                            setPageVid(i + 1);
                        document.querySelector('.videoTop').scrollIntoView({ behavior: 'smooth' });
                        }}
                        disabled={i + 1 === pageVid}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    )
}
export default Video;