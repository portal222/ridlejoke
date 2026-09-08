import React, { useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal, green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";
import Footers from "./Footers";
import ResultsLogo from "./search/ResultsLogo";
import ResultsDictionary from "./search/ResultsDictionary";
import ResultsCelebs from "./search/ResultsCelebs";
import ResultsHistory from "./search/ResultsHistory";
import ResultsHistoryEvents from "./search/ResultsHistoryEvents";
import ResultsPerson from "./search/ResultsPerson";
import DetailsPerson from "./search/DetailsPerson";
import PickTrivia from "./trivia/PickTrivia";
import Ridles from "./trivia/Ridles";
import JokePlace from "./jokes/JokePlace";
import SearchPlace from "./search/SearchPlace";
import Trivia from "./trivia/Trivia";

import ResultsMetropolitan from "./search/ResultsMetropolitan";
import ResultsColors from "./search/ResultsColors";
import SearchResultsColor from "./search/SearchResultsColor";
import SearchResutsNYT from "./search/SearchResultsNYT";
import ResultsMetro from "./metropolitan/ResultsMetro";
import ResultsClickPerson from "./search/ResultsClickPerson";
import ClickMetro from "./metropolitan/ClickMetro";
import ClickMetro2 from "./metropolitan/ClickMetro2";
import Books from "./search/Books";
import BooksClick from "./search/BooksClick";
import AnimalsResults from "./animals/AnimalsResults";
import Aigenerator from "./search/Aigenerator";
import AnimalsMp3 from "./animals/AnimalsMp3";
import AnimalsMp3OnClick from "./animals/AnimalsMp3OnClick";
import Quiz from "./trivia/Quiz";
import NobelPrizes from "./nobel/NobelPrizes";
import NobelPrizesNext from "./nobel/NobelPrizesNext";
import TennisGame from "./games/TennisGame";
import TennisGame2p from "./games/TennisGame2p";
import SpaceShooter from "./games/SpaceShooter";
import FreeGames from "./games/FreeGames";
import ResultsSoundEffect from "./search/ResultsSoundEffect";
import PexelsImage from "./animals/PexelsImage";
import PexelsVideo from "./animals/PexelsVideo";
import ResultsSoundEffectOnClick from "./search/ResultsSoundEffectOnClick";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: teal,
  },
});

const Navigation = () => {

  return (
    <>
      <HashRouter basename="/">
        <div className="navigator">
          <div className="fixed">
            <ThemeProvider
              theme={theme}>
              <NavLink to="/">
                <Button variant="contained"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>Home</Button>
              </NavLink>
              <NavLink to="/pickTrivia">
                <Button variant="contained" color="secondary" sx={{ ml: 1 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                  Q & J
                </Button>
              </NavLink>
              <NavLink to="/aiGen">
                <Button variant="contained" color="secondary" sx={{ ml: 1 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                  AI
                </Button>
              </NavLink>
              <NavLink to="/search">
                <Button variant="contained" color="secondary" sx={{ ml: 1 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                  Search</Button>
              </NavLink>
            </ThemeProvider>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPlace />} />
          <Route path="/poznati" element={<ResultsCelebs />} />
          <Route path="/aiGen" element={<Aigenerator />} />
          <Route path="/pickTrivia" element={<PickTrivia />} />
          <Route path="/logo" element={<ResultsLogo />} />
          <Route path="/dictionary" element={<ResultsDictionary />} />
          <Route path="/history" element={<ResultsHistory />} />
          <Route path="/historyEvents" element={<ResultsHistoryEvents />} />
          <Route path="/historyPerson" element={<ResultsPerson />} />
          <Route path="/linkPerson/:linkName" element={<ResultsClickPerson />} />
          <Route path="/linkMetro/:linkName" element={<ClickMetro />} />
          <Route path="/linkMetro2/:linkName" element={<ClickMetro2 />} />
          <Route path="/historyPerson/:personName" element={<DetailsPerson />} />
          <Route path="/trivia/:triviaCat" element={<Trivia />} />
          <Route path="/colors" element={<ResultsColors />} />
          <Route path="/ridles" element={<Ridles />} />
          <Route path="/trivia" element={<Trivia />} />

          <Route path="/metro" element={<ResultsMetro />} />
          <Route path="/nyTimes" element={<SearchResutsNYT />} />
          <Route path="/colors" element={<ResultsColors />} />
          <Route path="/colorsSearch" element={<SearchResultsColor />} />
          <Route path="/books" element={<Books />} />
          <Route path="/linkBooks/:works" element={<BooksClick />} />
          <Route path="/animals" element={<AnimalsResults />} />
          <Route path="/animalsMp3" element={<AnimalsMp3 />} />
          <Route path="/aiGenerator" element={<Aigenerator />} />
          <Route path="/animalMp3/:animalName" element={<AnimalsMp3OnClick />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/nobel" element={<NobelPrizes />} />
          <Route path="/nobelNext/:link" element={<NobelPrizesNext />} />
          <Route path="/tenis" element={<TennisGame />} />
          <Route path="/tenis2p" element={<TennisGame2p />} />
          <Route path="/space" element={<SpaceShooter />} />
          <Route path="/freeGames" element={<FreeGames />} />
          <Route path="/soundEffect" element={<ResultsSoundEffect />} />
          <Route path="/pexels" element={<PexelsImage />} />
          <Route path="/pexelsvideo" element={<PexelsVideo />} />
          <Route path="/soundEffect/:soundName" element={<ResultsSoundEffectOnClick />} />
        </Routes>
      </HashRouter>
      <Footers />
    </>
  )
}
export default Navigation;