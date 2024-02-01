import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";
import Loader from "../Loader";


const Ridles = () => {

    const [answer, setAnswer] = useState([]);
    const [answer2, setAnswer2] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = "https://api.api-ninjas.com/v1/riddles";
        const url2 = "https://api.api-ninjas.com/v1/riddles";

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                });
            const response2 = await axios.get(url2,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                });

            const data = response.data;
            const data2 = response2.data;
            setAnswer(data[0]);
            setAnswer2(data2[0]);
            console.log("podaci iz zagonetki", data);

            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }
    //ubaceni antd dodatak da bi se pojavio odgovor
    const text = answer.answer
    const text2 = answer2.answer

    if (isLoading) {
        return (
            <div className="trivia">
                <Loader />
            </div>
        )
    }

    return (
        <div className="trivia" >
            <h2>Riddles</h2>
            <h3>{answer.title}</h3>
            {/* <span>{answer.airdate}</span> */}
            <Collapse

                size="large"
                items={[{
                    label: <p className="triviaAnswer">{answer.question}</p>,
                    children: <p className="triviaAns">{text}</p>,
                    showArrow: false,
                }]} />
            <h3>{answer2.title}</h3>
            {/* <span>{answer.airdate}</span> */}
            <Collapse

                size="large"
                items={[{
                    label: <p className="triviaAnswer">{answer2.question}</p>,
                    children: <p className="triviaAns">{text2}</p>,
                    showArrow: false,
                }]} />
        </div>
    )
}
export default Ridles;