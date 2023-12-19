import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";

const QuestAnswer = () => {

    const [answer, setAnswer] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = "http://jservice.io/api/random";

        try {
            const response = await axios.get(url);
            const data = response.data;
            setAnswer(data[0]);
            console.log("podaci iz kviza", data);
        } catch (err) {
            setError(err);
        }
    }
    //ubaceni antd dodatak da bi se pojavio odgovor
    const text = answer.answer



    return (
        <div className="trivia" >
            <h2>Quiz</h2>
            <p>{answer.category?.title}</p>
            <span>{answer.airdate}</span>
            <Collapse

                size="large"
                items={[{
                    label: <p className="triviaAnswer">{answer.question}</p>,
                    children: <p className="triviaAnswer">{text}</p>,
                    showArrow: false,
                }]} />
        </div>
    )
}
export default QuestAnswer;