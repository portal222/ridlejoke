import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LoaderScale from "../LoaderScale";
import Player from "../Player";

const AnimalsMp3Click = ({ name }) => {
    const [error, setError] = useState(null);

    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalMp3, setTotalMp3] = useState(0);

        const navigate = useNavigate();
    
    console.log("ime iz animalsMp3Click", name)

    useEffect(() => {
        getAnimals(name);
    }, [name]);

    const getAnimals = async () => {
        const urlMp3 = `//xeno-canto.org/api/3/recordings?query=en:"${name}"&key=90da96a903a18674ef2ca9ac1790d828cc60705d`;

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
       const handleClick = (animalName) => {
        const LinkTo = `/animalMp3/${animalName}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <LoaderScale />
    } else if (totalMp3 == 0) {
        return (
            <>
                <div className="mainBook">
                    <div className="soundAnim">
                        <p>
                            no sound
                        </p>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="mainBook">

                {animals.slice(0, 1).map((animal, id) => {
                    const match = animal.osci.small.match(/uploaded\/([^\/]+)\/wave/);
                    const identifier = match ? match[1] : null;

                    return (
                        <div key={id}>
                            <br></br>
                            <div className="soundAnim">
                                <p>Sound of</p>
                                <p className="titleAnim">{animal.en}</p>

                                <p>recorded in</p>
                            </div>

                            <div className="soundAnim">
                                <p className="titleAnim">{animal.cnt}</p>
                                <p><b>{animal.loc}</b> </p>
                            </div>
                            <div className="soundAnim">

                                <table>
                                    <tbody>
                                        <Player url={`//xeno-canto.org/sounds/uploaded/${identifier}/${animal["file-name"]}`} />
                                    </tbody>
                                </table>
                                <div className="moreSound"
                                  onClick={() => {
                                        handleClick(animal.en);
                                        window.scrollTo({ top: 0, behavior: 'smooth'});
                                    }}>
                                        more sounds
                                    </div>
                            </div>
                            <div className="soundAnim">
                                <p >{animal.dvc}</p>
                                <p >{animal.length}</p>
                                <p >{animal.type}</p>
                                <p>{animal.date + " " + animal.time} </p>
                                <a href={animal.file} target="_blank">download </a>
                            </div>
                            <br></br>
                            <div className="soundAnim2">
                                <img src={animal.osci.small} alt="" />
                                <img src={animal.sono.small} alt="" />
                            </div>
                            <br></br>
                            <hr></hr>
                        </div>
                    )
                })}
            </div>
        </>
    )
};
export default AnimalsMp3Click;