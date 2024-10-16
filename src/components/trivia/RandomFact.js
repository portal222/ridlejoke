import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';









const RandomFact = () => {
    const [error, setError] = useState(null);
    const [facts, setFacts] = useState([]);





    useEffect(() => {
        getFacts();
    }, []);
  

    const getFacts = async () => {
        const url = `https://api.api-ninjas.com/v1/facts`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;




            console.log("rezultat cinjenica", data)

            setFacts(data);
         
        } catch (err) {
            setError(err);

        }

    };




    return (
        <><div className="facts">
            <table className="table">
                <thead >

                 
                    <tr>
                        <th >
                     
                            <h3>Random Facts:</h3></th>
                    </tr>


                </thead>






                    <tbody 
                    >
                    {facts.map((dataObj) => (
                    
                        <tr key={dataObj.fact}>
                            <td >{dataObj.fact}</td>
                        </tr>
                      
                   
                      ))}

                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>


            </table >
 
            </div>
         
        </>
    );
};
export default RandomFact;