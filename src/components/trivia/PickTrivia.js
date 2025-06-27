import React from "react";
import { useNavigate } from "react-router-dom";

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
            <div className="place"></div>
        </>
    )
}
export default PickTrivia;