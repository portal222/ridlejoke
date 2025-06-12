import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import Player from "../Player";
import SearchMp3 from "../search/SearchMp3";




const AnimalsMp3 = () => {
    const [error, setError] = useState(null);

    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalMp3, setTotalMp3] = useState(0);
    const [page, setPage] = useState(1);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    const limit = 5;


    useEffect(() => {
        getAnimals(searchStringValue);
    }, [searchStringValue]);

    const getAnimals = async () => {
        const urlMp3 = `//xeno-canto.org/api/3/recordings?query=en:"${searchStringValue}"&key=90da96a903a18674ef2ca9ac1790d828cc60705d`;

        try {
            const responseMp3 = await axios.get(urlMp3);
            const dataMp3 = responseMp3.data.recordings;
            const lengthMp3 = responseMp3.data.recordings.length;

            console.log("zvuci mp3", dataMp3);
            console.log("zvuci duzina niza mp3", lengthMp3);
            setIsLoading(false);

            setAnimals(dataMp3);
            setTotalMp3(lengthMp3);



        } catch (err) {
            setError(err);

        }
    };

    const totalPages = Math.ceil(totalMp3 / limit);
    console.log("totalPages je ovoliko", totalPages);

    if (isLoading) {
        return <Loader />
    } else if (totalPages == 0) {
        return (
            <>
                <div className="mainBook">
                    <p className="titleBook">{searchStringValue} not found</p>
                    <SearchMp3 />
                </div>
                <div className="place"></div>
                <div className="place"></div>
            </>
        )
    }
    return (
        <>
            <div className="mainBook">
                    <SearchMp3 />


                {animals.slice((page - 1) * limit, page * limit).map((animal, id) => {
                    // Izdvajanje identifikatora iz oscilogram slike
                    const match = animal.osci.small.match(/uploaded\/([^\/]+)\/wave/);
                    const identifier = match ? match[1] : null;

                    return (

                        <div key={id}>
                            <div className="soundAnim">
                                <p className="titleAnim">{animal.en}</p>

                                <p>{animal.gen}</p>
                                <p>{animal.grp}</p>
                            </div>
                            <div className="soundAnim">
                                <p className="titleAnim">{animal.cnt}</p>
                                <p>{animal.loc} </p>
                            </div>
                            <table>
                                <tbody>
                                    <Player url={`//xeno-canto.org/sounds/uploaded/${identifier}/${animal["file-name"]}`} />
                                </tbody>
                            </table>
                            <div className="soundAnim">
                                <p >{animal.rec}</p>
                                <p >{animal.method}</p>
                            </div>
                             <div className="soundAnim">
                                <p >{animal.length}</p>
                                <p >{animal.type}</p>

                                <p>{animal.date + " " + animal.time} </p>

                                <a href={animal.file} target="_blank">download </a>
                            </div>
                            <div className="soundAnim">
                                <p className="mark2">{animal.dvc + " " + animal.smp + " Hz "}</p>
                                <p className="mark">{animal.rmk}</p>
                            </div>
                           

                            <div className="soundAnim2">
                                <img src={animal.osci.small} alt="" />
                                <img src={animal.sono.small} alt="" />
                            </div>
                            <hr></hr>
                        </div>
                    )
                })}
            </div>
            <div className="imageNum">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div className={page === i + 1 ? 'numbActIm' : 'numbIm'}
                        key={i + 1}
                        onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </>
    )

};
export default AnimalsMp3;