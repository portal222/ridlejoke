import React, { useState, useEffect } from "react";

import axios from 'axios';



const CatProb = () => {

    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);
    const [punapi, setPunapi] = useState([]);
  
    
 



    useEffect(() => {
        getJokes();
        getPunapi();
       
    }, []);

    const getJokes = async () => {
     
        
        const url = "https://yesno.wtf/api";

        try {
            const response = await axios.get(url);
            const data = response.data;
       
            console.log("randum sala", data);
           

            setJokes(data);
         
        } catch (err) {
            setError(err);
           
        }

    };

    const getPunapi = async () => {
     
        
        const url = "https://www.punapi.rest/api/pun";

        try {
            const response = await axios.get(url);
            const data = response.data;
                   console.log("random punapi", data);

            setPunapi(data);
         
        } catch (err) {
            setError(err);
           
        }

    };






    return (
        <>
        <div className="jokeMain">
           <div className="type">
                       Random GIF
           </div>
         <div>
                            <img src={jokes.image} alt="yesno" className="imgYes"/>
         </div>
        
              
                  
                    <div className="type">
                            {jokes.answer}
                    </div>
               
                
                 
                 <div>

                          {punapi.pun}
                 </div>
                 
     
        </div>
        </>
    )

}
export default CatProb;