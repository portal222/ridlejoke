import React from "react";
import { useNavigate } from "react-router-dom";
import JokePlace from "../jokes/JokePlace";

const PickTrivia = () => {

    const navigate = useNavigate();

    const handleRidle = () => {
        const LinkTo = '/ridles';
        navigate(LinkTo);
    }
    const handleGeography = () => {
        const LinkTo = '/geography';
        navigate(LinkTo);
    }
    const handleQuiz = () => {
        const LinkTo = '/quiz';
        navigate(LinkTo);
    }
      const handleTenis = () => {
        const LinkTo = '/tenis';
        navigate(LinkTo);
    }
          const handleSpace = () => {
        const LinkTo = '/space';
        navigate(LinkTo);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <div className="pickTrivia">
                <div className="description">
                    <p>
                        Riddles sometimes serious, sometimes a trick question
                    </p>
                </div>
                <div>
                    <div onClick={() => handleRidle()}
                        className="category">
                        Riddles
                    </div>
                </div>
            </div>
            <div className="pickTrivia">
                <div className="description">
                    <p>
                        Trivia, click on the question for the answer
                    </p>
                </div>
                <div>
                    <div onClick={() => handleGeography()}
                        className="category">
                        Trivia
                    </div>
                </div>
            </div>
            <div className="pickTrivia">
                <div className="description">
                    <p>
                        Quiz questions from various fields and levels of difficulty, with suggested answers.
                    </p>
                </div>



                <div>
                    <div onClick={() => handleQuiz()}
                        className="category">
                        Quiz
                    </div>
                </div>

            </div >
            <div className="gamePlace">
           
                    <p>
                        Тwo famous games from the past.
                    </p>
          



                <div style={{display: "flex"}}>
                    <div onClick={() => handleTenis()}
                        className="gameBut">
                       Tennis
                    </div>
                      <div onClick={() => handleSpace()}
                        className="gameBut">
                       Space Shooter
                    </div>
                </div>
            </div>


            <JokePlace />
        </>
    )
}
export default PickTrivia;