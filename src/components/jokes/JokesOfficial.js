import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";




const JokesOfficial = () => {

    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
   
   
  
    
 

    

    useEffect(() => {
        getJokes();
      
        
       
    }, []);

    const getJokes = async () => {
     
        
        const url = "https://official-joke-api.appspot.com/random_joke";

        try {
            const response = await axios.get(url);
            const data = response.data;
       
            console.log("oficial jokes", data);
           

            setJokes(data);
         
        } catch (err) {
            setError(err);
           
        }

    };

   

    
   
    



const text = jokes.punchline


    return (
        <>
           <div className="jokeMain" >
            <h3>Random Joke</h3>
            <Collapse

                size="large"
                items={[{
                    label: <p className="jokeAnswer">{jokes.setup}</p>,
                    children: <p className="jokeAns">{text}</p>,
                    showArrow: false,
                }]} />
        </div>
       
       
        </>
    )

}
export default JokesOfficial;