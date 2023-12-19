import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";

const Ridles = () => {

    const [answer, setAnswer] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = "https://api.api-ninjas.com/v1/riddles";

        try {
            const response = await axios.get(url,
            {
                headers: {
                    'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                }
            });
            const data = response.data;
            setAnswer(data[0]);
            console.log("podaci iz zagonetki", data);
        } catch (err) {
            setError(err);
        }
    }
    //ubaceni antd dodatak da bi se pojavio odgovor
    const text = answer.answer



    return (
        <div className="trivia" >
            <h2>Ridles</h2>
            <h3>{answer.title}</h3>
            {/* <span>{answer.airdate}</span> */}
            <Collapse

                size="large"
                items={[{
                    label: <p className="triviaAnswer">{answer.question}</p>,
                    children: <p className="triviaAns">{text}</p>,
                    showArrow: false,
                }]} />
        </div>
    )
}
export default Ridles;