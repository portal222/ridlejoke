import React from "react";
// import SearchBox from "./SearchBox";
import SearchLogo from "./SearchLogo";
import Dictionary from "./Dictionary";
import SearchHistory from "./searchHistory";
import SearchHistoryEvents from "./searchHistoryEvents";
import SearchPerson from "./SearchPerson";
import SearchAdvice from "./SearchAdvice";
import SearchMetropolitan from "./SearchMetropolitan";
import SearchColors from "./SearchColors";
import { useNavigate } from "react-router-dom";
import SearchPoke from "../pokemons/SearchPoke";
import SearchNYT from "./SearchNYT";




const SearchPlace = () => {

    const navigate = useNavigate();



  

    return (

        <div className="place">
            <div className="search">
                <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                <SearchLogo placeholder={'Logo'} linkTo={'/logo'} />
                <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />
                <Dictionary placeholder={'Word'} linkTo={'/dictionary'} />
                <SearchAdvice placeholder={'Advice'} linkTo={'/advice'} />
                <SearchNYT placeholder={'New York Times'} linkTo={'/nyTimes'}/>
                <SearchMetropolitan placeholder={'Metropolitan'} linkTo={'/metropolitan'} />
                <SearchPoke placeholder={'Pokemon'} linkTo={'/pokemonSearch'} />
            </div>



            <div className="search">
            <h3>Search History</h3>
                <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />
              
            </div>


        </div>
    )

}
export default SearchPlace;