import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';









const RandomFact = () => {
    const [error, setError] = useState(null);
    const [facts, setFacts] = useState([]);





    useEffect(() => {
        getFacts();
    }, []);
  

    const getFacts = async () => {
        const url = `https://api.api-ninjas.com/v1/facts?limit=5`;

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
                            <h2>WELCOME</h2>
                            <h3>Random Facts:</h3></th>
                    </tr>


                </thead>



                {facts.map((dataObj) => (



                    <tbody key={dataObj.fact}
                    >
                    
                        <tr>
                            <td >{dataObj.fact}</td>
                        </tr>
                      
                   

                        <tr>
                            <td >
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>

                ))}

            </table >
            </div>
         
        </>
    );
};
export default RandomFact;