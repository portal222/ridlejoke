import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Loader from "../Loader";
import Player from "../Player";

const AnimalsCollapsableMp3 = ({ name }) => {
    const [error, setError] = useState(null);

    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalMp3, setTotalMp3] = useState(0);
    const [page, setPage] = useState(1);

    const limit = 2;

    useEffect(() => {
        getAnimals(name);
    }, [name]);

    const getAnimals = async () => {
        const urlMp3 = `//xeno-canto.org/api/3/recordings?query=en:"${name}"&key=90da96a903a18674ef2ca9ac1790d828cc60705d`;

        try {
            const responseMp3 = await axios.get(urlMp3);
            const dataMp3 = responseMp3.data.recordings;
            const lengthMp3 = responseMp3.data.recordings.length;

            setIsLoading(false);

            setAnimals(dataMp3);
            setTotalMp3(lengthMp3);

        } catch (err) {
            setError(err);
        }
    };

    const totalPages = Math.ceil(totalMp3 / limit);

    if (isLoading) {
        return <Loader />
    } else if (totalPages == 0) {
        return (
            <>
                <div className="mainBook">
                    <p className="total">No sound for {name}</p>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="mainBook">
                <p className="total">Sound for {name}</p>
                {animals.slice((page - 1) * limit, page * limit).map((animal) => {

                    const sonoFull = animal.sono?.large;
                    const identifier = sonoFull.split('/spectrograms/')[1].split('/')[0];

                    return (
                        <div key={animal.id}>
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
                                <p className="mark"
                                    dangerouslySetInnerHTML={{ __html: animal.rmk }}></p>
                            </div>
                            <div className="soundAnim2">
                                <img src={animal.sono.small} alt="" style={{ width: "320px" }} />
                            </div>
                            <br></br>
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
export default AnimalsCollapsableMp3;