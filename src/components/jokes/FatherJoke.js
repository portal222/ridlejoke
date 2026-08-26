import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Collapse } from "antd";


const FatherJoke = () => {

    const [error, setError] = useState(null);
    const [joke, setJoke] = useState([]);
  
    useEffect(() => {
        getFather();
    }, []);

    const getFather = async () => {
        const url = "https://jokefather.com/api/jokes/random"
        
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
          const data = response.data;
   
            setJoke(data);
      
        } catch (err) {
            setError(err);
        }
    }


  
    return (
        <>
            <div className="jokeMain" >
                <div className="type">Father joke</div>
                <Collapse
                    size="large"
                    items={[{
                        label: <p className="jokeAnswer">{joke.setup}</p>,
                        children: <p className="jokeAns">{joke.punchline}</p>,
                        showArrow: false,
                    }]} />
            </div>
        </>
    )
}
export default FatherJoke;