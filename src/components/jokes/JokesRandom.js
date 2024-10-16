import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";




const JokesRandom = () => {

    const [error, setError] = useState(null);
 
    const [randumJokes, setRandumJokes] = useState([]);
   
  
    
 

    

    useEffect(() => {
    
        getRandumJokes();
        
       
    }, []);

  

    const getRandumJokes = async () => {
     
        
        const url = "https://v2.jokeapi.dev/joke/Any?safe-mode";

        try {
            const response = await axios.get(url);
            const data = response.data;
       
            console.log("random jokes", data);
           

            setRandumJokes(data);
         
        } catch (err) {
            setError(err);
           
        }

    };

    
   
    




const text = randumJokes.delivery

    return (
        <>
           
        <div className="jokeMain" >
          
            <div className="type">Random joke category: {randumJokes.category}</div>
            <Collapse

                size="large"
                items={[{
                    label: <p className="jokeAnswer">{randumJokes.setup}  {randumJokes.joke}</p>,
                    children: <p className="jokeAns">{text}</p>,
                    showArrow: false,
                }]} />
        </div>
       
        </>
    )

}
export default JokesRandom;