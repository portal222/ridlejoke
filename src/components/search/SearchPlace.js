import React from "react";
import SearchLogo from "./SearchLogo";
import Dictionary from "./Dictionary";
import SearchHistory from "./searchHistory";
import SearchHistoryEvents from "./searchHistoryEvents";
import SearchPerson from "./SearchPerson";
import SearchColors from "./SearchColors";
import SearchPoke from "../pokemons/SearchPoke";
import SearchNYT from "./SearchNYT";
import SearchMetro from "../metropolitan/SearchMetro";
import SearchImage from "./SearchImage";
import SearchAnimals from "./SearchAnimals";
import SearchAiGen from "./SearchAiGen";
import SearchMp3 from "./SearchMp3";

const SearchPlace = () => {

    window.scrollTo({ top: 0, behavior: 'smooth'});

    return (
     <>
        <div className="pickTrivia">
            <div>
                <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                <SearchLogo placeholder={'Logo'} linkTo={'/logo'} />
                <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />
                <Dictionary placeholder={'Dictionary & Advice'} linkTo={'/dictionary'} />
                <SearchHistoryEvents placeholder={'Books & Authors'} linkTo={'/books'} /> 
                <SearchImage placeholder={'Images & Videos'} linkTo={'/video'} />  
                <SearchNYT placeholder={'The New York Times'} linkTo={'/nyTimes'}/>
                <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />
                <SearchAnimals placeholder={'Animals'} linkTo={'/animals'}/>
                <SearchMp3 placeholder={'Animals sound'} linkTo={'/animalsMp3'}/>
                <SearchPoke placeholder={'Pokemon'} linkTo={'/pokemonSearch'} />
                <SearchAiGen placeholder={'Ai generator text & img'} linkTo={'/aiGenerator'} />
            </div>
            <div>
            <div className="history">Search History</div>
                <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />      
            </div>
        </div>
        <div className="place"></div>
        </>
    )
}
export default SearchPlace;