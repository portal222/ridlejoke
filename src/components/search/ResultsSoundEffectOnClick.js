import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Loader from "../Loader";
import PlayerFX from "../PlayerFX";
import SearchPlace from "./SearchPlace";
import SearchSoundEffect from "./SearchSoundEffect";
import { useParams } from "react-router-dom";


const ResultsSoundEffectOnClick = () => {
    const [error, setError] = useState(null);
    const [sound, setSound] = useState([]);
    const [available, setAvailable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

     const navigate = useNavigate();
 

      const params = useParams()
        const search = params.soundName;

    useEffect(() => {
        getHistory(search);
    }, [search]);

    const getHistory = async (search) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/sound?query=${search}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data;
            setSound(data.sounds);
            setAvailable(data.available);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

      const handleClick = (soundName) => {
        const LinkTo = `/soundEffect/${soundName}`;
        navigate(LinkTo);
    }


    if (isLoading) {
        return (
            <SearchPlace />,
            <Loader />)
    } else if (available === 0) {
        return (
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th className="history">{search} not found</th>
                    </tr>
                    <tr>
                        <th style={{padding: "10px"}}>
                            <SearchSoundEffect />
                        </th>
                    </tr>

                </thead>
            </table>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th className="history">Sound Effect for {search}</th>
                    </tr>

                </thead>
            </table>
            {sound.map((effect, id) => (
                <>
                    <table className="tabelaZemlje">
                        <tbody key={id} className="soundEffect">
                            <tr>
                                <td rowSpan={3}>
                                    <img src={effect.thumbnail} alt="" className="soundImg" />
                                </td>
                                <td style={{ fontWeight: "bold" }} className="title">
                                    {effect.title}
                                </td>
                                <td className="title">
                                    🤵🏻 {effect.author}

                                </td>
                            </tr>
                            <tr>
                                <td className="duration">
                                     ⏱ {effect.duration_seconds}
                                </td>
                                <td className="duration">
                                    {effect.upload_date.split('T')[0] + " 👓 " + effect.views}
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <PlayerFX url={effect.url} />
                                </td>
                                <td className="duration">
                                    <a href={effect.url} target="_blank">download </a>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <table className="tabelaZemlje">
                        <tbody className="soundEffect">
                            <tr>
                                <td className="soundGrid">
                                    {effect.tags.map((tag, id) => (
                                        <p key={id}
                                        onClick={() => {
                                            handleClick(tag);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        >{tag}</p>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   
                </>
            ))}
 <div style={{padding: "10px"}} className="tabelaZemlje">
                        <SearchSoundEffect />
                    </div>
        </>
    );
};
export default ResultsSoundEffectOnClick;