import React from "react";
import RandomFact from "./trivia/RandomFact";
import Quotes from "./trivia/Quotes";
import Horoscope from "./trivia/Horoscope";
import ExtinctAnimal from "./animals/ExtinctAnimal";

const Home = () => {

  window.scrollTo({ top: 0, behavior: 'smooth'});


  return (
    <>
      <div className="home">
        <div className="imgHold">
          <img className="imgHome" src="https://picsum.photos/358/477" alt="city" />
        </div>
          <div className="welcom">WELCOME</div>
        <RandomFact />
        <Quotes />
        <ExtinctAnimal />
        <Horoscope />
      </div>
      <div className="place"></div>
    </>
  )
}
export default Home;