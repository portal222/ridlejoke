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
            <div className="pickTrivia">
                <div className="description">
                    <p>
                        One of the first video games to appear on a console.
                    </p>
                </div>



                <div>
                    <div onClick={() => handleTenis()}
                        className="category">
                       Tenis
                    </div>
                </div>
            </div>


            <JokePlace />
        </>
    )
}
export default PickTrivia;