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
import SearchArtWork from "./SearchArtWork";
import SearchPexelsVideo from "./SearchPexelsVideo";
import SearchMp3 from "./SearchMp3";
import SearchMusic from "./SearchMusic";
import SearchBooks from "./SearchBooks";
import SearchBible from "./searchBible";

const SearchPlace = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <div className="pickTrivia">
                <div>
                    <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                    <SearchLogo placeholder={'Logo'} linkTo={'/logo'} />
                    <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />
                    <SearchNYT placeholder={'The New York Times'} linkTo={'/nyTimes'} />
                    <SearchMetro placeholder={'Metropolitan museum'} linkTo={'/metro'} />
                    <SearchArtWork placeholder={'Works of art and artists'} linkTo={'/artsearch'} />
                    <SearchPexelsImg placeholder={'Image'} linkTo={'/pexels'} />
                    <SearchPexelsVideo placeholder={'Video'} linkTo={'/pexelsvideo'} />
                    <SearchSoundEffect placeholder={'Sound Effects'} linkTo={'/soundEffect'} />
                    <SearchMusic placeholder={'Music'} linkTo={'/music'} />
                </div>
                <div>
                    <div className="history">Search Books</div>
                    <SearchBooks placeholder={'Books & Authors'} linkTo={'/books'} />
                    <SearchBible placeholder={'Bible'} linkTo={'/bible'} />
                    <Dictionary placeholder={'Dictionary & Advice'} linkTo={'/dictionary'} />
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