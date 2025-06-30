
import YesNoGif from "./YesNoGif";
import DadJokes from "./DadJokes";
import ChukNorris from "./ChukNorris";
import JokesRandom from "./JokesRandom";
import JokesOfficial from "./JokesOfficial";
import RandomJoke from "./RandomJoke";

const JokePlace = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <div className="jokesText">
                <div>
                    {<JokesRandom />}
                    {<JokesOfficial />}
                    {<YesNoGif />}
                </div>
                <div>
                    {<DadJokes />}
                    {<RandomJoke />}
                    {<ChukNorris />}
                </div>
            </div>
            <div className="place"></div>
        </>
    )
}
export default JokePlace;