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
import Trivia from "./trivia/Trivia";
import PickTrivia from "./trivia/PickTrivia";
import ResultsAdvice from "./search/ResultsAdvice";
import Ridles from "./trivia/Ridles";

// import SearchComp from "./search/SearchComp";
import JokePlace from "./jokes/JokePlace";
import SearchPlace from "./search/SearchPlace";





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
          className="navigation"
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
       

        </Routes>

      </HashRouter>


<Footers />



    </>
  )

}
export default Navigation;