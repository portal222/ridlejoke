import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchPerson from "./SearchPerson";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import NyTimes from "./NyTimes";
import BackToTop from "../BackToTop";
import ResultsCelebs from "./ResultsCelebs";
import DetailsPersonUrl from "./DetailsPersonUrl";

const DetailsPerson = (props) => {
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [celebs, setCelebs] = useState([]);
    const [nytPerson, setNytPerson] = useState([]);

    const [results, setResults] = useState();
    const [resHis, setResHis] = useState();


    const params = useParams()
    const personName = params.personName;

    useEffect(() => {
        getPerson();
        getTimes();
    }, []);
    console.log("iz detailsPerson params:", personName);

    const getPerson = async () => {
        const url = `https://api.api-ninjas.com/v1/historicalfigures?name=${personName}`;
        const urlCel = `https://api.api-ninjas.com/v1/celebrity?name=${personName}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const responseCel = await axios.get(urlCel,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;
            const dataCel = responseCel.data;

            console.log("detalji istorijske persone", data)
            console.log("detalji celebsa", dataCel);
            setPersons(data);
            setCelebs(dataCel);
            setIsLoading(false);
            setResults(dataCel.length);
            setResHis(data.length);




        } catch (err) {
            setError(err);

        }
    };

    console.log("celebs rezultati", results)

    const getTimes = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${personName}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        const response = await fetch(url);
        const data = await response.json();
        console.log(" podaci NYT persone sa fetchom ", data.response.docs);
        setNytPerson(data.response.docs);
    }


    if (isLoading) {
        return <Loader />
    } else if (resHis == 0) {
        return (
            <>
                <table className="tabelaZemlje">
                    <thead >
                        <tr>
                            <th colSpan={2}>
                                <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                            </th>
                        </tr>

                        <tr className="results">
                            <th colSpan={2} >
                                Nothing found in historical persons base
                            </th>
                        </tr>

                    </thead>
                </table>
                <ResultsCelebs celebs={celebs} results={results} />
                <NyTimes news={nytPerson} />
            </>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th colSpan={2}>
                            <SearchPerson placeholder={'Persons'} linkTo={'/historyPerson'} />
                        </th>
                    </tr>

                    <tr className="results">
                        <th colSpan={2} >
                            Data from historical persons base
                        </th>
                    </tr>

                </thead>

                {persons.map((dataObj, id) => (
                    <tbody key={id} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="celebrity">{dataObj.name}</td>
                        </tr>
                        {dataObj.info.native_name && (
                            <tr>
                                <td className="navod">Native name:</td>
                                <td className="nameComm">{dataObj.info.native_name}</td>
                            </tr>
                        )}
                        {dataObj.info.also_known_as && (
                            <tr>
                                <td className="navod">Also known as:</td>
                                <td className="nameComm">{dataObj.info.also_known_as}</td>
                            </tr>
                        )}
                        {dataObj.info.nicknames && (
                            Array.isArray(dataObj.info.nicknames) ? (
                                <tr>
                                    <td className="navod">Nicknames:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.nicknames.map((nick, id) => (
                                                <li key={id}>{nick}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Nickname:</td>
                                    <td className="nameComm">{dataObj.info.nicknames}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.birth_name && (
                            <tr>
                                <td className="navod">Birth name:</td>
                                <td className="nameComm">{dataObj.info.birth_name}</td>
                            </tr>
                        )}
                        {dataObj.info.practice_name && (
                            <tr>
                                <td className="navod">Practice name:</td>
                                <td className="nameComm">{dataObj.info.practice_name}</td>
                            </tr>
                        )}
                        {dataObj.info.other_names && (
                            Array.isArray(dataObj.info.other_names) ? (
                                <tr>
                                    <td className="navod">Other names:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.other_names.map((other, id) => (
                                                <li key={id}>{other}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Other name:</td>
                                    <td className="nameComm">{dataObj.info.other_names}</td>
                                </tr>
                            )
                        )}

                        {dataObj.info.ring_names && (
                            Array.isArray(dataObj.info.ring_names) ? (
                                <tr>
                                    <td className="navod">Ring names:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.ring_names.map((ring, id) => (
                                                <li key={id}>{ring}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Ring name:</td>
                                    <td className="nameComm">{dataObj.info.ring_names}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.pen_name && (
                            <tr>
                                <td className="navod">Pen name:</td>
                                <td className="nameComm">{dataObj.info.pen_name}</td>
                            </tr>
                        )}
                        {dataObj.info.billed_from && (
                            <tr>
                                <td className="navod">From:</td>
                                <td className="nameComm">{dataObj.info.billed_from}</td>
                            </tr>
                        )}
                        {dataObj.title && (
                            <tr>
                                <td className="navod">Title:</td>
                                <td className="nameComm">{dataObj.title}</td>
                            </tr>
                        )}
                        {dataObj.info.period && (
                            <tr>
                                <td className="navod">Period:</td>
                                <td className="nameComm">{dataObj.info.period}</td>
                            </tr>
                        )}
                        {dataObj.info.era && (
                            Array.isArray(dataObj.info.era) ? (
                                <tr>
                                    <td className="navod">Era:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.era.map((era, id) => (
                                                <li key={id}>{era}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Era:</td>
                                    <td className="nameComm">
                                        {dataObj.info.era}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.literary_movement && (
                            <tr>
                                <td className="navod">Literary movement:</td>
                                <td className="nameComm">{dataObj.info.literary_movement}</td>
                            </tr>
                        )}
                        {dataObj.info.debut && (
                            <tr>
                                <td className="navod">Debut:</td>
                                <td className="nameComm">{dataObj.info.debut}</td>
                            </tr>
                        )}
                        {dataObj.info.retired && (
                            <tr>
                                <td className="navod">Retired:</td>
                                <td className="nameComm">{dataObj.info.retired}</td>
                            </tr>
                        )}
                        {dataObj.info.language && (
                            <tr>
                                <td className="navod">Language:</td>
                                <td className="nameComm">{dataObj.info.language}</td>
                            </tr>
                        )}
                        {dataObj.info.billed_height && (
                            <tr>
                                <td className="navod">Height:</td>
                                <td className="nameComm">{dataObj.info.billed_height}</td>
                            </tr>
                        )}
                        {dataObj.info.billed_weight && (
                            <tr>
                                <td className="navod">Weight:</td>
                                <td className="nameComm">{dataObj.info.billed_weight}</td>
                            </tr>
                        )}

                        {dataObj.info.cooking_style && (
                            Array.isArray(dataObj.info.cooking_style) ? (
                                <tr>
                                    <td className="navod">Cooking style:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.cooking_style.map((style, id) => (
                                                <li key={id}>{style}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">cooking_style:</td>
                                    <td className="nameComm">
                                        {dataObj.info.cooking_style}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.other_posts && (
                            <tr>
                                <td className="navod">Other posts:</td>
                                <td className="nameComm">{dataObj.info.other_posts}</td>
                            </tr>
                        )}
                        {dataObj.info.predecessor && (
                            <tr>
                                <td className="navod">Predecessor:</td>
                                <td className="nameComm">{dataObj.info.predecessor}</td>
                            </tr>
                        )}
                        {dataObj.info.preceded_by && (
                            <tr>
                                <td className="navod">Preceded by:</td>
                                <td className="nameComm">{dataObj.info.preceded_by}</td>
                            </tr>
                        )}
                        {dataObj.info.successor && (
                            <tr>
                                <td className="navod">Successor:</td>
                                <td className="nameComm">{dataObj.info.successor}</td>
                            </tr>
                        )}
                        {dataObj.info.succeeded_by && (
                            <tr>
                                <td className="navod">Succeeded by:</td>
                                <td className="nameComm">{dataObj.info.succeeded_by}</td>
                            </tr>
                        )}
                        {dataObj.info.monarch && (
                            <tr>
                                <td className="navod">Monarch:</td>
                                <td className="nameComm">{dataObj.info.monarch}</td>
                            </tr>
                        )}
                        {dataObj.info.deputy && (
                            <tr>
                                <td className="navod">Deputy:</td>
                                <td className="nameComm">{dataObj.info.deputy}</td>
                            </tr>
                        )}
                        {dataObj.info.first_secretary && (
                            Array.isArray(dataObj.info.first_secretary) ? (
                                <tr>
                                    <td className="navod">First secretary:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.first_secretary.map((first, id) => (
                                                <li key={id}>{first}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">First secretary:</td>
                                    <td className="nameComm">
                                        {dataObj.info.first_secretary}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.cabinet && (
                            <tr>
                                <td className="navod">Cabinet:</td>
                                <td className="nameComm">{dataObj.info.cabinet}</td>
                            </tr>
                        )}

                        {dataObj.info.fields && (
                            Array.isArray(dataObj.info.fields) ? (
                                <tr>
                                    <td className="navod">Fields:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.fields.map((field, id) => (

                                                <li key={id}>{field}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Field:</td>
                                    <td className="nameComm">
                                        {dataObj.info.fields}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.movement && (
                            Array.isArray(dataObj.info.movement) ? (
                                <tr>
                                    <td className="navod">Movement:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.movement.map((move, id) => (
                                                <li key={id}>{move}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Movement:</td>
                                    <td className="nameComm">
                                        {dataObj.info.movement}
                                    </td>
                                </tr>
                            )
                        )}
                         {dataObj.info.movement && (
                            Array.isArray(dataObj.info.movement) ? (
                                <tr>
                                    <td className="navod">Movement:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.movement.map((move, id) => (
                                                <li key={id}>{move}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Movement:</td>
                                    <td className="nameComm">
                                        {dataObj.info.movement}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.monuments && (
                            Array.isArray(dataObj.info.monuments) ? (
                                <tr>
                                    <td className="navod">Monuments:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.monuments.map((monument, id) => (
                                                <li key={id}>{monument}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Monuments:</td>
                                    <td className="nameComm">
                                        {dataObj.info.monuments}
                                    </td>
                                </tr>
                            )
                        )}


                        {dataObj.info.contributions && (
                            Array.isArray(dataObj.info.contributions) ? (
                                <tr>
                                    <td className="navod"> Contributions:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.contributions.map((cont, id) => (
                                                <li key={id}>{cont}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod"> Contribution:</td>
                                    <td className="nameComm">
                                        {dataObj.info.contributions}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.influences && (
                            Array.isArray(dataObj.info.influences) ? (
                                <tr>
                                    <td className="navod">Influences:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.influences.map((influ, id) => (
                                                <li key={id}>{influ}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Influences:</td>
                                    <td className="nameComm">
                                        {dataObj.info.influences}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.influenced && (
                            Array.isArray(dataObj.info.influenced) ? (
                                <tr>
                                    <td className="navod">Influenced:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.influenced.map((influ, id) => (
                                                <li key={id}>{influ}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Influenced:</td>
                                    <td className="nameComm">
                                        {dataObj.info.influenced}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.genres && (
                            Array.isArray(dataObj.info.genres) ? (
                                <tr>
                                    <td className="navod">Genres:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.genres.map((genre, id) => (

                                                <li key={id}>{genre}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Genres:</td>
                                    <td className="nameComm">
                                        {dataObj.info.genres}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.genre && (
                            Array.isArray(dataObj.info.genre) ? (
                                <tr>
                                    <td className="navod">Genre:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.genre.map((genre, id) => (
                                                <li key={id}>{genre}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Genre:</td>
                                    <td className="nameComm">
                                        {dataObj.info.genre}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.subjects && (
                            Array.isArray(dataObj.info.subjects) ? (
                                <tr>
                                    <td className="navod">Subjects:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.subjects.map((subjects, id) => (
                                                <li key={id}>{subjects}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Subjects:</td>
                                    <td className="nameComm">
                                        {dataObj.info.subjects}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.instruments && (
                            Array.isArray(dataObj.info.instruments) ? (
                                <tr>
                                    <td className="navod">Instruments:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.instruments.map((instrument, id) => (

                                                <li key={id}>{instrument}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Instruments:</td>
                                    <td className="nameComm">
                                        {dataObj.info.instruments}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.discipline && (
                            Array.isArray(dataObj.info.discipline) ? (
                                <tr>
                                    <td className="navod">Discipline:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.discipline.map((disciplin, id) => (
                                                <li key={id}>{disciplin}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Discipline:</td>
                                    <td className="nameComm">
                                        {dataObj.info.discipline}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.region && (
                            Array.isArray(dataObj.info.region) ? (
                                <tr>
                                    <td className="navod">Region:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.region.map((reg, id) => (
                                                <li key={id}>{reg}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Region:</td>
                                    <td className="nameComm">
                                        {dataObj.info.region}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.attributes && (
                            Array.isArray(dataObj.info.attributes) ? (
                                <tr>
                                    <td className="navod">Attributes:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.attributes.map((attribut, id) => (
                                                <li key={id}>{attribut}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Attributes:</td>
                                    <td className="nameComm">
                                        {dataObj.info.attributes}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.profession && (
                            <tr>
                                <td className="navod">Profession:</td>
                                <td className="nameComm">{dataObj.info.profession}</td>
                            </tr>
                        )}
                        {dataObj.info.position && (
                            <tr>
                                <td className="navod">Position:</td>
                                <td className="nameComm">{dataObj.info.position}</td>
                            </tr>
                        )}
                        {dataObj.info.number && (
                            <tr>
                                <td className="navod">Number:</td>
                                <td className="nameComm">{dataObj.info.number}</td>
                            </tr>
                        )}

                        {dataObj.info.games_played && (
                            <tr>
                                <td className="navod">Games played:</td>
                                <td className="nameComm">{dataObj.info.games_played}</td>
                            </tr>
                        )}
                        {dataObj.info.games_started && (
                            <tr>
                                <td className="navod">Games started:</td>
                                <td className="nameComm">{dataObj.info.games_started}</td>
                            </tr>
                        )}
                        {dataObj.info.forced_fumbles && (
                            <tr>
                                <td className="navod">Forced fumbles:</td>
                                <td className="nameComm">{dataObj.info.forced_fumbles}</td>
                            </tr>
                        )}
                        {dataObj.info.tackles && (
                            <tr>
                                <td className="navod">Tackles:</td>
                                <td className="nameComm">{dataObj.info.tackles}</td>
                            </tr>
                        )}
                        {dataObj.info.playing_career && (
                            <tr>
                                <td className="navod">Playing career:</td>
                                <td className="nameComm">{dataObj.info.playing_career}</td>
                            </tr>
                        )}
                        {dataObj.info.coaching_career && (
                            <tr>
                                <td className="navod">Coaching career:</td>
                                <td className="nameComm">{dataObj.info.coaching_career}</td>
                            </tr>
                        )}
                        {dataObj.info.fumble_recoveries && (
                            <tr>
                                <td className="navod">Fumble recoveries:</td>
                                <td className="nameComm">{dataObj.info.fumble_recoveries}</td>
                            </tr>
                        )}
                        {dataObj.info.interceptions && (
                            <tr>
                                <td className="navod">Interceptions:</td>
                                <td className="nameComm">{dataObj.info.interceptions}</td>
                            </tr>
                        )}
                        {dataObj.info.nfl_draft && (
                            <tr>
                                <td className="navod">NFL draft:</td>
                                <td className="nameComm">{dataObj.info.nfl_draft}</td>
                            </tr>
                        )}

                        {dataObj.info.occupation && (
                            Array.isArray(dataObj.info.occupation) ? (
                                <tr>
                                    <td className="navod">Occupation:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.occupation.map((occup, id) => (
                                                <li key={id}>{occup}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Occupation:</td>
                                    <td className="nameComm">
                                        {dataObj.info.occupation}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.occupations && (
                            Array.isArray(dataObj.info.occupations) ? (
                                <tr>
                                    <td className="navod">Occupations:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.occupations.map((occupation, id) => (
                                                <li key={id}>{occupation}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Occupations:</td>
                                    <td className="nameComm">
                                        {dataObj.info.occupations}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.main_interests && (
                            Array.isArray(dataObj.info.main_interests) ? (
                                <tr>
                                    <td className="navod">Main interests:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.main_interests.map((interests, id) => (
                                                <li key={id}>{interests}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Main interests:</td>
                                    <td className="nameComm">
                                        {dataObj.info.main_interests}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.notable_ideas && (
                            Array.isArray(dataObj.info.notable_ideas) ? (
                                <tr>
                                    <td className="navod">Notable ideas:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_ideas.map((ideas, id) => (
                                                <li key={id}>{ideas}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Notable ideas:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_ideas}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.team && (
                            Array.isArray(dataObj.info.team) ? (
                                <tr>
                                    <td className="navod">Team:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.team.map((team, id) => (
                                                <li key={id}>{team}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Team:</td>
                                    <td className="nameComm">
                                        {dataObj.info.team}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.style && (
                            <tr>
                                <td className="navod">Style:</td>
                                <td className="nameComm">{dataObj.info.style}</td>
                            </tr>
                        )}
                        {dataObj.info.teachers && (
                            <tr>
                                <td className="navod">Teachers:</td>
                                <td className="nameComm">{dataObj.info.teachers}</td>
                            </tr>
                        )}
                        {dataObj.info.trainer && (
                            <tr>
                                <td className="navod">Trainer:</td>
                                <td className="nameComm">{dataObj.info.trainer}</td>
                            </tr>
                        )}

                        {dataObj.info.division && (
                            <tr>
                                <td className="navod">Division:</td>
                                <td className="nameComm">{dataObj.info.division}</td>
                            </tr>
                        )}
                        {dataObj.info.total && (
                            <tr>
                                <td className="navod">Total:</td>
                                <td className="nameComm">{dataObj.info.total}</td>
                            </tr>
                        )}
                        {dataObj.info.wins && (
                            <tr>
                                <td className="navod">Wins:</td>
                                <td className="nameComm">{dataObj.info.wins}</td>
                            </tr>
                        )}
                        {dataObj.info.losses && (
                            <tr>
                                <td className="navod">Losses:</td>
                                <td className="nameComm">{dataObj.info.losses}</td>
                            </tr>
                        )}
                        {dataObj.info.by_decision && (
                            <tr>
                                <td className="navod">By decision:</td>
                                <td className="nameComm">{dataObj.info.by_decision}</td>
                            </tr>
                        )}
                        {dataObj.info.by_knockout && (
                            <tr>
                                <td className="navod">By knockout:</td>
                                <td className="nameComm">{dataObj.info.by_knockout}</td>
                            </tr>
                        )}
                        {dataObj.info.by_submission && (
                            <tr>
                                <td className="navod">By submission:</td>
                                <td className="nameComm">{dataObj.info.by_submission}</td>
                            </tr>
                        )}
                        {dataObj.info.no_contests && (
                            <tr>
                                <td className="navod">No contests:</td>
                                <td className="nameComm">{dataObj.info.no_contests}</td>
                            </tr>
                        )}
                        {dataObj.info.fighting_out_of && (
                            <tr>
                                <td className="navod">Fighting out of:</td>
                                <td className="nameComm">{dataObj.info.fighting_out_of}</td>
                            </tr>
                        )}
                        {dataObj.info.country_sports && (
                            <tr>
                                <td className="navod">Country sports:</td>
                                <td className="nameComm">{dataObj.info.country_sports}</td>
                            </tr>
                        )}
                        {dataObj.info.plays && (
                            <tr>
                                <td className="navod">Plays:</td>
                                <td className="nameComm">{dataObj.info.plays}</td>
                            </tr>
                        )}
                        {dataObj.info.coach && (
                            <tr>
                                <td className="navod">Coach:</td>
                                <td className="nameComm">{dataObj.info.coach}</td>
                            </tr>
                        )}
                        {dataObj.info.career_records && (
                            <tr>
                                <td className="navod">Career records:</td>
                                <td className="nameComm">{dataObj.info.career_records}</td>
                            </tr>
                        )}
                        {dataObj.info.career_titles && (
                            <tr>
                                <td className="navod">Career titles:</td>
                                <td className="nameComm">{dataObj.info.career_titles}</td>
                            </tr>
                        )}
                        {dataObj.info.career_record && (
                            <tr>
                                <td className="navod">Career record:</td>
                                <td className="nameComm">{dataObj.info.career_record}</td>
                            </tr>
                        )}
                        {dataObj.info.current_ranking && (
                            <tr>
                                <td className="navod">Current ranking:</td>
                                <td className="nameComm">{dataObj.info.current_ranking}</td>
                            </tr>
                        )}
                        {dataObj.info.highest_ranking && (
                            <tr>
                                <td className="navod">Highest ranking:</td>
                                <td className="nameComm">{dataObj.info.highest_ranking}</td>
                            </tr>
                        )}
                        {dataObj.info.australian_open && (
                            <tr>
                                <td className="navod">Australian open:</td>
                                <td className="nameComm">{dataObj.info.australian_open}</td>
                            </tr>
                        )}
                        {dataObj.info.french_open && (
                            <tr>
                                <td className="navod">French open:</td>
                                <td className="nameComm">{dataObj.info.french_open}</td>
                            </tr>
                        )}
                        {dataObj.info.us_open && (
                            <tr>
                                <td className="navod">US open:</td>
                                <td className="nameComm">{dataObj.info.us_open}</td>
                            </tr>
                        )}
                        {dataObj.info.wimbledon && (
                            <tr>
                                <td className="navod">Wimbledon:</td>
                                <td className="nameComm">{dataObj.info.wimbledon}</td>
                            </tr>
                        )}
                        {dataObj.info.davis_cup && (
                            <tr>
                                <td className="navod">Davis cup:</td>
                                <td className="nameComm">{dataObj.info.davis_cup}</td>
                            </tr>
                        )}
                        {dataObj.info.hopman_cup && (
                            <tr>
                                <td className="navod">Hopman cup:</td>
                                <td className="nameComm">{dataObj.info.hopman_cup}</td>
                            </tr>
                        )}
                        {dataObj.info.tour_finals && (
                            <tr>
                                <td className="navod">Tour finals:</td>
                                <td className="nameComm">{dataObj.info.tour_finals}</td>
                            </tr>
                        )}
                        {dataObj.info.turned_pro && (
                            <tr>
                                <td className="navod">Turned pro:</td>
                                <td className="nameComm">{dataObj.info.turned_pro}</td>
                            </tr>
                        )}
                        {dataObj.info.olympic_games && (
                            <tr>
                                <td className="navod">Olympic games:</td>
                                <td className="nameComm">{dataObj.info.olympic_games}</td>
                            </tr>
                        )}
                        {dataObj.info.prize_money && (
                            <tr>
                                <td className="navod">Prize money:</td>
                                <td className="nameComm">{dataObj.info.prize_money}</td>
                            </tr>
                        )}
                        {dataObj.info.managerial_record && (
                            <tr>
                                <td className="navod">Managerial record:</td>
                                <td className="nameComm">{dataObj.info.managerial_record}</td>
                            </tr>
                        )}
                        {dataObj.info.batting_average && (
                            <tr>
                                <td className="navod">Batting average:</td>
                                <td className="nameComm">{dataObj.info.batting_average}</td>
                            </tr>
                        )}
                        {dataObj.info.runs_batted_in && (
                            <tr>
                                <td className="navod">Runs batted In:</td>
                                <td className="nameComm">{dataObj.info.runs_batted_in}</td>
                            </tr>
                        )}
                        {dataObj.info.home_runs && (
                            <tr>
                                <td className="navod">Home runs:</td>
                                <td className="nameComm">{dataObj.info.home_runs}</td>
                            </tr>
                        )}
                        {dataObj.info["winning_%"] && (
                            <tr>
                                <td className="navod">Winning:</td>
                                <td className="nameComm">{dataObj.info["winning_%"] + " %"}</td>
                            </tr>
                        )}

                        {dataObj.info.works && (
                            Array.isArray(dataObj.info.works) ? (
                                <tr>
                                    <td className="navod">Works:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.works.map((work, id) => (
                                                <li key={id}>{work}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Works:</td>
                                    <td className="nameComm">
                                        {dataObj.info.works}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.known_for && (
                            Array.isArray(dataObj.info.known_for) ? (
                                <tr>
                                    <td className="navod">Known for:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.known_for.map((known, id) => (
                                                <li key={id}>{known}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Known for:</td>
                                    <td className="nameComm">
                                        {dataObj.info.known_for}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.patrons && (
                            Array.isArray(dataObj.info.patrons) ? (
                                <tr>
                                    <td className="navod">Patrons:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.patrons.map((patron, id) => (
                                                <li key={id}>{patron}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Patrons:</td>
                                    <td className="nameComm">
                                        {dataObj.info.patrons}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.notable_work && (
                            Array.isArray(dataObj.info.notable_work) ? (
                                <tr>
                                    <td className="navod">Notable work:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_work.map((work, id) => (
                                                <li key={id}>{work}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Notable work:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_work}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.notable_works_and_roles && (
                            Array.isArray(dataObj.info.notable_works_and_roles) ? (
                                <tr>
                                    <td className="navod">Works and roles:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_works_and_roles.map((roles, id) => (
                                                <li key={id}>{roles}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Works and roles:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_works_and_roles}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.associated_acts && (
                            Array.isArray(dataObj.info.associated_acts) ? (
                                <tr>
                                    <td className="navod">Associated acts:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.associated_acts.map((act, id) => (
                                                <li key={id}>{act}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Associated acts:</td>
                                    <td className="nameComm">
                                        {dataObj.info.associated_acts}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.labels && (
                            Array.isArray(dataObj.info.labels) ? (
                                <tr>
                                    <td className="navod">Labels:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.labels.map((label, id) => (
                                                <li key={id}>{label}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Labels:</td>
                                    <td className="nameComm">
                                        {dataObj.info.labels}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.nationality && (
                            <tr>
                                <td className="navod">Nationality:</td>
                                <td className="nameComm">{dataObj.info.nationality}</td>
                            </tr>
                        )}
                        {dataObj.info.allegiance && (
                            Array.isArray(dataObj.info.allegiance) ? (
                                <tr>
                                    <td className="navod">Allegiance:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.allegiance.map((alleg, id) => (
                                                <li key={id}>{alleg}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Allegiance:</td>
                                    <td className="nameComm">{dataObj.info.allegiance}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.citizenship && (
                            Array.isArray(dataObj.info.citizenship) ? (
                                <tr>
                                    <td className="navod">Citizenship:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.citizenship.map((citi, id) => (
                                                <li key={id}>{citi}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Citizenship:</td>
                                    <td className="nameComm">{dataObj.info.citizenship}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.residence && (
                            <tr>
                                <td className="navod">Residence:</td>
                                <td className="nameComm">{dataObj.info.residence}</td>
                            </tr>
                        )}
                        {dataObj.info.residences && (
                            Array.isArray(dataObj.info.residences) ? (
                                <tr>
                                    <td className="navod">Residences:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.residences.map((resident, id) => (
                                                <li key={id}>{resident}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Residences:</td>
                                    <td className="nameComm">
                                        {dataObj.info.residences}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.born && (
                            <tr>
                                <td className="navod">Born:</td>
                                <td className="nameComm">{dataObj.info.born}</td>
                            </tr>
                        )}
                        {dataObj.info.died && (
                            <tr>
                                <td className="navod">Died:</td>
                                <td className="nameComm">{dataObj.info.died}</td>
                            </tr>
                        )}
                        {dataObj.info.cause_of_death && (
                            <tr>
                                <td className="navod">Cause of death:</td>
                                <td className="nameComm">{dataObj.info.cause_of_death}</td>
                            </tr>
                        )}
                        {dataObj.info.resting_place && (
                            <tr>
                                <td className="navod">Resting place:</td>
                                <td className="nameComm">{dataObj.info.resting_place}</td>
                            </tr>
                        )}
                        {dataObj.info.burial && (
                            <tr>
                                <td className="navod">Burial:</td>
                                <td className="nameComm">{dataObj.info.burial}</td>
                            </tr>
                        )}
                        {dataObj.info.buried && (
                            <tr>
                                <td className="navod">Buried:</td>
                                <td className="nameComm">{dataObj.info.buried}</td>
                            </tr>
                        )}
                        {dataObj.info.significant_advance && (
                            Array.isArray(dataObj.info.significant_advance) ? (
                                <tr>
                                    <td className="navod">Significant advance:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.significant_advance.map((advance, id) => (
                                                <li key={id}>{advance}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Significant advance:</td>
                                    <td className="nameComm">
                                        {dataObj.info.significant_advance}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.significant_design && (
                            Array.isArray(dataObj.info.significant_design) ? (
                                <tr>
                                    <td className="navod">Significant design:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.significant_design.map((design, id) => (
                                                <li key={id}>{design}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Significant design:</td>
                                    <td className="nameComm">
                                        {dataObj.info.significant_design}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.projects && (
                            Array.isArray(dataObj.info.projects) ? (
                                <tr>
                                    <td className="navod">Projects:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.projects.map((project, id) => (
                                                <li key={id}>{project}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Projects:</td>
                                    <td className="nameComm">
                                        {dataObj.info.projects}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.height && (
                            <tr>
                                <td className="navod">Height:</td>
                                <td className="nameComm">{dataObj.info.height}</td>
                            </tr>
                        )}
                        {dataObj.info.listed_height && (
                            <tr>
                                <td className="navod">Listed height:</td>
                                <td className="nameComm">{dataObj.info.listed_height}</td>
                            </tr>
                        )}
                        {dataObj.info.weight && (
                            <tr>
                                <td className="navod">Weight:</td>
                                <td className="nameComm"> {dataObj.info.weight}</td>
                            </tr>
                        )}
                        {dataObj.info.awards && (
                            Array.isArray(dataObj.info.awards) ? (
                                <tr>
                                    <td className="navod">Awards:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.awards.map((award, id) => (
                                                <li key={id}>{award}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Awards:</td>
                                    <td className="nameComm">
                                        {dataObj.info.awards}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.notable_awards && (
                            Array.isArray(dataObj.info.notable_awards) ? (
                                <tr>
                                    <td className="navod">Notable awards:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_awards.map((award, id) => (
                                                <li key={id}>{award}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Notable awards:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_awards}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.civilian_awards && (
                            Array.isArray(dataObj.info.civilian_awards) ? (
                                <tr>
                                    <td className="navod">Civilian awards:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.civilian_awards.map((award, id) => (
                                                <li key={id}>{award}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Civilian awards:</td>
                                    <td className="nameComm">
                                        {dataObj.info.civilian_awards}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.military_awards && (
                            Array.isArray(dataObj.info.military_awards) ? (
                                <tr>
                                    <td className="navod">Military awards:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.military_awards.map((award, id) => (
                                                <li key={id}>{award}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Military awards:</td>
                                    <td className="nameComm">
                                        {dataObj.info.military_awards}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.office && (
                            <tr>
                                <td className="navod">Office:</td>
                                <td className="nameComm">
                                    {dataObj.info.office}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.notable_works && (
                            Array.isArray(dataObj.info.notable_works) ? (
                                <tr>
                                    <td className="navod">Notable works:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_works.map((work, id) => (
                                                <li key={id}>{work}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Notable works:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_works}
                                    </td>
                                </tr>
                            )

                        )}
                        {dataObj.info.convictions && (
                            Array.isArray(dataObj.info.convictions) ? (
                                <tr>
                                    <td className="navod">Convictions:</td>
                                    <td className="nameCom">
                                        <ul>
                                            {dataObj.info.convictions.map((convict, id) => (
                                                <li key={id}>{convict}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Convictions:</td>
                                    <td className="nameCom">{dataObj.info.convictions}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.political_party && (
                            Array.isArray(dataObj.info.political_party) ? (
                                <tr>
                                    <td className="navod">Political party:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.political_party.map((party, id) => (
                                                <li key={id}>{party}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Political party:</td>
                                    <td className="nameComm">
                                        {dataObj.info.political_party}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.constituency && (
                            <tr>
                                <td className="navod">Constituency:</td>
                                <td className="nameComm">
                                    {dataObj.info.constituency}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.other_politicalaffiliations && (
                            Array.isArray(dataObj.info.other_politicalaffiliations) ? (
                                <tr>
                                    <td className="navod">Other political affiliations:</td>
                                    <td className="nameComm">
                                        <ul>

                                            {dataObj.info.other_politicalaffiliations.map((other, id) => (
                                                <li key={id}>{other}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Other political affiliations:</td>
                                    <td className="nameComm">
                                        {dataObj.info.other_politicalaffiliations}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.organization && (
                            <tr>
                                <td className="navod">Organization</td>
                                <td className="nameComm">
                                    {dataObj.info.organization}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.religion && (
                            <tr>
                                <td className="navod">Religion:</td>
                                <td className="nameComm">
                                    {dataObj.info.religion}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.baptised && (
                            <tr>
                                <td className="navod">Baptised:</td>
                                <td className="nameComm">{dataObj.info.baptised}</td>
                            </tr>
                        )}
                        {dataObj.info.venerated_in && (
                            <tr>
                                <td className="navod">Venerated in:</td>
                                <td className="nameComm">
                                    {dataObj.info.venerated_in}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.major_shrine && (
                            <tr>
                                <td className="navod">Major shrine:</td>
                                <td className="nameComm">
                                    {dataObj.info.major_shrine}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.beatified && (
                            <tr>
                                <td className="navod">Beatified:</td>
                                <td className="nameComm">
                                    {dataObj.info.beatified}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.feast && (
                            <tr>
                                <td className="navod">Feast:</td>
                                <td className="nameComm">
                                    {dataObj.info.feast}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.stance && (
                            <tr>
                                <td className="navod">Stance:</td>
                                <td className="nameComm">
                                    {dataObj.info.stance}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.church && (
                            <tr>
                                <td className="navod">Church:</td>
                                <td className="nameComm">
                                    {dataObj.info.church}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.school && (
                            <tr>
                                <td className="navod">School:</td>
                                <td className="nameComm">
                                    {dataObj.info.school}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.high_school && (
                            <tr>
                                <td className="navod">High school:</td>
                                <td className="nameComm">
                                    {dataObj.info.high_school}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.school_ortradition && (
                            <tr>
                                <td className="navod">School ordination:</td>
                                <td className="nameComm">
                                    {dataObj.info.school_ortradition}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.college && (
                            <tr>
                                <td className="navod">College:</td>
                                <td className="nameComm">
                                    {dataObj.info.college}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.education && (
                            Array.isArray(dataObj.info.education) ? (
                                <tr>
                                    <td className="navod">Education:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.education.map((edu, id) => (
                                                <li key={id}>{edu}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Education:</td>
                                    <td className="nameComm">
                                        {dataObj.info.education}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.alma_mater && (
                            <tr>
                                <td className="navod">Alma mater:</td>
                                <td className="nameComm">
                                    {dataObj.info.alma_mater}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.university && (
                            <tr>
                                <td className="navod">University:</td>
                                <td className="nameComm">
                                    {dataObj.info.university}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.institutions && (
                            Array.isArray(dataObj.info.institutions) ? (
                                <tr>
                                    <td className="navod">Institutions:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.institutions.map((institut, id) => (

                                                <li key={id}>{institut}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Institutions:</td>
                                    <td className="nameComm">
                                        {dataObj.info.institutions}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.doctoral_advisor && (
                            Array.isArray(dataObj.info.doctoral_advisor) ? (
                                <tr>
                                    <td className="navod">Doctoral advisor:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.doctoral_advisor.map((advisor, id) => (

                                                <li key={id}>{advisor}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Doctoral advisor:</td>
                                    <td className="nameComm">
                                        {dataObj.info.doctoral_advisor}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.doctoral_students && (
                            <tr>
                                <td className="navod">Doctoral students:</td>
                                <td className="nameComm">
                                    {dataObj.info.doctoral_students}
                                </td>
                            </tr>
                        )}

                        {dataObj.info.wars && (
                            <tr>
                                <td className="navod">Wars:</td>
                                <td className="nameComm">
                                    {dataObj.info.wars}
                                </td>
                            </tr>
                        )}

                        {dataObj.info["battles/wars"] && (
                            Array.isArray(dataObj.info["battles/wars"]) ? (
                                <tr>
                                    <td className="navod">War :</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info["battles/wars"].map((war, id) => (
                                                <li key={id}>{war}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">War :</td>
                                    <td className="nameComm">
                                        {dataObj.info["battles/wars"]}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info["service/branch"] && (
                            Array.isArray(dataObj.info["service/branch"]) ? (
                                <tr>
                                    <td className="navod">Service:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info["service/branch"].map((branch, id) => (
                                                <li key={id}>{branch}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Service:</td>
                                    <td className="nameComm">
                                        {dataObj.info["service/branch"]}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info["branch/service"] && (
                            Array.isArray(dataObj.info["branch/service"]) ? (
                                <tr>
                                    <td className="navod">Service:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info["branch/service"].map((branch, id) => (

                                                <li key={id}>{branch}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Service:</td>
                                    <td className="nameComm">
                                        {dataObj.info["branch/service"]}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.branch && (
                            Array.isArray(dataObj.info.branch) ? (
                                <tr>
                                    <td className="navod">Branch:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.branch.map((bran, id) => (

                                                <li key={id}>{bran}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Branch:</td>
                                    <td className="nameComm">
                                        {dataObj.info.branch}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.unit && (
                            Array.isArray(dataObj.info.unit) ? (
                                <tr>
                                    <td className="navod">Unit:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.unit.map((uni, id) => (

                                                <li key={id}>{uni}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Unit:</td>
                                    <td className="nameComm">
                                        {dataObj.info.unit}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.commands && (
                            <tr>
                                <td className="navod">Commands:</td>
                                <td className="nameComm">{dataObj.info.commands}</td>
                            </tr>
                        )}
                        {dataObj.info.rank && (
                            <tr>
                                <td className="navod">Rank:</td>
                                <td className="nameComm">{dataObj.info.rank}</td>
                            </tr>
                        )}

                        {dataObj.info.conflicts && (
                            <tr>
                                <td className="navod">Conflicts:</td>
                                <td className="nameComm">
                                    {dataObj.info.conflicts}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.battles && (
                            <tr>
                                <td className="navod">Battles:</td>
                                <td className="nameComm">
                                    {dataObj.info.battles}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.years_of_service && (
                            <tr>
                                <td className="navod">Years of service:</td>
                                <td className="nameComm">{dataObj.info.years_of_service}</td>
                            </tr>
                        )}
                        {dataObj.info.spouse && (
                            <tr>
                                <td className="navod">Spouse:</td>
                                <td className="nameComm">
                                    {dataObj.info.spouse}
                                </td>
                            </tr>
                        )}

                        {dataObj.info.spouses && (
                            Array.isArray(dataObj.info.spouses) ? (
                                <tr>
                                    <td className="navod">Spouses:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.spouses.map((spouse, id) => (

                                                <li key={id}>{spouse}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Spouses:</td>
                                    <td className="nameComm">
                                        {dataObj.info.spouses}

                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.partners && (
                            Array.isArray(dataObj.info.partners) ? (
                                <tr>
                                    <td className="navod">Partners:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.partners.map((partner, id) => (
                                                <li key={id}>{partner}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Partners:</td>
                                    <td className="nameComm">
                                        {dataObj.info.partners}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.partner && (
                            <tr>
                                <td className="navod">Partner:</td>
                                <td className="nameComm">
                                    {dataObj.info.partner}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.parents && (
                            Array.isArray(dataObj.info.parents) ? (
                                <tr>
                                    <td className="navod">Parents:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.parents.map((parent, id) => (

                                                <li key={id}>{parent}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Parents:</td>
                                    <td className="nameComm">
                                        {dataObj.info.parents}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.father && (
                            <tr>
                                <td className="navod">Father:</td>
                                <td className="nameComm">
                                    {dataObj.info.father}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.mother && (
                            <tr>
                                <td className="navod">Mother:</td>
                                <td className="nameComm">
                                    {dataObj.info.mother}
                                </td>
                            </tr>
                        )}

                        {dataObj.info.children && (
                            Array.isArray(dataObj.info.children) ? (
                                <tr>
                                    <td className="navod">Children:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.children.map((child, id) => (

                                                <li key={id}>{child}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Children:</td>
                                    <td className="nameComm">
                                        {dataObj.info.children}

                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.relatives && (
                            Array.isArray(dataObj.info.relatives) ? (
                                <tr>
                                    <td className="navod">Relatives:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.relatives.map((relat, id) => (

                                                <li key={id}>{relat}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Relatives:</td>
                                    <td className="nameComm">
                                        {dataObj.info.relatives}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.notable_relatives && (
                            Array.isArray(dataObj.info.notable_relatives) ? (
                                <tr>
                                    <td className="navod">Relatives:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_relatives.map((relativ, id) => (
                                                <li key={id}>{relativ}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Relatives:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_relatives}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.notable_students && (
                            Array.isArray(dataObj.info.notable_students) ? (
                                <tr>
                                    <td className="navod">Notable students:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.notable_students.map((student, id) => (
                                                <li key={id}>{student}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Notable students:</td>
                                    <td className="nameComm">
                                        {dataObj.info.notable_students}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.family && (
                            Array.isArray(dataObj.info.family) ? (
                                <tr>
                                    <td className="navod">Family:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.family.map((family, id) => (
                                                <li key={id}>{family}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Family:</td>
                                    <td className="nameComm">
                                        {dataObj.info.family}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.issue && (
                            <tr>
                                <td className="navod">Issue:</td>
                                <td className="nameComm">{dataObj.info.issue}</td>
                            </tr>
                        )}
                        {dataObj.info.years_active && (
                            <tr>
                                <td className="navod">Years Active:</td>
                                <td className="nameComm">
                                    {dataObj.info.years_active}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.active_years && (
                            <tr>
                                <td className="navod">Years Active:</td>
                                <td className="nameComm">
                                    {dataObj.info.active_years}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.reign && (
                            <tr>
                                <td className="navod">Reign:</td>
                                <td className="nameComm">
                                    {dataObj.info.reign}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.channel && (
                            Array.isArray(dataObj.info.channel) ? (
                                <tr>
                                    <td className="navod">Channel:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.channel.map((channel, id) => (
                                                <li key={id}>{channel}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Channel:</td>
                                    <td className="nameComm">
                                        {dataObj.info.channel}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.subscribers && (
                            <tr>
                                <td className="navod">Subscribers:</td>
                                <td className="nameComm">
                                    {dataObj.info.subscribers}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.total_views && (
                            <tr>
                                <td className="navod">Total views:</td>
                                <td className="nameComm">
                                    {dataObj.info.total_views}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.official_website && (
                            <tr>
                                <td className="navod">Official website:</td>
                                <td className="nameComm">
                                    <a href={`https://www.${dataObj.info.official_website}`} target="_blank">
                                        {dataObj.info.official_website}
                                    </a>
                                </td>
                            </tr>
                        )}
                        {dataObj.info.website && (

                            <DetailsPersonUrl web={dataObj.info.website} />
                        )}

                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>

                        </tr>
                    </tbody>
                ))}
            </table >
            <ResultsCelebs celebs={celebs} results={results} />
            <NyTimes name={personName} news={nytPerson} />
            <BackToTop />
        </>
    );
};
export default DetailsPerson;