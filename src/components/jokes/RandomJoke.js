import React, { useState, useEffect } from "react";
import axios from 'axios';









const RandomJoke = () => {
    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState([]);





    useEffect(() => {
        getJokes();
    }, []);
  

    const getJokes = async () => {
        const url = `https://api.api-ninjas.com/v1/jokes`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;




            console.log("rezultat gradova", data)

            setJokes(data);
         
        } catch (err) {
            setError(err);

        }

    };




    return (
        <>
            <table className="dadJokes">
                <thead >

                    <tr>
                        <th >
                    
                        </th>
                    </tr>
                    <tr>
                        <th >
                            Random Jokes</th>
                    </tr>


                </thead>



                {jokes.map((dataObj) => (



                    <tbody key={dataObj.joke}
                    >
                    
                        <tr>
                            <td 
                            className="border">
                                {dataObj.joke}</td>
                        </tr>
                      
                   

                     
                    </tbody>

                ))}

            </table >
         
        </>
    );
};
export default RandomJoke;