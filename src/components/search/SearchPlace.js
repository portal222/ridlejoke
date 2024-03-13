import React from "react";
import SearchBox from "./SearchBox";
import SearchLogo from "./SearchLogo";
import Dictionary from "./Dictionary";
import SearchHistory from "./searchHistory";
import SearchHistoryEvents from "./searchHistoryEvents";
import SearchPerson from "./SearchPerson";
import SearchAdvice from "./SearchAdvice";
import SearchMetropolitan from "./SearchMetropolitan";
import SearchColors from "./SearchColors";




const SearchPlace = () => {

    return (

        <div className="place">
            <div className="search">
                <SearchBox placeholder={'Celebrity'} linkTo={'/poznati'} />
                <SearchLogo placeholder={'Logo'} linkTo={'/logo'} />
                <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />
                <Dictionary placeholder={'Word'} linkTo={'/dictionary'} />
                <SearchAdvice placeholder={'Advice'} linkTo={'/advice'} />
                <SearchMetropolitan placeholder={'Metropolitan'} linkTo={'/metropolitan'} />
            </div>



            <div className="search">
            <h3>Search History</h3>
                <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />
                <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
            </div>


        </div>
    )

}
export default SearchPlace;