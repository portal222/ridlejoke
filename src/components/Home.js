import React from "react";
import Footers from "./Footers";
import RandomFact from "./trivia/RandomFact";
import Quotes from "./trivia/Quotes";

const Home = () => {


    return (
        <>
        <div className="slika">
       

        <RandomFact />
        <Quotes />
       
        </div>
   
        </>
    )
}
export default Home;