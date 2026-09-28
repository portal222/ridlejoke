import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";

import BackToTop from "../BackToTop";
import ResultsMusicAlbums from "./ResultsMusicAlbums";
import SearchMusic from "./SearchMusic";

const ResultsMusic = () => {
    const [error, setError] = useState(null);
    const [musics, setMusics] = useState([]);
    const [available, setAvailable] = useState(null);
    const [album, setAlbum] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const search = globalCtx.searchStringValue;

    useEffect(() => {
        getMusic(search);
    }, [search]);

    const getMusic = async (search) => {
        const urlCom = `https://www.theaudiodb.com/api/v1/json/123/search.php?s=${search}`;
        const urlDis = `https://www.theaudiodb.com/api/v1/json/123/discography.php?s=${search}`;
        try {
            const response = await axios.get(urlCom);
            const responseDis = await axios.get(urlDis);
            setMusics(response.data.artists?.[0])
            setAvailable(response.data.artists);
            setAlbum(responseDis.data.album?.[0]);


        } catch (err) {
            setError(err);
        }
    };




    if (available === null) {
        return (
            <div className="tabelaZemlje">
                <p className="history"> {search} not found</p>

                <SearchMusic placeholder={'Music'} linkTo={'/music'} />

            </div>

        )
    }

    return (
        <>
            <div className="tabelaZemlje">
                <p className="history"> {search}</p>
                <img src={musics.strArtistLogo} alt="" className="soundImg" />
            </div>



            <div >
                <table className="tabelaZemlje">
                    <tbody className="soundEffect">
                        <tr>
                            <td rowSpan={4} style={{ textAlign: "center" }}>
                                <img src={musics.strArtistThumb} alt="" style={{ width: "400px" }} />
                            </td>
                            <td style={{ fontWeight: "bold" }} className="title">
                                {musics.intFormedYear}
                            </td>
                            {musics?.intDiedYear && (
                                <td style={{ fontWeight: "bold" }} className="title">
                                    {musics?.intDiedYear}
                                </td>
                            )}
                            <td className="title">
                                {musics.strGenre}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="duration">
                                {musics.strCountry}
                            </td>
                            <td className="duration">
                                {musics.strMood + "  " + musics.strStyle}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="duration">
                                {musics.strCountryCode}
                            </td>
                            <td className="duration">
                                {musics.strLabel}
                            </td>
                        </tr>
                        <tr>
                            {album?.strAlbum && (
                                <td colSpan={3} className="title">
                                    {album?.strAlbum + " " + "(" + album?.intYearReleased + ")"}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                {musics.strBiography}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="tabelaZemlje">
                    <tbody className="soundEffect">
                        <tr>
                            <td >
                                <img src={musics.strArtistFanart} alt="" />
                            </td>
                            <td >
                                <img src={musics.strArtistFanart2} alt="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src={musics.strArtistFanart3} alt="" />
                            </td>
                            <td >
                                <img src={musics.strArtistFanart4} alt="" />
                            </td>
                        </tr>
                        <tr>

                            <td>{musics.strWebsite && (

                                <a href={`https://${musics.strWebsite}`} target="_blank">web</a>
                            )}

                            </td>
                            <td>{musics.strFacebook && (

                                <a href={`https://${musics.strFacebook}`} target="_blank">facebook</a>
                            )}

                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <ResultsMusicAlbums albumID={musics?.strMusicBrainzID} album={album?.strAlbum} artist={musics?.strArtist} bend={search} />
        </>
    );
};
export default ResultsMusic;