import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';
import { Collapse } from "antd";
import Loader from "../Loader";



const Trivia = (props) => {

    const [answer, setAnswer] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const params = useParams();
    const triviaCat = params.triviaCat;

    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = `https://api.api-ninjas.com/v1/trivia?category=historyholidays`;

        try {
            const response = await axios.get(url,
            {
                headers: {
                    'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                }
            });
            const data = response.data[0];
            setAnswer(data);
        
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const text = answer.answer

    if (isLoading) {
        return (
            <div className="trivia">
             <Loader />   
            </div>
        )
    } 

    return (
       <>
        <div className="trivia" >
            <h3>History & Holidays</h3>
            <p>{answer.title}</p>
      
            <Collapse

                size="large"
                items={[{
                    label: <p className="triviaAnswer">{answer.question}</p>,
                    children: <p className="triviaAns">{text}</p>,
                    showArrow: false,
                }]} />
               
        </div>
 
        </>
    )
}
export default Trivia;