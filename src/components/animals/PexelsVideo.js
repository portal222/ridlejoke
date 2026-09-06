import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";

const PexelsVideo = () => {
    const [error, setError] = useState(null);
    const [video, setVideo] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const search = globalCtx.searchStringValue;

    useEffect(() => {
        getAnimals();
    }, []);


    const getAnimals = async () => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/pexelsvideo?query=${search}`;



        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            );

            setVideo(response.data.videos);


        } catch (err) {
            setError(err);

        }
    };

    return (
        <>
            <div className="mainBook">
                <div className="polli">
                    <a href="https://www.pexels.com" target="_blank">
                        <img src="https://images.pexels.com/lib/api/pexels-white.png" alt="pexels" style={{ width: "100px" }} />
                    </a>
                    <p>

                        video for {search}
                    </p>
                </div>
                <br />


                {video.map((vid, id) => (
                    <div style={{ marginTop: "20px" }} key={id}>
                        <video width="100%" controls>

                            <source
                                src={vid.video_files[1].link}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                ))}
                 <br/>
                <a href="https://www.pexels.com" target="_blank" >Video provided by Pexels </a>
                
      
            </div>

        </>
    );
};
export default PexelsVideo;