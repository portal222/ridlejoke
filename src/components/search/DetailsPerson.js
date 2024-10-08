import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchPerson from "./SearchPerson";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import NyTimes from "./NyTimes";
import BackToTop from "../BackToTop";

const DetailsPerson = (props) => {
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [celebs, setCelebs] = useState([]);
    const [nytPerson, setNytPerson] = useState([]);


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



        } catch (err) {
            setError(err);

        }
    };


    const getTimes = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${personName}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        const response = await fetch(url);
        const data = await response.json();
        console.log(" podaci NYT persone sa fetchom ", data.response.docs);
        setNytPerson(data.response.docs);
    }

    if (isLoading) {
        return <Loader />
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
                        {dataObj.info.other_names && (
                            <tr>
                                <td className="navod">Other name:</td>
                                <td className="nameComm">{dataObj.info.other_names}</td>
                            </tr>
                        )}
                        {dataObj.info.pen_name && (
                            <tr>
                                <td className="navod">Pen name:</td>
                                <td className="nameComm">{dataObj.info.pen_name}</td>
                            </tr>
                        )}
                        {dataObj.title && (
                            <tr>
                                <td className="navod">Title:</td>
                                <td className="nameComm">{dataObj.title}</td>
                            </tr>
                        )}
                        {dataObj.info.language && (
                            <tr>
                                <td className="navod">Language:</td>
                                <td className="nameComm">{dataObj.info.language}</td>
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
                        {dataObj.info.deputy && (
                            <tr>
                                <td className="navod">Deputy:</td>
                                <td className="nameComm">{dataObj.info.deputy}</td>
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
                        {dataObj.info.games_played && (
                            <tr>
                                <td className="navod">Games played:</td>
                                <td className="nameComm">{dataObj.info.games_played}</td>
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
                            <tr>
                                <td className="navod">Citizenship:</td>
                                <td className="nameComm">{dataObj.info.citizenship}</td>
                            </tr>
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
                            <tr>
                                <td className="navod">Service:</td>
                                <td className="nameComm">
                                    {dataObj.info["service/branch"]}
                                </td>
                            </tr>
                        )}
                        {dataObj.info["branch/service"] && (
                            <tr>
                                <td className="navod">Service:</td>
                                <td className="nameComm">
                                    {dataObj.info["branch/service"]}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.branch && (
                            <tr>
                                <td className="navod">Branch:</td>
                                <td className="nameComm">{dataObj.info.branch}</td>
                            </tr>
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
                        {dataObj.info.website && (
                            <tr>
                                <td className="navod">Website:</td>
                                <td className="nameComm">
                                    <a href={dataObj.info.website}>
                                        {dataObj.info.website}
                                    </a>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table >
            <table className="tabelaZemlje">
                <thead>
                    <tr>
                        <td colSpan={2} style={{ backgroundColor: "#bbdefb", textAlign: "center" }}>
                            Data from celebs base
                        </td>
                    </tr>
                </thead>


                {celebs.map((celeb) => (
                    <tbody>
                        {celeb.height && (
                            <tr>
                                <td className="navod">Name:</td>
                                <td className="celebrity">{celeb.name}</td>
                            </tr>
                        )}
                        {celeb.height && (
                            <tr>
                                <td className="navod">Gender:</td>
                                <td className="nameComm">{celeb.gender}</td>
                            </tr>
                        )}
                        {celeb.height && (
                            <tr>
                                <td className="navod">Nationality:</td>
                                <td className="nameComm">{celeb.nationality}</td>
                            </tr>
                        )}
                        {celeb.height && (
                            <tr>
                                <td className="navod">Age:</td>
                                <td className="nameComm">{celeb.age}</td>
                            </tr>
                        )}
                        {celeb.height && (
                            <tr>
                                <td className="navod">Birthday:</td>
                                <td className="nameComm">{celeb.birthday}</td>
                            </tr>
                        )}
                        {celeb.height && (
                            <tr>
                                <td className="navod">Height:</td>
                                <td className="nameComm">{celeb.height}</td>
                            </tr>
                        )}
                        {celeb.occupation && (
                            Array.isArray(celeb.occupation) ? (
                                <tr>
                                    <td className="navod">Occupation:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {celeb.occupation.map((occup, id) => (
                                                <li key={id}>{occup}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Occupation:</td>
                                    <td className="nameComm">
                                        <td>
                                            {celeb.occupation}
                                        </td>
                                    </td>
                                </tr>
                            )
                        )}
                        {celeb.net_worth && (
                            <tr>
                                <td className="navod">Net worth:</td>
                                <td className="networth">{celeb.net_worth}</td>
                            </tr>
                        )}
                    </tbody>
                ))}

            </table>
            <NyTimes news={nytPerson} />
            <BackToTop />
        </>
    );
};
export default DetailsPerson;