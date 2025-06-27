import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizAnswer from "./QuizAnswer";
import Loader from "../Loader";

const Quiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [title, setTitle] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = `https://opentdb.com/api.php?amount=5`;

        try {
            const response = await axios.get(url);
            const data = response.data.results
        
            setQuiz(data);
            setTitle(data[0].category)
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <div className="quiz">
                {quiz.map((qu, i) => (
                    <div key={i}>
                        <p dangerouslySetInnerHTML={{ __html: qu.category }}
                            className="category"
                        ></p>

                        <p dangerouslySetInnerHTML={{ __html: qu.question }}
                            className="question"
                        ></p>
                        <div className="answer">
                            <QuizAnswer correct={qu.correct_answer} incorrect={qu.incorrect_answers}
                                number={Math.floor(Math.random() * 3)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="place"></div>
        </>
    )
}
export default Quiz;