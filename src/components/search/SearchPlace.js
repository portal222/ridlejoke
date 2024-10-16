import React from "react";
import SearchLogo from "./SearchLogo";
import Dictionary from "./Dictionary";
import SearchHistory from "./searchHistory";
import SearchHistoryEvents from "./searchHistoryEvents";
import SearchPerson from "./SearchPerson";
import SearchAdvice from "./SearchAdvice";
import SearchColors from "./SearchColors";
import { useNavigate } from "react-router-dom";
import SearchPoke from "../pokemons/SearchPoke";
import SearchNYT from "./SearchNYT";
import SearchMetro from "../metropolitan/SearchMetro";




const SearchPlace = () => {

    const navigate = useNavigate();



  

    return (

     
        <div className="pickTrivia">
      
            <div>
                <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                <SearchLogo placeholder={'Logo'} linkTo={'/logo'} />
                <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />
                <Dictionary placeholder={'Word'} linkTo={'/dictionary'} />
                <SearchAdvice placeholder={'Advice'} linkTo={'/advice'} />
                <SearchNYT placeholder={'The New York Times'} linkTo={'/nyTimes'}/>
                
                <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />
                <SearchPoke placeholder={'Pokemon'} linkTo={'/pokemonSearch'} />
            </div>

            <div>
            <div className="history">Search History</div>
                <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />      
            </div>
        </div>
    )

}
export default SearchPlace;