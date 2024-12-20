import React from "react";
import RandomFact from "./trivia/RandomFact";
import Quotes from "./trivia/Quotes";

const Home = () => {

  return (
    <>
      <div className="home">
        <div className="imgHold">
          <img className="imgHome" src="https://picsum.photos/358/477" alt="city" />
        </div>
          <div className="welcom">WELCOME</div>
        <RandomFact />
        <Quotes />
      </div>
      <div className="place"></div>
    </>
  )
}
export default Home;