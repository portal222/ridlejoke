import React, { useState, useEffect } from "react";
import YesNoGif from "./YesNoGif";
import DadJokes from "./DadJokes";
import ChukNorris from "./ChukNorris";
import JokesRandom from "./JokesRandom";
import JokesOfficial from "./JokesOfficial";
import RandomJoke from "./RandomJoke";
import JokesOne from "./JokesOne";

const JokePlace = () => {

    const [error, setError] = useState(null);

    return (
        <>
            <div className="jokesText">
                <div>
                    {<JokesRandom />}
                    {<JokesOfficial />}
                    {<YesNoGif />}
                    {<JokesOne />}
                </div>
                <div>
                    {<DadJokes />}
                    {<RandomJoke />}
                    {<ChukNorris />}
                </div>
            </div>
        </>
    )
}
export default JokePlace;