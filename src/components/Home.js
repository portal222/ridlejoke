import React from "react";
import RandomFact from "./trivia/RandomFact";
import Quotes from "./trivia/Quotes";
import Horoscope from "./trivia/Horoscope";
import WorldWonders from "./metropolitan/WorldWonders";
import { useNavigate } from "react-router-dom";

const Home = () => {

  window.scrollTo({ top: 0, behavior: 'smooth' });

    const navigate = useNavigate();

    const handleNobel = () => {
      const LinkTo = '/nobel';
      navigate(LinkTo);
    }

  return (
    <>
      <div className="home">
        <div className="imgHold">
          <img className="imgHome" src="https://picsum.photos/358/477" alt="city" />
        </div>
        <div className="welcom">WELCOME</div>
        <RandomFact />
        <Quotes />
        <hr></hr>
        <div className="nobelPlace">
          <p className="nobelWinn">
          Here are all the Nobel Prize winners since 1901.

          </p>
          <p className="nobelButt"
          onClick={() => handleNobel()}
         >
            NOBEL
          </p>
        </div>
        <WorldWonders />
        <Horoscope />
      </div>
      <div className="place"></div>
    </>
  )
}
export default Home;