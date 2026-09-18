import React from "react";
import SearchLogo from "./SearchLogo";
import Dictionary from "./Dictionary";
import SearchHistory from "./searchHistory";
import SearchHistoryEvents from "./searchHistoryEvents";
import SearchPerson from "./SearchPerson";
import SearchColors from "./SearchColors";
import SearchNYT from "./SearchNYT";
import SearchMetro from "../metropolitan/SearchMetro";
import SearchAnimals from "./SearchAnimals";

import ExtinctAnimal from "../animals/ExtinctAnimal";
import SearchSoundEffect from "./SearchSoundEffect";
import SearchPexelsImg from "./SearchPexelsImg";
import SearchPexelsVideo from "./SearchPexelsVideo";
import SearchMp3 from "./SearchMp3";

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
                    <SearchNYT placeholder={'The New York Times'} linkTo={'/nyTimes'} />
                    <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />
                    <SearchSoundEffect placeholder={'Sound Effects'} linkTo={'/soundEffect'} />
                    <SearchPexelsImg placeholder={'Image'} linkTo={'/pexels'}/>
                    <SearchPexelsVideo placeholder={'Video'} linkTo={'/pexelsvideo'}/>
                </div>
                <div>
                    <div className="history">Search History</div>
                    <SearchHistory placeholder={'Year'} linkTo={'/history'} />
                    <SearchHistoryEvents placeholder={'Events'} linkTo={'/historyEvents'} />
                    <div className="history">Search Animals</div>
                    <SearchMp3 placeholder={'animals sound'} linkTo={'/animalSound'} />
                    <SearchAnimals placeholder={'Animals Cat and Dog'} linkTo={'/animals'} />
      
       

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