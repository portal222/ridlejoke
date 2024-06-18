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
    
    //kraj axios metode






    return (
        <>
        <table className="jokesMain">
            <thead>
                <tr>
                    <th >
                       Random GIF
                  
                    </th>
                </tr>
            </thead>
        
                <tbody>
                    <tr>
                        
                    
                        <td>
                            <img src={jokes.image}/>
                        </td>

                    </tr>
                    <tr>
                        <td
                        className="borderGif">
                            {jokes.answer}</td>
                    </tr>
               
                
                 
                  <tr>
                      <td>
                          {punapi.pun}
                      </td>
                  </tr>
                
      
                </tbody>
     
        </table>
        </>
    )

}
export default CatProb;