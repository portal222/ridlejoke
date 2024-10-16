import React, { useState, useEffect } from "react";

import axios from 'axios';


//ovo je samo proba treba se registrovati na sajt da bi se dobio key


const JokesOne = () => {

    const [error, setError] = useState(null);
 
    const [randumJokes, setRandumJokes] = useState([]);
   
  
    
 

    

    useEffect(() => {
    
        getRandumJokes();
        
       
    }, []);

  

    const getRandumJokes = async () => {
     
        
        const url = "https://api.jokes.one/joke/random";

        try {
            const response = await axios.get(url);
            const data = response.data;
       
            console.log("jokesONE podaci", data);
           

            setRandumJokes(data);
         
        } catch (err) {
            setError(err);
           
        }

    };

    
   
    






    return (
        <>
           
        <div className="jokeMain" >
          
         
        </div>
       
        </>
    )

}
export default JokesOne;