import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Collapse } from "antd";
import Loader from "../Loader";

const Trivia = (props) => {

    const [answer, setAnswer] = useState([]);
    const [answer2, setAnswer2] = useState([]);
    const [answer3, setAnswer3] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [brisi, setBrisi] = useState([]);

    const params = useParams();
    const triviaCat = params.triviaCat;

    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = `https://api.api-ninjas.com/v1/trivia`;
        const url2 = `https://api.api-ninjas.com/v1/trivia`;
        const url3 = `https://api.api-ninjas.com/v1/trivia`;
        // const urlTriv = `https://api.sampleapis.com/cartoons/cartoons3D`
        // const urlTriv = `https://api.tronalddump.io/random/quote`;
        // const urlTriv = `https://corporatebs-generator.sameerkumar.website/`;

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

            const data = response.data[0];
            const data2 = response2.data[0];
            const data3 = response3.data[0];
            setAnswer(data);
            setAnswer2(data2);
            setAnswer3(data3);
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
                <div className="categ">Trivia</div>
                <Collapse
                    size="large"
                    items={[{
                        label: <p className="triviaAnswer">{answer.question}</p>,
                        children: <p className="triviaAns">{text}</p>,
                        showArrow: false,
                    }]} />
                <div className="categ"></div>
                <Collapse
                    size="large"
                    items={[{
                        label: <p className="triviaAnswer">{answer2.question}</p>,
                        children: <p className="triviaAns">{text2}</p>,
                        showArrow: false,
                    }]} />
                <div className="categ"></div>
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
export default Trivia;