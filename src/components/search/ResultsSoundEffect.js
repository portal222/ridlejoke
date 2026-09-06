import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import PlayerFX from "../PlayerFX";
import SearchPlace from "./SearchPlace";
import SearchSoundEffect from "./SearchSoundEffect";

const ResultsSoundEffect = () => {
    const [error, setError] = useState(null);
    const [sound, setSound] = useState([]);
    const [available, setAvailable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const globalCtx = useContext(GlobalContext);
    const search = globalCtx.searchStringValue;

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
                        <th>
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
                                <td style={{ fontWeight: "bold" }}>
                                    {effect.title}
                                </td>
                                <td>
                                    🤵🏻 {effect.author}

                                </td>
                            </tr>
                            <tr>
                                <td>
                                     ⏱ {effect.duration_seconds}
                                </td>
                                <td>
                                    {effect.upload_date.split('T')[0] + " 👓 " + effect.views}
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <PlayerFX url={effect.url} />
                                </td>
                                <td>
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
                                        <p key={id}>{tag}</p>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ))}

        </>
    );
};
export default ResultsSoundEffect;