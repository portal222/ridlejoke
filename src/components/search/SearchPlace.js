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
import ExtinctAnimal from "../animals/ExtinctAnimal";

const SearchPlace = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

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
                    <SearchNYT placeholder={'The New York Times'} linkTo={'/nyTimes'} />
                    <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />
                    <div className="history2">Test Pollinations Ai, For each query you get five answers, from various AI. The prompt can be in different languages. </div>
                    <SearchAiGen placeholder={'Ai text generator'} linkTo={'/aiGenerator'} />
                </div>
                <div>
                    <div className="history">Search History</div>
                    <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                    <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />
                    <div className="history">Search Animals</div>
                    <SearchAnimals placeholder={'Animals Cat and Dog'} linkTo={'/animals'} />
                    <SearchMp3 placeholder={'Animals sound'} linkTo={'/animalsMp3'} />
                    <SearchPoke placeholder={'Pokemons cards'} linkTo={'/pokemonSearch'} />

                </div>
            </div>
            <div className="home">

                <ExtinctAnimal />
            </div>
            <div className="place"></div>

        </>
    )
}
export default SearchPlace;