import React, { useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple, teal, green } from '@mui/material/colors';
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
import ResultsAdvice from "./search/ResultsAdvice";
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
        <div >
          <ThemeProvider
   
           theme={theme}>

            <NavLink to="/">
              <Button variant="contained">Home</Button>
            </NavLink>
            <NavLink to="/search">
              <Button variant="contained" color="secondary" sx={{ ml: 1 }} >
                Search</Button>
            </NavLink>
            <NavLink to="/jokes">
              <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
               Jokes
              </Button>
            </NavLink>
           
           
    
      
      
        
            <NavLink to="/pickTrivia">
              <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
             Quiz
              </Button>
            </NavLink>


        

         


          </ThemeProvider>
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
          <Route path="/historyPerson/:personName" element={<DetailsPerson />} />
          <Route path="/trivia/:triviaCat" element={<Trivia />} />
          <Route path="/advice" element={<ResultsAdvice />} />
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
          <Route path="/metropolitan" element={<ResultsMetropolitan />} />
          
          

        </Routes>

      </HashRouter>


<Footers />



    </>
  )

}
export default Navigation;