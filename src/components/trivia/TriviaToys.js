import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from 'axios';
import { Collapse } from "antd";
import Loader from "../Loader";



const Trivia = (props) => {

    const [answer, setAnswer] = useState([]);
    const [answer2, setAnswer2] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const params = useParams();
    const triviaCat = params.triviaCat;

    useEffect(() => {
        getAnswer();
    }, []);

    const getAnswer = async () => {
        const url = `https://api.api-ninjas.com/v1/trivia?category=toysgames`;
        const url2 = `https://api.api-ninjas.com/v1/trivia?category=toysgames`;

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
            const data = response.data[0];
            const data2 = response2.data[0];
            setAnswer(data);
            setAnswer2(data2);
        
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

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
       <>
        <div className="trivia" >
            <h3>Toys & Games</h3>
            <p>{answer.title}</p>
      
            <Collapse

                size="large"
                items={[{
                    label: <p className="triviaAnswer">{answer.question}</p>,
                    children: <p className="triviaAns">{text}</p>,
                    showArrow: false,
                }]} />
                 <p>{answer2.title}</p>
      
      <Collapse

          size="large"
          items={[{
              label: <p className="triviaAnswer">{answer2.question}</p>,
              children: <p className="triviaAns">{text2}</p>,
              showArrow: false,
          }]} />
               
        </div>
 
        </>
    )
}
export default Trivia;