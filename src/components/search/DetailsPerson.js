import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();


    const params = useParams()
    const personName = params.personName;

    useEffect(() => {
        getPerson();
        getTimes();
    }, []);

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
            setPersons(data);
            setCelebs(dataCel);
            setIsLoading(false);
            setResults(dataCel.length);
            setResHis(data.length);

        } catch (err) {
            setError(err);
        }
    };

    const getTimes = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${personName}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        const response = await fetch(url);
        const data = await response.json();
        setNytPerson(data.response.docs);
    }

    const handleClick = (linkName) => {
        const LinkTo = `/linkPerson/${linkName}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />
    } else if (resHis == 0) {
        return (
            <>
         
                <table className="tabelaZemlje">
                    <thead >
                        <tr className="results">
                            <th colSpan={2} >
                                Nothing found in historical persons base
                            </th>
                        </tr>
                    </thead>
                </table>
                <ResultsCelebs celebs={celebs} results={results} />
                <NyTimes news={nytPerson} />
                <BackToTop />
            </>
        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead >
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
                        {dataObj.info.full_name && (
                            <tr>
                                <td className="navod">Full name:</td>
                                <td className="nameComm">{dataObj.info.full_name}</td>
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
                                    <td className="navod">Nicknames:</td>
                                    <td className="nameComm">{dataObj.info.nicknames}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.nickname && (
                            Array.isArray(dataObj.info.nickname) ? (
                                <tr>
                                    <td className="navod">Nickname:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.nickname.map((nick, id) => (
                                                <li key={id}>{nick}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Nickname:</td>
                                    <td className="nameComm">{dataObj.info.nickname}</td>
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
                        {dataObj.info.chinese && (
                            <tr>
                                <td className="navod">Chinese:</td>
                                <td className="nameComm">{dataObj.info.chinese}</td>
                            </tr>
                        )}
                        {dataObj.info.hanyu_pinyin && (
                            <tr>
                                <td className="navod">Hanyu pinyin:</td>
                                <td className="nameComm">{dataObj.info.hanyu_pinyin}</td>
                            </tr>
                        )}
                        {dataObj.info["wade-giles"] && (
                            <tr>
                                <td className="navod">Wade giles:</td>
                                <td className="nameComm">{dataObj.info["wade-giles"]}</td>
                            </tr>
                        )}
                        {dataObj.info.romanization && (
                            <tr>
                                <td className="navod">Romanization:</td>
                                <td className="nameComm">{dataObj.info.romanization}</td>
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
                        {dataObj.info.areas && (
                            Array.isArray(dataObj.info.areas) ? (
                                <tr>
                                    <td className="navod">Areas:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.areas.map((area, id) => (
                                                <li key={id}>{area}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Areas:</td>
                                    <td className="nameComm">
                                        {dataObj.info.areas}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.base_of_operations && (
                            Array.isArray(dataObj.info.base_of_operations) ? (
                                <tr>
                                    <td className="navod">Base of operations:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.base_of_operations.map((base, id) => (
                                                <li key={id}>{base}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Base of operations:</td>
                                    <td className="nameComm">
                                        {dataObj.info.base_of_operations}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.coronation && (
                            <tr>
                                <td className="navod">Coronation:</td>
                                <td className="nameComm">{dataObj.info.coronation}</td>
                            </tr>
                        )}
                        {dataObj.info.reign && (
                            <tr>
                                <td className="navod">Reign:</td>
                                <td className="nameComm">{dataObj.info.reign}</td>
                            </tr>
                        )}
                        {dataObj.info.acclamation && (
                            <tr>
                                <td className="navod">Acclamation:</td>
                                <td className="nameComm">{dataObj.info.acclamation}</td>
                            </tr>
                        )}
                        {dataObj.info.tenure && (
                            <tr>
                                <td className="navod">Tenure:</td>
                                <td className="nameComm">{dataObj.info.tenure}</td>
                            </tr>
                        )}
                        {dataObj.info.house && (
                            <tr>
                                <td className="navod">House:</td>
                                <td className="nameComm">{dataObj.info.house}</td>
                            </tr>
                        )}
                        {dataObj.info.noble_family && (
                            <tr>
                                <td className="navod">Noble family:</td>
                                <td className="nameComm">{dataObj.info.noble_family}</td>
                            </tr>
                        )}
                        {dataObj.info.dynasty && (
                            <tr>
                                <td className="navod">Dinasty:</td>
                                <td className="nameComm">{dataObj.info.dynasty}</td>
                            </tr>
                        )}
                        {dataObj.info.heir_apparent && (
                            <tr>
                                <td className="navod">Heir apparent:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.heir_apparent)}
                                >{dataObj.info.heir_apparent}</td>
                            </tr>
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
                        {dataObj.info.medium && (
                            Array.isArray(dataObj.info.medium) ? (
                                <tr>
                                    <td className="navod">Medium:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.medium.map((med, id) => (
                                                <li key={id}>{med}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Medium:</td>
                                    <td className="nameComm">
                                        {dataObj.info.medium}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.television && (
                            Array.isArray(dataObj.info.television) ? (
                                <tr>
                                    <td className="navod">Television:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.television.map((tele, id) => (
                                                <li key={id}>{tele}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Television:</td>
                                    <td className="nameComm">
                                        {dataObj.info.television}
                                    </td>
                                </tr>
                            )
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
                            Array.isArray(dataObj.info.literary_movement) ? (
                                <tr>
                                    <td className="navod">Literary movement:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.literary_movement.map((move, id) => (
                                                <li key={id}>{move} </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Literary movement:</td>
                                    <td className="nameComm">{dataObj.info.literary_movement}</td>
                                </tr>
                            )
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
                                    <td className="navod">Cooking style:</td>
                                    <td className="nameComm">
                                        {dataObj.info.cooking_style}
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
                        {dataObj.info.sport_country && (
                            <tr>
                                <td className="navod">Sport country:</td>
                                <td className="nameComm">{dataObj.info.sport_country}</td>
                            </tr>
                        )}
                        {dataObj.info.country && (
                            Array.isArray(dataObj.info.country) ? (
                                <tr>
                                    <td className="navod">Country:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.country.map((count, id) => (
                                                <li key={id}>{count}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Country:</td>
                                    <td className="nameComm">
                                        {dataObj.info.country}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.other_posts && (
                            Array.isArray(dataObj.info.other_posts) ? (
                                <tr>
                                    <td className="navod">Other posts:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.other_posts.map((post, id) => (
                                                <li key={id}>{post}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Other posts:</td>
                                    <td className="nameComm">{dataObj.info.other_posts}</td>
                                </tr>
                            )

                        )}
                        {dataObj.info.predecessor && (
                            <tr>
                                <td className="navod">Predecessor:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.predecessor)}
                                >{dataObj.info.predecessor}</td>
                            </tr>
                        )}
                        {dataObj.info.preceded_by && (
                            <tr>
                                <td className="navod">Preceded by:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.preceded_by)}
                                >{dataObj.info.preceded_by}</td>
                            </tr>
                        )}
                        {dataObj.info.successor && (
                            <tr>
                                <td className="navod">Successor:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.successor)}
                                >
                                    {dataObj.info.successor}</td>
                            </tr>
                        )}
                        {dataObj.info.succeeded_by && (
                            <tr>
                                <td className="navod">Succeeded by:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.succeeded_by)}
                                >{dataObj.info.succeeded_by}</td>
                            </tr>
                        )}
                        {dataObj.info.monarch && (
                            <tr>
                                <td className="navod">Monarch:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.monarch)}
                                >{dataObj.info.monarch}</td>
                            </tr>
                        )}
                        {dataObj.info["co-rulers"] && (
                            Array.isArray(dataObj.info["co-rulers"]) ? (
                                <tr>
                                    <td className="navod">Co-rulers:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info["co-rulers"].map((ruler, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(ruler)}
                                                >{ruler}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Co-rulers:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info["co-rulers"])}
                                    >
                                        {dataObj.info["co-rulers"]}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.president && (
                            <tr>
                                <td className="navod">President:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.president)}
                                >{dataObj.info.president}</td>
                            </tr>
                        )}
                        {dataObj.info.vice_president && (
                            <tr>
                                <td className="navod">Vice president:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.vice_president)}
                                >{dataObj.info.vice_president}</td>
                            </tr>
                        )}
                        {dataObj.info.premier && (
                            <tr>
                                <td className="navod">Premier:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.premier)}
                                >{dataObj.info.premier}</td>
                            </tr>
                        )}
                        {dataObj.info.governor && (
                            <tr>
                                <td className="navod">Governor:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.governor)}
                                >{dataObj.info.governor}</td>
                            </tr>
                        )}
                        {dataObj.info.governor_general && (
                            <tr>
                                <td className="navod">Governor general:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.governor_general)}
                                >{dataObj.info.governor_general}</td>
                            </tr>
                        )}
                        {dataObj.info.lieutenant_governor && (
                            <tr>
                                <td className="navod">Lieutenant governor:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.lieutenant_governor)}
                                >{dataObj.info.lieutenant_governor}</td>
                            </tr>
                        )}
                        {dataObj.info.prime_minister && (
                            Array.isArray(dataObj.info.prime_minister) ? (
                                <tr>
                                    <td className="navod">Prime minister:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.prime_minister.map((minist, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(minist)}
                                                >{minist}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Prime minister:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.prime_minister)}
                                    >
                                        {dataObj.info.prime_minister}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.minister && (
                            Array.isArray(dataObj.info.minister) ? (
                                <tr>
                                    <td className="navod">Minister:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.minister.map((minist, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(minist)}
                                                >{minist}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Minister:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.minister)}
                                    >
                                        {dataObj.info.minister}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.leader && (
                            Array.isArray(dataObj.info.leader) ? (
                                <tr>
                                    <td className="navod">Leader:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.leader.map((lead, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(lead)}
                                                >{lead}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Leader:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.leader)}
                                    >
                                        {dataObj.info.leader}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.appointed_by && (
                            <tr>
                                <td className="navod">Appointed by:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.appointed_by)}>
                                    {dataObj.info.appointed_by}</td>
                            </tr>
                        )}
                        {dataObj.info.elected && (
                            <tr>
                                <td className="navod">Elected:</td>
                                <td className="nameComm"
                                >
                                    {dataObj.info.elected}</td>
                            </tr>
                        )}
                        {dataObj.info.deputy && (
                            <tr>
                                <td className="navod">Deputy:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.deputy)}>
                                    {dataObj.info.deputy}</td>
                            </tr>
                        )}
                        {dataObj.info.lieutenant && (
                            Array.isArray(dataObj.info.lieutenant) ? (
                                <tr>
                                    <td className="navod">Lieutenant:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.lieutenant.map((lieuten, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(lieuten)}
                                                >{lieuten}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Lieutenant:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.lieutenant)}
                                    >
                                        {dataObj.info.lieutenant}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.general_secretary && (
                            Array.isArray(dataObj.info.general_secretary) ? (
                                <tr>
                                    <td className="navod">General secretary:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.general_secretary.map((secret, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(secret)}
                                                >{secret}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">General secretary:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.general_secretary)}
                                    >
                                        {dataObj.info.general_secretary}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.first_secretary && (
                            Array.isArray(dataObj.info.first_secretary) ? (
                                <tr>
                                    <td className="navod">First secretary:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.first_secretary.map((first, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(first)}
                                                >{first}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">First secretary:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.first_secretary)}
                                    >
                                        {dataObj.info.first_secretary}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.chair && (
                            Array.isArray(dataObj.info.chair) ? (
                                <tr>
                                    <td className="navod">Chair:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.chair.map((chair, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(chair)}
                                                >{chair}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Chair:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.chair)}
                                    >
                                        {dataObj.info.chair}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info["sec._of_state"] && (
                            Array.isArray(dataObj.info["sec._of_state"]) ? (
                                <tr>
                                    <td className="navod">Secretary of state:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info["sec._of_state"].map((state, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(state)}
                                                >{state}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Secretary of state:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info["sec._of_state"])}
                                    >
                                        {dataObj.info["sec._of_state"]}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.shadowing && (
                            Array.isArray(dataObj.info.shadowing) ? (
                                <tr>
                                    <td className="navod">Shadowing:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.shadowing.map((shadow, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(shadow)}
                                                >{shadow}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Shadowing:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.shadowing)}
                                    >
                                        {dataObj.info.shadowing}
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
                                    <td>
                                        <ul>
                                            {dataObj.info.influences.map((influ, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(influ)}
                                                >{influ}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Influences:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.influences)}
                                    >
                                        {dataObj.info.influences}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.influenced && (
                            Array.isArray(dataObj.info.influenced) ? (
                                <tr>
                                    <td className="navod">Influenced:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.influenced.map((influ, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(influ)}
                                                >{influ}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Influenced:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.influenced)}
                                    >
                                        {dataObj.info.influenced}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.board_member_of && (
                            Array.isArray(dataObj.info.board_member_of) ? (
                                <tr>
                                    <td className="navod">Board member of:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.board_member_of.map((member, id) => (

                                                <li key={id}>{member}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Board member of:</td>
                                    <td className="nameComm">
                                        {dataObj.info.board_member_of}

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
                        {dataObj.info.selection && (
                            Array.isArray(dataObj.info.selection) ? (
                                <tr>
                                    <td className="navod">Selection:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.selection.map((select, id) => (
                                                <li key={id}>{select}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Selection:</td>
                                    <td className="nameComm">
                                        {dataObj.info.selection}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.missions && (
                            Array.isArray(dataObj.info.missions) ? (
                                <tr>
                                    <td className="navod">Missions:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.missions.map((mission, id) => (
                                                <li key={id}>{mission}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Missions:</td>
                                    <td className="nameComm">
                                        {dataObj.info.missions}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.time_in_space && (
                            <tr>
                                <td className="navod">Time in space:</td>
                                <td className="nameComm">{dataObj.info.time_in_space}</td>
                            </tr>
                        )}
                        {dataObj.info.total_evas && (
                            <tr>
                                <td className="navod">Total evas:</td>
                                <td className="nameComm">{dataObj.info.total_evas}</td>
                            </tr>
                        )}
                        {dataObj.info.total_eva_time && (
                            <tr>
                                <td className="navod">Total eva time:</td>
                                <td className="nameComm">{dataObj.info.total_eva_time}</td>
                            </tr>
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
                        {dataObj.info.sport && (
                            Array.isArray(dataObj.info.sport) ? (
                                <tr>
                                    <td className="navod">Sport:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.sport.map((sport, id) => (
                                                <li key={id}>{sport}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Sport:</td>
                                    <td className="nameComm">
                                        {dataObj.info.sport}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.events && (
                            Array.isArray(dataObj.info.events) ? (
                                <tr>
                                    <td className="navod">Events:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.events.map((event, id) => (
                                                <li key={id}>{event}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Events:</td>
                                    <td className="nameComm">
                                        {dataObj.info.events}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.personal_bests && (
                            Array.isArray(dataObj.info.personal_bests) ? (
                                <tr>
                                    <td className="navod">Personal bests:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.personal_bests.map((best, id) => (
                                                <li key={id}>{best}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Personal bests:</td>
                                    <td className="nameComm">
                                        {dataObj.info.personal_bests}
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
                        {dataObj.info.sporting_nationality && (
                            <tr>
                                <td className="navod">Sporting nationality:</td>
                                <td className="nameComm">{dataObj.info.sporting_nationality}</td>
                            </tr>
                        )}
                        {dataObj.info.status && (
                            <tr>
                                <td className="navod">Status:</td>
                                <td className="nameComm">{dataObj.info.status}</td>
                            </tr>
                        )}
                        {dataObj.info.ana_inspiration && (
                            <tr>
                                <td className="navod">Ana inspiration:</td>
                                <td className="nameComm">{dataObj.info.ana_inspiration}</td>
                            </tr>
                        )}
                        {dataObj.info.du_maurier_classic && (
                            <tr>
                                <td className="navod">Du maurier classic:</td>
                                <td className="nameComm">{dataObj.info.du_maurier_classic}</td>
                            </tr>
                        )}
                        {dataObj.info["u.s._women's_open"] && (
                            <tr>
                                <td className="navod">U.S. women's open:</td>
                                <td className="nameComm">{dataObj.info["u.s._women's_open"]}</td>
                            </tr>
                        )}
                        {dataObj.info["women's_british_open"] && (
                            <tr>
                                <td className="navod">Women's british open:</td>
                                <td className="nameComm">{dataObj.info["women's_british_open"]}</td>
                            </tr>
                        )}
                        {dataObj.info["women's_pga_c'ship"] && (
                            <tr>
                                <td className="navod">Women's PGA c'ship:</td>
                                <td className="nameComm">{dataObj.info["women's_pga_c'ship"]}</td>
                            </tr>
                        )}

                        {dataObj.info.former_tours && (
                            Array.isArray(dataObj.info.former_tours) ? (
                                <tr>
                                    <td className="navod">Former tours:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.former_tours.map((tour, id) => (
                                                <li key={id}>{tour}</li>
                                            ))}
                                        </ul></td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Former tours:</td>
                                    <td className="nameComm">{dataObj.info.former_tours}</td>
                                </tr>
                            )

                        )}
                        {dataObj.info.pga_championship && (
                            <tr>
                                <td className="navod">PGA cahampionship</td>
                                <td className="nameComm">{dataObj.info.pga_championship}</td>
                            </tr>
                        )}
                        {dataObj.info.pga_player_of_the_year && (
                            <tr>
                                <td className="navod">PGA player of the year:</td>
                                <td className="nameComm">{dataObj.info.pga_player_of_the_year}</td>
                            </tr>
                        )}
                        {dataObj.info.pga_tour && (
                            <tr>
                                <td className="navod">PGA tour:</td>
                                <td className="nameComm">{dataObj.info.pga_tour}</td>
                            </tr>
                        )}
                        {dataObj.info.pga_tour_of_australasis && (
                            <tr>
                                <td className="navod">PGA tour of australasis:</td>
                                <td className="nameComm">{dataObj.info.pga_tour_of_australasis}</td>
                            </tr>
                        )}
                        {dataObj.info.pga_tourleading_money_winner && (
                            <tr>
                                <td className="navod">PGA tourleading money winner:</td>
                                <td className="nameComm">{dataObj.info.pga_tourleading_money_winner}</td>
                            </tr>
                        )}
                        {dataObj.info.pga_tourplayer_of_the_year && (
                            <tr>
                                <td className="navod">PGA tourplayer of the year:</td>
                                <td className="nameComm">{dataObj.info.pga_tourplayer_of_the_year}</td>
                            </tr>
                        )}
                        {dataObj.info.sunshine_tour && (
                            <tr>
                                <td className="navod">Sunshine tour:</td>
                                <td className="nameComm">{dataObj.info.sunshine_tour}</td>
                            </tr>
                        )}
                        {dataObj.info.the_open_championship && (
                            <tr>
                                <td className="navod">The open championship:</td>
                                <td className="nameComm">{dataObj.info.the_open_championship}</td>
                            </tr>
                        )}
                        {dataObj.info["u.s._open"] && (
                            <tr>
                                <td className="navod">U.S. open:</td>
                                <td className="nameComm">{dataObj.info["u.s._open"]}</td>
                            </tr>
                        )}

                        {dataObj.info.payne_stewart_award && (
                            <tr>
                                <td className="navod">Payne stewart award:</td>
                                <td className="nameComm">{dataObj.info.payne_stewart_award}</td>
                            </tr>
                        )}
                        {dataObj.info.byron_nelson_award && (
                            <tr>
                                <td className="navod">Byron Nelson award:</td>
                                <td className="nameComm">{dataObj.info.byron_nelson_award}</td>
                            </tr>
                        )}
                        {dataObj.info.vardon_trophy && (
                            <tr>
                                <td className="navod">Vardon trophy:</td>
                                <td className="nameComm">{dataObj.info.vardon_trophy}</td>
                            </tr>
                        )}
                        {dataObj.info.european_tour && (
                            <tr>
                                <td className="navod">European tour:</td>
                                <td className="nameComm">{dataObj.info.european_tour}</td>
                            </tr>
                        )}
                        {dataObj.info.european_tourgolfer_of_the_year && (
                            <tr>
                                <td className="navod">European tourgolfer of the year:</td>
                                <td className="nameComm">{dataObj.info.european_tourgolfer_of_the_year}</td>
                            </tr>
                        )}
                        {dataObj.info.european_tourorder_of_merit_winner && (
                            <tr>
                                <td className="navod">European tourorder of merit winner:</td>
                                <td className="nameComm">{dataObj.info.european_tourorder_of_merit_winner}</td>
                            </tr>
                        )}
                        {dataObj.info.masters_tournament && (
                            <tr>
                                <td className="navod">Masters tournament:</td>
                                <td className="nameComm">{dataObj.info.masters_tournament}</td>
                            </tr>
                        )}
                        {dataObj.info.turned_professional && (
                            <tr>
                                <td className="navod">Turned professional:</td>
                                <td className="nameComm">{dataObj.info.turned_professional}</td>
                            </tr>
                        )}
                        {dataObj.info.world_golf_hall_of_fame && (
                            <tr>
                                <td className="navod">World gold hall of fame:</td>
                                <td className="nameComm">{dataObj.info.world_golf_hall_of_fame}</td>
                            </tr>
                        )}
                        {dataObj.info.lpga_tour && (
                            <tr>
                                <td className="navod">LPGA tour:</td>
                                <td className="nameComm">{dataObj.info.lpga_tour}</td>
                            </tr>
                        )}
                        {dataObj.info.professional_wins && (
                            <tr>
                                <td className="navod">Professional wins:</td>
                                <td className="nameComm">{dataObj.info.professional_wins}</td>
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
                        {dataObj.info.field_goals && (
                            <tr>
                                <td className="navod">Field goals:</td>
                                <td className="nameComm">{dataObj.info.field_goals}</td>
                            </tr>
                        )}
                        {dataObj.info.longest_field_goal && (
                            <tr>
                                <td className="navod">Longest field goal:</td>
                                <td className="nameComm">{dataObj.info.longest_field_goal}</td>
                            </tr>
                        )}
                        {dataObj.info.points_scored && (
                            <tr>
                                <td className="navod">Points scored:</td>
                                <td className="nameComm">{dataObj.info.points_scored}</td>
                            </tr>
                        )}
                        {dataObj.info.undrafted && (
                            <tr>
                                <td className="navod">Undrafted:</td>
                                <td className="nameComm">{dataObj.info.undrafted}</td>
                            </tr>
                        )}
                        {dataObj.info.tackles && (
                            <tr>
                                <td className="navod">Tackles:</td>
                                <td className="nameComm">{dataObj.info.tackles}</td>
                            </tr>
                        )}
                        {dataObj.info.sacks && (
                            <tr>
                                <td className="navod">Sacks:</td>
                                <td className="nameComm">{dataObj.info.sacks}</td>
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
                        {dataObj.info.national_team && (
                            <tr>
                                <td className="navod">National team:</td>
                                <td className="nameComm">{dataObj.info.national_team}</td>
                            </tr>
                        )}
                        {dataObj.info.played_for && (
                            <tr>
                                <td className="navod">Played for:</td>
                                <td className="nameComm">{dataObj.info.played_for}</td>
                            </tr>
                        )}
                        {dataObj.info.shot && (
                            <tr>
                                <td className="navod">Shot:</td>
                                <td className="nameComm">{dataObj.info.shot}</td>
                            </tr>
                        )}
                        {dataObj.info.receiving_touchdowns && (
                            <tr>
                                <td className="navod">Receiving touchdowns:</td>
                                <td className="nameComm">{dataObj.info.receiving_touchdowns}</td>
                            </tr>
                        )}
                        {dataObj.info.receiving_yards && (
                            <tr>
                                <td className="navod">Receiving yards:</td>
                                <td className="nameComm">{dataObj.info.receiving_yards}</td>
                            </tr>
                        )}
                        {dataObj.info.league && (
                            <tr>
                                <td className="navod">League:</td>
                                <td className="nameComm">{dataObj.info.league}</td>
                            </tr>
                        )}
                        {dataObj.info.passer_rating && (
                            <tr>
                                <td className="navod">Passer rating:</td>
                                <td className="nameComm">{dataObj.info.passer_rating}</td>
                            </tr>
                        )}
                        {dataObj.info.passing_yards && (
                            <tr>
                                <td className="navod">Passing yards:</td>
                                <td className="nameComm">{dataObj.info.passing_yards}</td>
                            </tr>
                        )}
                        {dataObj.info["td-int"] && (
                            <tr>
                                <td className="navod">TD-INT:</td>
                                <td className="nameComm">{dataObj.info["td-int"]}</td>
                            </tr>
                        )}
                        {dataObj.info.nba_draft && (
                            Array.isArray(dataObj.info.nba_draft) ? (
                                <tr>
                                    <td className="navod">NBA draft:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.nba_draft.map((draft, id) => (
                                                <li key={id}>{draft}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">NBA draft:</td>
                                    <td className="nameComm">
                                        {dataObj.info.nba_draft}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.teams && (
                            Array.isArray(dataObj.info.teams) ? (
                                <tr>
                                    <td className="navod">Teams:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.teams.map((team, id) => (
                                                <li key={id}>{team}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Teams:</td>
                                    <td className="nameComm">
                                        {dataObj.info.teams}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.current_team && (
                            Array.isArray(dataObj.info.current_team) ? (
                                <tr>
                                    <td className="navod">Current team:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.current_team.map((team, id) => (
                                                <li key={id}>{team}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Current team:</td>
                                    <td className="nameComm">
                                        {dataObj.info.current_team}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.assists && (
                            <tr>
                                <td className="navod">Assists:</td>
                                <td className="nameComm">{dataObj.info.assists}</td>
                            </tr>
                        )}
                        {dataObj.info.rebounds && (
                            <tr>
                                <td className="navod">Rebounds:</td>
                                <td className="nameComm">{dataObj.info.rebounds}</td>
                            </tr>
                        )}
                        {dataObj.info.points && (
                            <tr>
                                <td className="navod">Points:</td>
                                <td className="nameComm">{dataObj.info.points}</td>
                            </tr>
                        )}
                        {dataObj.info.engines && (
                            Array.isArray(dataObj.info.engines) ? (
                                <tr>
                                    <td className="navod">Engines:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.engines.map((engin, id) => (
                                                <li key={id}>{engin}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Engines:</td>
                                    <td className="nameComm">
                                        {dataObj.info.engines}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.national_side && (
                            Array.isArray(dataObj.info.national_side) ? (
                                <tr>
                                    <td className="navod">National side:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.national_side.map((side, id) => (
                                                <li key={id}>{side}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">National side:</td>
                                    <td className="nameComm">
                                        {dataObj.info.national_side}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.car_number && (
                            <tr>
                                <td className="navod">Car number:</td>
                                <td className="nameComm">{dataObj.info.car_number}</td>
                            </tr>
                        )}
                        {dataObj.info.class_wins && (
                            <tr>
                                <td className="navod">Class wins:</td>
                                <td className="nameComm">{dataObj.info.class_wins}</td>
                            </tr>
                        )}
                        {dataObj.info.debut_season && (
                            <tr>
                                <td className="navod">Debut season:</td>
                                <td className="nameComm">{dataObj.info.debut_season}</td>
                            </tr>
                        )}
                        {dataObj.info.entries && (
                            <tr>
                                <td className="navod">Entries:</td>
                                <td className="nameComm">{dataObj.info.entries}</td>
                            </tr>
                        )}
                        {dataObj.info.first_entry && (
                            <tr>
                                <td className="navod">First entry:</td>
                                <td className="nameComm">{dataObj.info.first_entry}</td>
                            </tr>
                        )}
                        {dataObj.info.first_race && (
                            <tr>
                                <td className="navod">First race:</td>
                                <td className="nameComm">{dataObj.info.first_race}</td>
                            </tr>
                        )}
                        {dataObj.info.first_win && (
                            <tr>
                                <td className="navod">First win:</td>
                                <td className="nameComm">{dataObj.info.first_win}</td>
                            </tr>
                        )}
                        {dataObj.info.last_entry && (
                            <tr>
                                <td className="navod">Last entry:</td>
                                <td className="nameComm">{dataObj.info.last_entry}</td>
                            </tr>
                        )}
                        {dataObj.info.last_race && (
                            <tr>
                                <td className="navod">Last race:</td>
                                <td className="nameComm">{dataObj.info.last_race}</td>
                            </tr>
                        )}
                        {dataObj.info.last_win && (
                            <tr>
                                <td className="navod">Last win:</td>
                                <td className="nameComm">{dataObj.info.last_win}</td>
                            </tr>
                        )}
                        {dataObj.info.best_finish && (
                            <tr>
                                <td className="navod">Best finish:</td>
                                <td className="nameComm">{dataObj.info.best_finish}</td>
                            </tr>
                        )}
                        {dataObj.info.fastest_laps && (
                            <tr>
                                <td className="navod">Fastest laps:</td>
                                <td className="nameComm">{dataObj.info.fastest_laps}</td>
                            </tr>
                        )}
                        {dataObj.info.achievements && (
                            <tr>
                                <td className="navod">Achievements:</td>
                                <td className="nameComm">{dataObj.info.achievements}</td>
                            </tr>
                        )}
                        {dataObj.info.championships && (
                            <tr>
                                <td className="navod">championships:</td>
                                <td className="nameComm">{dataObj.info.championships}</td>
                            </tr>
                        )}
                        {dataObj.info.career_points && (
                            <tr>
                                <td className="navod">Career points:</td>
                                <td className="nameComm">{dataObj.info.career_points}</td>
                            </tr>
                        )}
                        {dataObj.info.pole_positions && (
                            <tr>
                                <td className="navod">Pole positions:</td>
                                <td className="nameComm">{dataObj.info.pole_positions}</td>
                            </tr>
                        )}
                        {dataObj.info.poles && (
                            <tr>
                                <td className="navod">Poles:</td>
                                <td className="nameComm">{dataObj.info.poles}</td>
                            </tr>
                        )}
                        {dataObj.info.starts && (
                            <tr>
                                <td className="navod">Starts:</td>
                                <td className="nameComm">{dataObj.info.starts}</td>
                            </tr>
                        )}
                        {dataObj.info.podiums && (
                            <tr>
                                <td className="navod">Podiums:</td>
                                <td className="nameComm">{dataObj.info.podiums}</td>
                            </tr>
                        )}
                        {dataObj.info.years && (
                            <tr>
                                <td className="navod">Years:</td>
                                <td className="nameComm">{dataObj.info.years}</td>
                            </tr>
                        )}
                        {dataObj.info.role && (
                            <tr>
                                <td className="navod">Role:</td>
                                <td className="nameComm">{dataObj.info.role}</td>
                            </tr>
                        )}
                        {dataObj.info.bowling && (
                            <tr>
                                <td className="navod">Bowling:</td>
                                <td className="nameComm">{dataObj.info.bowling}</td>
                            </tr>
                        )}
                        {dataObj.info.batting && (
                            <tr>
                                <td className="navod">Batting:</td>
                                <td className="nameComm">{dataObj.info.batting}</td>
                            </tr>
                        )}
                        {dataObj.info.last_odi && (
                            <tr>
                                <td className="navod">Last odi:</td>
                                <td className="nameComm">{dataObj.info.last_odi}</td>
                            </tr>
                        )}
                        {dataObj.info.last_test && (
                            <tr>
                                <td className="navod">Last test:</td>
                                <td className="nameComm">{dataObj.info.last_test}</td>
                            </tr>
                        )}
                        {dataObj.info.ryder_type && (
                            <tr>
                                <td className="navod">Rider type:</td>
                                <td className="nameComm">{dataObj.info.ryder_type}</td>
                            </tr>
                        )}
                        {dataObj.info.earned_run_average && (
                            <tr>
                                <td className="navod">Earned run average:</td>
                                <td className="nameComm">{dataObj.info.earned_run_average}</td>
                            </tr>
                        )}
                        {dataObj.info.strikeouts && (
                            <tr>
                                <td className="navod">Strikeouts:</td>
                                <td className="nameComm">{dataObj.info.strikeouts}</td>
                            </tr>
                        )}
                        {dataObj.info.saves && (
                            <tr>
                                <td className="navod">Saves:</td>
                                <td className="nameComm">{dataObj.info.saves}</td>
                            </tr>
                        )}
                        {dataObj.info["win-loss_record"] && (
                            <tr>
                                <td className="navod">Win-loss record:</td>
                                <td className="nameComm">{dataObj.info["win-loss_record"]}</td>
                            </tr>
                        )}

                        {dataObj.info.buildings && (
                            Array.isArray(dataObj.info.buildings) ? (
                                <tr>
                                    <td className="navod">Buildings:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.buildings.map((builing, id) => (
                                                <li key={id}>{builing}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Buildings:</td>
                                    <td className="nameComm">
                                        {dataObj.info.buildings}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.practice && (
                            Array.isArray(dataObj.info.practice) ? (
                                <tr>
                                    <td className="navod">Practice:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.practice.map((practice, id) => (
                                                <li key={id}>{practice}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Practice:</td>
                                    <td className="nameComm">
                                        {dataObj.info.practice}
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
                                            {dataObj.info.main_interests.map((main, id) => (
                                                <li key={id}>{main}</li>
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

                        {dataObj.info.subject && (
                            Array.isArray(dataObj.info.subject) ? (
                                <tr>
                                    <td className="navod">Subject:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.subject.map((sub, id) => (
                                                <li key={id}>{sub}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Subject:</td>
                                    <td className="nameComm">
                                        {dataObj.info.subject}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info["sub-discipline"] && (
                            Array.isArray(dataObj.info["sub-discipline"]) ? (
                                <tr>
                                    <td className="navod">Sub discipline:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info["sub-discipline"].map((sub, id) => (
                                                <li key={id}>{sub}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Sub discipline:</td>
                                    <td className="nameComm">
                                        {dataObj.info["sub-discipline"]}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.former_groups && (
                            Array.isArray(dataObj.info.former_groups) ? (
                                <tr>
                                    <td className="navod">Former groups:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.former_groups.map((former, id) => (
                                                <li key={id}>{former}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Former groups:</td>
                                    <td className="nameComm">
                                        {dataObj.info.former_groups}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.thesis && (
                            Array.isArray(dataObj.info.thesis) ? (
                                <tr>
                                    <td className="navod">Thesis:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.thesis.map((thes, id) => (
                                                <li key={id}>{thes}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Thesis:</td>
                                    <td className="nameComm">
                                        {dataObj.info.thesis}
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
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.teachers)}
                                >{dataObj.info.teachers}</td>
                            </tr>
                        )}
                        {dataObj.info.trainer && (
                            <tr>
                                <td className="navod">Trainer:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.trainer)}
                                >{dataObj.info.trainer}</td>
                            </tr>
                        )}
                        {dataObj.info.trained_by && (
                            Array.isArray(dataObj.info.trained_by) ? (
                                <tr>
                                    <td className="navod">Trained by:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.trained_by.map((trained, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(trained)}
                                                >{trained}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Trained by:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.trained_by)}
                                    >
                                        {dataObj.info.trained_by}
                                    </td>
                                </tr>
                            )
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
                        {dataObj.info.professional && (
                            <tr>
                                <td className="navod">Professional:</td>
                                <td className="nameComm">{dataObj.info.professional}</td>
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
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.coach)}
                                >{dataObj.info.coach}</td>
                            </tr>
                        )}
                        {dataObj.info.coached_by && (
                            <tr>
                                <td className="navod">Coached by:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.coached_by)}
                                >{dataObj.info.coached_by}</td>
                            </tr>
                        )}
                        {dataObj.info.club && (
                            <tr>
                                <td className="navod">Club:</td>
                                <td className="nameComm">
                                    {dataObj.info.club}
                                </td>
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
                        {dataObj.info.ranking && (
                            <tr>
                                <td className="navod">Ranking:</td>
                                <td className="nameComm">{dataObj.info.ranking}</td>
                            </tr>
                        )}
                        {dataObj.info["non-ranking"] && (
                            <tr>
                                <td className="navod">Non-ranking:</td>
                                <td className="nameComm">{dataObj.info["non-ranking"]}</td>
                            </tr>
                        )}
                        {dataObj.info.nhl_draft && (
                            <tr>
                                <td className="navod">NHL draft:</td>
                                <td className="nameComm">{dataObj.info.nhl_draft}</td>
                            </tr>
                        )}
                        {dataObj.info.wha_draft && (
                            <tr>
                                <td className="navod">WHA draft:</td>
                                <td className="nameComm">{dataObj.info.wha_draft}</td>
                            </tr>
                        )}
                        {dataObj.info.century_breaks && (
                            <tr>
                                <td className="navod">Century breaks:</td>
                                <td className="nameComm">{dataObj.info.century_breaks}</td>
                            </tr>
                        )}
                        {dataObj.info.maximum_breaks && (
                            <tr>
                                <td className="navod">Maximum breaks:</td>
                                <td className="nameComm">{dataObj.info.maximum_breaks}</td>
                            </tr>
                        )}
                        {dataObj.info.regional_finals && (
                            Array.isArray(dataObj.info.regional_finals) ? (
                                <tr>
                                    <td className="navod">Regional finals:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.regional_finals.map((final, id) => (
                                                <li key={id}>{final}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Regional finals:</td>
                                    <td className="nameComm">{dataObj.info.regional_finals}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.world_champion && (
                            Array.isArray(dataObj.info.world_champion) ? (
                                <tr>
                                    <td className="navod">World champion:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.world_champion.map((world, id) => (
                                                <li key={id}>{world}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">World champion:</td>
                                    <td className="nameComm">{dataObj.info.world_champion}</td>
                                </tr>
                            )
                        )}

                        {dataObj.info.olympic_finals && (
                            Array.isArray(dataObj.info.olympic_finals) ? (
                                <tr>
                                    <td className="navod">Olympic finals:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.olympic_finals.map((final, id) => (
                                                <li key={id}>{final}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Olympic finals:</td>
                                    <td className="nameComm">{dataObj.info.olympic_finals}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.world_finals && (
                            Array.isArray(dataObj.info.world_finals) ? (
                                <tr>
                                    <td className="navod">World finals:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.world_finals.map((final, id) => (
                                                <li key={id}>{final}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">World finals:</td>
                                    <td className="nameComm">{dataObj.info.world_finals}</td>
                                </tr>
                            )
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
                        {dataObj.info.stolen_bases && (
                            <tr>
                                <td className="navod">Stolen bases:</td>
                                <td className="nameComm">{dataObj.info.stolen_bases}</td>
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
                        {dataObj.info.employer && (
                            Array.isArray(dataObj.info.employer) ? (
                                <tr>
                                    <td className="navod">Employer:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.employer.map((employ, id) => (
                                                <li key={id}>{employ}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Employer:</td>
                                    <td className="nameComm">
                                        {dataObj.info.employer}
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
                        {dataObj.info.burial_place && (
                            <tr>
                                <td className="navod">Burial place:</td>
                                <td className="nameComm">{dataObj.info.burial_place}</td>
                            </tr>
                        )}
                        {dataObj.info.origin && (
                            <tr>
                                <td className="navod">Origin:</td>
                                <td className="nameComm">{dataObj.info.origin}</td>
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
                        {dataObj.info.listed_weight && (
                            <tr>
                                <td className="navod">Listed weight:</td>
                                <td className="nameComm">{dataObj.info.listed_weight}</td>
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
                                    <td className="nameComm">
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
                                    <td className="nameComm">{dataObj.info.convictions}</td>
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
                            Array.isArray(dataObj.info.constituency) ? (
                                <tr>
                                    <td className="navod">Constituency:</td>
                                    <td className="nameComm">
                                        <ul>

                                            {dataObj.info.constituency.map((constit, id) => (
                                                <li key={id}>{constit}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Constituency:</td>
                                    <td className="nameComm">
                                        {dataObj.info.constituency}
                                    </td>
                                </tr>
                            )
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
                        {dataObj.info.patronage && (
                            <tr>
                                <td className="navod">Patronage:</td>
                                <td className="nameComm">
                                    {dataObj.info.patronage}
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
                        {dataObj.info.denomination && (
                            <tr>
                                <td className="navod">Denomination:</td>
                                <td className="nameComm">
                                    {dataObj.info.denomination}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.diocese && (
                            <tr>
                                <td className="navod">Diocese:</td>
                                <td className="nameComm">
                                    {dataObj.info.diocese}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.installed && (
                            <tr>
                                <td className="navod">Installed:</td>
                                <td className="nameComm">
                                    {dataObj.info.installed}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.post && (
                            <tr>
                                <td className="navod">Post:</td>
                                <td className="nameComm">
                                    {dataObj.info.post}
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
                        {dataObj.info.school_or_tradition && (
                            <tr>
                                <td className="navod">School or tradition:</td>
                                <td className="nameComm">
                                    {dataObj.info.school_or_tradition}
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
                            Array.isArray(dataObj.info.alma_mater) ? (
                                <tr>
                                    <td className="navod">Alma mater:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.alma_mater.map((alma, id) => (
                                                <li key={id}>{alma}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Alma mater:</td>
                                    <td className="nameComm">
                                        {dataObj.info.alma_mater}
                                    </td>
                                </tr>
                            )
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

                        {dataObj.info.academic_advisors && (
                            Array.isArray(dataObj.info.academic_advisors) ? (
                                <tr>
                                    <td className="navod">Academic advisors:</td>
                                    <td >
                                        <ul>
                                            {dataObj.info.academic_advisors.map((student, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(student)}
                                                >{student}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Academic advisors:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.academic_advisors)}
                                    >
                                        {dataObj.info.academic_advisors}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.doctoral_advisor && (
                            Array.isArray(dataObj.info.doctoral_advisor) ? (
                                <tr>
                                    <td className="navod">Doctoral advisor:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.doctoral_advisor.map((advisor, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(advisor)}
                                                >{advisor}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Doctoral advisor:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.doctoral_advisor)}
                                    >
                                        {dataObj.info.doctoral_advisor}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.doctoral_advisors && (
                            Array.isArray(dataObj.info.doctoral_advisors) ? (
                                <tr>
                                    <td className="navod">Doctoral advisors:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.doctoral_advisors.map((advisor, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(advisor)}
                                                >{advisor}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Doctoral advisors:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.doctoral_advisors)}
                                    >
                                        {dataObj.info.doctoral_advisors}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.doctoral_students && (
                            Array.isArray(dataObj.info.doctoral_students) ? (
                                <tr>
                                    <td className="navod">Doctoral students:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.doctoral_students.map((students, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(students)}
                                                >{students}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Doctoral students:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.doctoral_students)}>
                                        {dataObj.info.doctoral_students}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.notable_students && (
                            Array.isArray(dataObj.info.notable_students) ? (
                                <tr>
                                    <td className="navod">Notable students:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.notable_students.map((student, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(student)}
                                                >{student}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Notable students:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.notable_students)}
                                    >
                                        {dataObj.info.notable_students}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.other_academic_advisors && (
                            Array.isArray(dataObj.info.other_academic_advisors) ? (
                                <tr>
                                    <td className="navod">Other academic advisors:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.other_academic_advisors.map((advisor, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(advisor)}
                                                >{advisor}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Other academic advisors:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.other_academic_advisors)}
                                    >
                                        {dataObj.info.other_academic_advisors}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.other_notable_students && (
                            Array.isArray(dataObj.info.other_notable_students) ? (
                                <tr>
                                    <td className="navod">Other notable students:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.other_notable_students.map((student, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(student)}
                                                >{student}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Other notable students:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.other_notable_students)}
                                    >
                                        {dataObj.info.other_notable_students}

                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.wars && (
                            Array.isArray(dataObj.info.wars) ? (
                                <tr>
                                    <td className="navod">War:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.wars.map((war, id) => (
                                                <li key={id}>{war}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Wars:</td>
                                    <td className="nameComm">
                                        {dataObj.info.wars}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.service && (
                            Array.isArray(dataObj.info.service) ? (
                                <tr>
                                    <td className="navod">Service:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.service.map((serv, id) => (
                                                <li key={id}>{serv}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Service:</td>
                                    <td className="nameComm">
                                        {dataObj.info.service}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info["battles/wars"] && (
                            Array.isArray(dataObj.info["battles/wars"]) ? (
                                <tr>
                                    <td className="navod">Wars:</td>
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
                                    <td className="navod">Wars:</td>
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
                            Array.isArray(dataObj.info.commands) ? (
                                <tr>
                                    <td className="navod">Commands:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.commands.map((command, id) => (
                                                <li key={id}>{command}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Commands:</td>
                                    <td className="nameComm">
                                        {dataObj.info.commands}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.rank && (
                            Array.isArray(dataObj.info.rank) ? (
                                <tr>
                                    <td className="navod">Rank:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.rank.map((rank, id) => (
                                                <li key={id}>{rank}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Rank:</td>
                                    <td className="nameComm">
                                        {dataObj.info.rank}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.commands_held && (
                            Array.isArray(dataObj.info.commands_held) ? (
                                <tr>
                                    <td className="navod">Commands held:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.commands_held.map((held, id) => (
                                                <li key={id}>{held}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Commands held:</td>
                                    <td className="nameComm">
                                        {dataObj.info.commands_held}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.years_of_active_service && (
                            Array.isArray(dataObj.info.years_of_active_service) ? (
                                <tr>
                                    <td className="navod">Years of active service:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.years_of_active_service.map((service, id) => (
                                                <li key={id}>{service}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Years of active service:</td>
                                    <td className="nameComm">
                                        {dataObj.info.years_of_active_service}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.retirement && (
                            <tr>
                                <td className="navod">Retirement:</td>
                                <td className="nameComm">{dataObj.info.retirement}</td>
                            </tr>
                        )}
                        {dataObj.info.archdiocese && (
                            <tr>
                                <td className="navod">Archdiocese:</td>
                                <td className="nameComm">{dataObj.info.archdiocese}</td>
                            </tr>
                        )}
                        {dataObj.info.see && (
                            <tr>
                                <td className="navod">See:</td>
                                <td className="nameComm">{dataObj.info.see}</td>
                            </tr>
                        )}
                        {dataObj.info.previous_posts && (
                            Array.isArray(dataObj.info.previous_posts) ? (
                                <tr>
                                    <td className="navod">Previous posts:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.previous_posts.map((post, id) => (
                                                <li key={id}>{post}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Previous posts:</td>
                                    <td className="nameComm">
                                        {dataObj.info.previous_posts}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.ordination && (
                            <tr>
                                <td className="navod">Ordination:</td>
                                <td className="nameComm">
                                    {dataObj.info.ordination}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.consecration && (
                            <tr>
                                <td className="navod">Consecration:</td>
                                <td className="nameComm">
                                    {dataObj.info.consecration}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.motto && (
                            <tr>
                                <td className="navod">Motto:</td>
                                <td className="nameComm">
                                    {dataObj.info.motto}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.appointed && (
                            <tr>
                                <td className="navod">Appointed:</td>
                                <td className="nameComm">
                                    {dataObj.info.appointed}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.created_cardinal && (
                            <tr>
                                <td className="navod">Created cardinal:</td>
                                <td className="nameComm">
                                    {dataObj.info.created_cardinal}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.term_ended && (
                            <tr>
                                <td className="navod">Term ended:</td>
                                <td className="nameComm">
                                    {dataObj.info.term_ended}
                                </td>
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
                            Array.isArray(dataObj.info.years_of_service) ? (
                                <tr>
                                    <td className="navod">Years of service:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.years_of_service.map((service, id) => (
                                                <li key={id}>{service}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Years of service:</td>
                                    <td className="nameComm">
                                        {dataObj.info.years_of_service}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.spouse && (
                            Array.isArray(dataObj.info.spouse) ? (
                                <tr>
                                    <td className="navod">Spouse:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.spouse.map((spouse, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(spouse)}
                                                >{spouse}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Spouse:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.spouse)}
                                    >
                                        {dataObj.info.spouse}
                                    </td>
                                </tr>
                            )
                        )}
                        {dataObj.info.spouses && (
                            Array.isArray(dataObj.info.spouses) ? (
                                <tr>
                                    <td className="navod">Spouses:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.spouses.map((spouse, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(spouse)}
                                                >{spouse}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Spouses:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.spouses)}
                                    >
                                        {dataObj.info.spouses}

                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.partners && (
                            Array.isArray(dataObj.info.partners) ? (
                                <tr>
                                    <td className="navod">Partners:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.partners.map((partner, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(partner)}
                                                >{partner}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Partners:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.partners)}
                                    >
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
                                    <td>
                                        <ul>
                                            {dataObj.info.parents.map((parent, id) => (

                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(parent)}
                                                >{parent}</li>
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
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.father)}
                                >
                                    {dataObj.info.father}
                                </td>
                            </tr>
                        )}
                        {dataObj.info.mother && (
                            <tr>
                                <td className="navod">Mother:</td>
                                <td className="nameLink"
                                    onClick={() => handleClick(dataObj.info.mother)}
                                >
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
                        {dataObj.info.relations && (
                            Array.isArray(dataObj.info.relations) ? (
                                <tr>
                                    <td className="navod">Relations:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.relations.map((relation, id) => (
                                                <li key={id}>{relation}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Relations:</td>
                                    <td className="nameComm">
                                        {dataObj.info.relations}
                                    </td>
                                </tr>
                            )
                        )}

                        {dataObj.info.issue && (
                            Array.isArray(dataObj.info.issue) ? (
                                <tr>
                                    <td className="navod">Issue:</td>
                                    <td >
                                        <ul>
                                            {dataObj.info.issue.map((iss, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(iss)}
                                                >
                                                    {iss}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Issue:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.issue)}
                                    >{dataObj.info.issue}</td>
                                </tr>
                            )
                        )}
                        {dataObj.info.issuedetail && (
                            Array.isArray(dataObj.info.issuedetail) ? (
                                <tr>
                                    <td className="navod">Issue detail:</td>
                                    <td>
                                        <ul>
                                            {dataObj.info.issuedetail.map((detail, id) => (
                                                <li key={id} className="nameLink"
                                                    onClick={() => handleClick(detail)}

                                                >{detail}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Issue detail:</td>
                                    <td className="nameLink"
                                        onClick={() => handleClick(dataObj.info.issuedetail)}
                                    >
                                        {dataObj.info.issuedetail}
                                    </td>
                                </tr>
                            )
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
                        {dataObj.info.channels && (
                            Array.isArray(dataObj.info.channels) ? (
                                <tr>
                                    <td className="navod">Channels:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {dataObj.info.channels.map((channel, id) => (
                                                <li key={id}>{channel}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Channels:</td>
                                    <td className="nameComm">
                                        {dataObj.info.channels}
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
                                <td>
                                    <div className="link">
                                        <a href={`https://www.${dataObj.info.official_website}`} target="_blank" className="link">
                                            {dataObj.info.official_website}
                                        </a>
                                    </div>
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