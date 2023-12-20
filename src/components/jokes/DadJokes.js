import React, { useState, useEffect } from "react";

import axios from 'axios';



const DadJokes = () => {

    const [error, setError] = useState(null);
  
    const [facts, setFacts] = useState([]);
    
 



 
    
   

    useEffect(() => {
        getFacts();
    },[])

    const getFacts = async () => {
     
        
        const url = 'https://api.api-ninjas.com/v1/dadjokes?limit=2'
      

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                });
            const data = response.data;
       
            console.log("randum tatine sale", data);
           

            setFacts(data);
         
        } catch (err) {
            setError(err);
           
        }

    };




    return (
        <>
        <table className="dadJokes">
            <thead>
                <tr>
                    <th >
                      Dad jokes
                  
                    </th>
                </tr>
            </thead>
            {facts.map((fact) => (
                <tbody key={fact.joke}>
              
                    <tr>
                      
                        <td
                        className="border">
                            {fact.joke}</td>
                    </tr>
                 
                
      
                  
                </tbody>
            ))}
     
        </table>
        </>
    )

}
export default DadJokes;