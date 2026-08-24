
import React from "react";
import YesNoGif from "./YesNoGif";
import DadJokes from "./DadJokes";
import ChukNorris from "./ChukNorris";
import JokesRandom from "./JokesRandom";
import JokesOfficial from "./JokesOfficial";
import RandomJoke from "./RandomJoke";
import HumorApi from "./HumorApi";
import ApiLeagueJoke from "./ApiLeagueJoke";

const JokePlace = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <div className="jokesText">
                <div>
                    {<JokesRandom />}
                    {<JokesOfficial />}
                    {<RandomJoke />}
                    {<YesNoGif />}
                    {<HumorApi />}
                </div>
                <div>
                    {<DadJokes />}
                    {<ApiLeagueJoke />}
                    {<ChukNorris />}
                </div>
            </div>
         
        </>
    )
}
export default JokePlace;