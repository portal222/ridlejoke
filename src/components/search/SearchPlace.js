import React from "react";
import SearchBox from "./SearchBox";
import SearchLogo from "./SearchLogo";
import Dictionary from "./Dictionary";
import SearchHistory from "./searchHistory";
import SearchHistoryEvents from "./searchHistoryEvents";
import SearchPerson from "./SearchPerson";
import SearchAdvice from "./SearchAdvice";




const SearchPlace = () => {

    return (

        <div className="place">
            <SearchBox placeholder={'Search Celebrity'} linkTo={'/poznati'} />
            <SearchLogo placeholder={'Search Logo'} linkTo={'/logo'}  />
            <Dictionary placeholder={'Search Word'} linkTo={'/dictionary'}  />
            <SearchAdvice placeholder={'Search Advice'} linkTo={'/advice'} />
         
            <h2>Search History</h2>

            <SearchHistory placeholder={'Year'} linkTo={'/history'}  />
            <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'}  /> 
            <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'}  /> 
        </div>
    )

}
export default SearchPlace;