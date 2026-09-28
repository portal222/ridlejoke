import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';


const ResultsMusicAlbums = (props) => {
    const [error, setError] = useState(null);
    const [musics, setMusics] = useState([]);
    const [available, setAvailable] = useState(null);

    const search = props.bend;
    const artist = props.artist;
    const album = props.album;

    useEffect(() => {
        getMusic();
    }, [search]);

    const getMusic = async () => {

        const urlAlb = `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${artist}&a=${album}`
        try {
            const responseAlb = await axios.get(urlAlb);
            setMusics(responseAlb.data?.album?.[0])

        } catch (err) {
            setError(err);
        }
    };


    return (
        <>
            <div >
                <table className="tabelaZemlje">
                    <tbody className="soundEffect">
                        <tr>
                            {musics?.strAlbumThumb && (
                                <td rowSpan={5}>
                                    <img src={musics?.strAlbumThumb} alt="" />
                                </td>
                            )}
                            {musics?.strAlbum && (
                                <td colSpan={3}
                                    style={{ fontWeight: "bold" }} className="title">
                                    {musics?.strAlbum + " - " + "(" + musics?.intYearReleased + ")"}
                                </td>
                            )}
                        </tr>
                        <tr>
                            {musics?.strGenre && (
                                <td className="duration">
                                    {musics?.strGenre}
                                </td>
                            )}
                            {musics?.strStyle && (
                                <td className="duration">
                                    {musics?.strStyle}
                                </td>
                            )}
                            {musics?.strMood && (
                                <td className="duration">
                                    {musics?.strMood}
                                </td>
                            )}
                        </tr>
                        <tr>
                            {musics?.strSpeed && (
                                <td className="duration">
                                    {" speed " + musics?.strSpeed}
                                </td>
                            )}
                            {musics?.strReleaseFormat && (
                                <td className="duration">
                                    {" format " + musics?.strReleaseFormat}
                                </td>
                            )}
                            {musics?.strLabel && (
                                <td className="duration">
                                    {" label " + musics?.strLabel}
                                </td>
                            )}
                        </tr>
                        <tr>
                            {musics?.strDescription && (
                                <td className="duration"
                                    colSpan={3}>
                                    {musics?.strDescription}
                                </td>
                            )}
                        </tr>
                        <tr>
                            {musics?.strReview && (
                                <td className="duration"
                                    colSpan={3}>
                                    {"review " + musics?.strReview}
                                </td>
                            )}
                        </tr>
                        {musics?.strAlbumCDart && (
                            <tr>
                                <td colSpan={4}>
                                    <img src={musics?.strAlbumCDart} alt="" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ResultsMusicAlbums;