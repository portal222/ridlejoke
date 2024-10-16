import React, { useState, useEffect } from "react";

import axios from 'axios';
import { Collapse } from "antd";




const JokesOfficial = () => {

    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [fox, setFox] = useState([]);
   
   
  
    
 

    

    useEffect(() => {
        getJokes();
        getFox();
      
        
       
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

    const getFox = async () => {
     
        const url = "https://randomfox.ca/floof/";

        try {
            const response = await axios.get(url);
            const data = response.data
           

            setFox(data);
         
        } catch (err) {
            setError(err);
           
        }

    };

   

    
   
    



const text = jokes.punchline


    return (
        <>
           <div className="jokeMain" >
            <div className="type">Random joke type: {jokes.type}</div>
            <Collapse

                size="large"
                items={[{
                    label: <p className="jokeAnswer">{jokes.setup}</p>,
                    children: <p className="jokeAns">{text}</p>,
                    showArrow: false,
                }]} />
              <div>
            <img src={fox.image} alt="fox" style={{paddingTop: "20px"}} className="imgYes"/>
        </div>    
        </div>
      
       
       
        </>
    )

}
export default JokesOfficial;