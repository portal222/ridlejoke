import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";
import Loader from "../Loader";


const Ridles = () => {

    const [answer, setAnswer] = useState([]);
    const [answer2, setAnswer2] = useState([]);
    const [answer3, setAnswer3] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = "https://api.api-ninjas.com/v1/riddles";
        const url2 = "https://api.api-ninjas.com/v1/riddles";
        const url3 = "https://api.api-ninjas.com/v1/riddles";

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
            const response3 = await axios.get(url3,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                });

            const data = response.data;
            const data2 = response2.data;
            const data3 = response3.data;
            setAnswer(data[0]);
            setAnswer2(data2[0]);
            setAnswer3(data3[0]);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const text = answer.answer
    const text2 = answer2.answer
    const text3 = answer3.answer

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <div className="trivia" >
                <div className="categ" >Riddles</div>
                <hr></hr>
                <div className="categ">{answer.title}</div>

                <Collapse
                    size="large"
                    items={[{
                        label: <p className="triviaAnswer">{answer.question}</p>,
                        children: <p className="triviaAns">{text}</p>,
                        showArrow: false,
                    }]} />
                <div className="categ">{answer2.title}</div>

                <Collapse
                    size="large"
                    items={[{
                        label: <p className="triviaAnswer">{answer2.question}</p>,
                        children: <p className="triviaAns">{text2}</p>,
                        showArrow: false,
                    }]} />
                <div className="categ">{answer3.title}</div>

                <Collapse
                    size="large"
                    items={[{
                        label: <p className="triviaAnswer">{answer3.question}</p>,
                        children: <p className="triviaAns">{text3}</p>,
                        showArrow: false,
                    }]} />
            </div>
            <div className="place"></div>
        </>
    )
}
export default Ridles;