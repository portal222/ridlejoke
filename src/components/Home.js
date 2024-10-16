import React from "react";

import RandomFact from "./trivia/RandomFact";
import Quotes from "./trivia/Quotes";



const Home = () => {

  


  

    return (
        <>
        <div className="home">

      <div className="imgHold">

     
        <img className="imgHome" src="https://picsum.photos/347/462" alt="grad"/>
     
          
                <div className="welcom">WELCOME</div>
              
         
       </div>
  
       

        <RandomFact />
        <Quotes />
     
       
        </div>
   
        </>
    )
}
export default Home;