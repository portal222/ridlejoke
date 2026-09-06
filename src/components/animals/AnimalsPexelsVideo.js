import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Search from "antd/es/input/Search";


const AnimalsPexelsVideo = ({ search }) => {
    const [error, setError] = useState(null);
    const [video, setVideo] = useState([]);





    useEffect(() => {
        getAnimals(search);
    }, [search]);


    const getAnimals = async (search) => {
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
         
            {video.slice(0, 1).map((vid, id) => (
                <div style={{ marginTop: "20px" }} key={id}>
                   <video width="100%" controls>

                            <source
                                src={vid.video_files[1].link}
                                type="video/mp4"
                            />
                        </video>
                </div>
            ))}


        </>
    );
};
export default AnimalsPexelsVideo;