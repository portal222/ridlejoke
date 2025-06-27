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
import TriviaScience from "./trivia/TriviaScience";
import TriviaGeneral from "./trivia/TriviaGeneral";
import TriviaFood from "./trivia/TriviaFood";
import TriviaPeople from "./trivia/TriviaPeople";
import TriviaHistory from "./trivia/TriviaHistory";
import TriviaGeography from "./trivia/TriviaGeography";
import TriviaEntertainment from "./trivia/TriviaEntertainment";
import TriviaToys from "./trivia/TriviaToys";
import TriviaMusic from "./trivia/TriviaMusic";
import TriviaLanguage from "./trivia/TriviaLanguage";
import TriviaReligion from "./trivia/TriviaReligion";
import TriviaSport from "./trivia/TriviaSport";
import TriviaMathematics from "./trivia/TriviaMathematics";
import ResultsMetropolitan from "./search/ResultsMetropolitan";
import ResultsColors from "./search/ResultsColors";
import SearchResultsColor from "./search/SearchResultsColor";
import Pokemon from "./pokemons/Pokemon";
import SearchRes from "./pokemons/SearchRes";
import PokemonPage from "./pokemons/PokemonPage";
import PokJson from "./pokemons/PokJson";
import SearchResutsNYT from "./search/SearchResultsNYT";
import ResultsMetro from "./metropolitan/ResultsMetro";
import ResultsClickPerson from "./search/ResultsClickPerson";
import ClickMetro from "./metropolitan/ClickMetro";
import ClickMetro2 from "./metropolitan/ClickMetro2";
import Books from "./search/Books";
import Video from "./search/Video";
import BooksClick from "./search/BooksClick";
import AnimalsResults from "./animals/AnimalsResults";
import Aigenerator from "./search/Aigenerator";
import AnimalsMp3 from "./animals/AnimalsMp3";
import AnimalsMp3OnClick from "./animals/AnimalsMp3OnClick";
import Quiz from "./trivia/Quiz";

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
              <Button variant="contained">Home</Button>
            </NavLink>
            <NavLink to="/pickTrivia">
              <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
                Quiz
              </Button>
            </NavLink>
            <NavLink to="/jokes">
              <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
                Jokes
              </Button>
            </NavLink>
            <NavLink to="/search">
              <Button variant="contained" color="secondary" sx={{ ml: 1 }} >
                Search</Button>
            </NavLink>
          </ThemeProvider>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPlace />} />
          <Route path="/poznati" element={<ResultsCelebs />} />
          <Route path="/jokes" element={<JokePlace />} />
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
          <Route path="/art" element={<Trivia />} />
          <Route path="/science" element={<TriviaScience />} />
          <Route path="/general" element={<TriviaGeneral />} />
          <Route path="/food" element={<TriviaFood />} />
          <Route path="/people" element={<TriviaPeople />} />
          <Route path="/holidays" element={<TriviaHistory />} />
          <Route path="/geography" element={<TriviaGeography />} />
          <Route path="/entertainment" element={<TriviaEntertainment />} />
          <Route path="/toys" element={<TriviaToys />} />
          <Route path="/music" element={<TriviaMusic />} />
          <Route path="/language" element={<TriviaLanguage />} />
          <Route path="/religion" element={<TriviaReligion />} />
          <Route path="/sport" element={<TriviaSport />} />
          <Route path="/mathematics" element={<TriviaMathematics />} />
          <Route path="/metro" element={<ResultsMetro />} />
          <Route path="/nyTimes" element={<SearchResutsNYT />} />
          <Route path="/colors" element={<ResultsColors />} />
          <Route path="/colorsSearch" element={<SearchResultsColor />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/pokemonSearch" element={<SearchRes />} />
          <Route path="/:numId" element={<PokemonPage />} />
          <Route path="/pokJson" element={<PokJson />} />
          <Route path="/books" element={<Books />} />
          <Route path="/linkBooks/:works" element={<BooksClick />} />
          <Route path="/video" element={<Video />} />
          <Route path="/animals" element={<AnimalsResults />} />
          <Route path="/animalsMp3" element={<AnimalsMp3 />} />
          <Route path="/aiGenerator" element={<Aigenerator />} />
          <Route path="/animalMp3/:animalName" element={<AnimalsMp3OnClick />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </HashRouter>
      <Footers />
    </>
  )
}
export default Navigation;