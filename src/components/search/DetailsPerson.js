import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchPerson from "./SearchPerson";
import Loader from "../Loader";
import { useParams } from "react-router-dom";








const DetailsPerson = (props) => {
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [celebs, setCelebs] = useState([]);
 

    const params = useParams()
    const personName = params.personName;

    useEffect(() => {
        getPerson();
      
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
            setPersons(data);
            setCelebs(dataCel);

            setIsLoading(false);

        } catch (err) {
            setError(err);

        }

    };




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

                {persons.map((dataObj) => (



                    <tbody key={dataObj.name} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="celebrity">{dataObj.name}</td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.native_name}</td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.nicknames}</td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.birth_name}</td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.other_names}</td>
                        </tr>
                        <tr>
                            <td className="navod">Title:</td>
                            <td className="nameComm">{dataObj.title}</td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.other_posts}</td>
                        </tr>
                      
                        <tr>
                            <td className="navod">Predecessor:</td>
                            <td className="nameComm">{dataObj.info.predecessor || dataObj.info.preceded_by}</td>
                        </tr>
                        <tr>
                            <td className="navod">Successor:</td>
                            <td className="nameComm">{dataObj.info.successor || dataObj.info.succeeded_by}</td>
                        </tr>

                        <tr>
                            <td className="navod">Fields:</td>
                            <td className="nameComm">
                                {dataObj.info.fields}
                                {/* <ul>
                                    <li>{dataObj.info.fields?.[0]}</li>
                                    <li>{dataObj.info.fields?.[1]}</li>
                                    <li>{dataObj.info.fields?.[2]}</li>
                                    <li>{dataObj.info.fields?.[3]}</li>
                                </ul> */}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.movement}</td>
                        </tr>
                        <tr>
                            <td className="navod">Genres:</td>
                            <td className="nameComm">
                                   <ul>
                                    <li>{dataObj.info.genres?.[0] || dataObj.info.genre?.[0]}</li>
                                    <li>{dataObj.info.genres?.[1] || dataObj.info.genre?.[1]}</li>
                                    <li>{dataObj.info.genres?.[2] || dataObj.info.genre?.[2]}</li>
                                    <li>{dataObj.info.genres?.[3] || dataObj.info.genre?.[3]}</li>
                                    <li>{dataObj.info.genres?.[4] || dataObj.info.genre?.[4]}</li>
                                    <li>{dataObj.info.genres?.[5] || dataObj.info.genre?.[5]}</li>
                                    <li>{dataObj.info.genres?.[6] || dataObj.info.genre?.[6]}</li>
                                    <li>{dataObj.info.genres?.[7] || dataObj.info.genre?.[7]}</li>
                                    <li>{dataObj.info.genres?.[8] || dataObj.info.genre?.[8]}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.discipline}</td>
                        </tr>

                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.attributes}</td>
                        </tr>

                        <tr>
                            <td className="navod">Profession:</td>
                            <td className="nameComm">{dataObj.info.profession}</td>
                        </tr>
                        <tr>
                            <td className="navod">Occupation:</td>
                            <td className="nameComm">
                              

                                <ul>
                                    <li>{dataObj.info.occupation?.[0]}</li>
                                    <li>{dataObj.info.occupation?.[1]}</li>
                                    <li>{dataObj.info.occupation?.[2]}</li>
                                    <li>{dataObj.info.occupation?.[3]}</li>
                                    <li>{dataObj.info.occupation?.[4]}</li>
                                    <li>{dataObj.info.occupation?.[5]}</li>
                                 
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Known for:</td>
                            <td className="nameComm">
                                {dataObj.info.known_for}
                            </td>
                        </tr>
                       
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.notable_work}
                            </td>
                        </tr>


                        <tr>
                            <td className="navod">Associated Acts:</td>
                            <td className="nameComm">
                                {dataObj.info.associated_acts}
                            </td>
                        </tr>

                        <tr>
                            <td className="navod">Nationality:</td>
                            <td className="nameComm">{dataObj.info.nationality || dataObj.info.allegiance}</td>
                        </tr>

                        <tr>
                            <td className="navod">Residence:</td>
                            <td className="nameComm">{dataObj.info.citizenship || dataObj.info.residence
                                || dataObj.info.residences}</td>
                        </tr>

                        <tr>
                            <td className="navod">Birthday:</td>
                            <td className="nameComm">{dataObj.info.born}</td>
                        </tr>
                        <tr>
                            <td className="navod">Death:</td>
                            <td className="nameComm">{dataObj.info.died}</td>
                        </tr>

                        <tr>
                            <td className="navod">Buried:</td>
                            <td className="nameComm">{dataObj.info.resting_place || dataObj.info.burial
                                || dataObj.info.buried}</td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.cause_of_death}</td>
                        </tr>
                        <tr>
                            <td className="navod">Height:</td>
                            <td className="nameComm">{dataObj.info.height}</td>
                        </tr>
                        <tr>
                            <td className="navod">Weight:</td>
                            <td className="nameComm"> {dataObj.info.weight}</td>
                        </tr>
                        <tr>
                            <td className="navod">Awards:</td>
                            <td className="nameComm">
                                {dataObj.info.awards || dataObj.info.notable_awards}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.office}
                            </td>
                        </tr>

                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.notable_works}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Convictions:</td>
                            <td className="nameCom">{dataObj.info.convictions}</td>
                        </tr>
                        <tr>
                            <td className="navod">Political Party:</td>
                            <td className="nameComm">
                                {dataObj.info.political_party}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info?.other_politicalaffiliations}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Organization</td>
                            <td className="nameComm">
                                {dataObj.info.organization}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Religion:</td>
                            <td className="nameComm">
                                {dataObj.info.religion || dataObj.info.stance}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.church}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Education:</td>
                            <td className="nameComm">
                                {dataObj.info.education || dataObj.info.alma_mater
                                    || dataObj.info.university}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Rank:</td>
                            <td className="nameComm">{dataObj.info.rank}</td>
                        </tr>

                        <tr>
                            <td className="navod">Years of Service:</td>
                            <td className="nameComm">{dataObj.info.years_of_service}</td>
                        </tr>
                        <tr>
                            <td className="navod">Branch:</td>
                            <td className="nameComm">{dataObj.info.branch}</td>
                        </tr>

                        <tr>
                            <td className="navod">Wars:</td>
                            <td className="nameComm">
                                {dataObj.info.wars}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.conflicts}
                            </td>
                        </tr>

                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.battles}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Spouse:</td>
                            <td className="nameComm">
                                {dataObj.info.spouse || dataObj.info.spouses}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Parents:</td>
                            <td className="nameComm">
                                {dataObj.info.parents}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.father}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">
                                {dataObj.info.mother}
                            </td>
                        </tr>

                        <tr>
                            <td className="navod">Children:</td>
                            <td className="nameComm">
                                {dataObj.info.children}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Relatives:</td>
                            <td className="nameComm">
                                {dataObj.info.relatives || dataObj.info.notable_relatives || dataObj.info.family}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod"></td>
                            <td className="nameComm">{dataObj.info.issue}</td>
                        </tr>

                        <tr>
                            <td className="navod">Years Active:</td>
                            <td className="nameComm">
                                {dataObj.info.years_active
                                    || dataObj.info.active_years || dataObj.info.reign}
                            </td>
                        </tr>

                        <tr>
                            <td className="navod">Website:</td>
                            <td className="nameComm">
                               <a href={dataObj.info.website}>
                               {dataObj.info.website}
                               </a>
                            </td>
                        </tr>
                    
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                   


                ))}
            </table >
            <table className="tabelaZemlje">
                {celebs.map((celeb) => (

                    <tbody>
                                      <tr>
                            <td className="navod">Height:</td>
                            <td className="nameComm">{celeb.height}</td>

                        </tr>
                        <tr>
                            <td className="navod">Occupation:</td>
                            <td className="nameComm">
                                <ul>
                                    <li>{celeb.occupation?.[0]}</li>
                                    <li>{celeb.occupation?.[1]}</li>
                                    <li>{celeb.occupation?.[2]}</li>
                                    <li>{celeb.occupation?.[3]}</li>
                                    <li>{celeb.occupation?.[4]}</li>
                                    <li>{celeb.occupation?.[5]}</li>
                                    <li>{celeb.occupation?.[6]}</li>
                                    <li>{celeb.occupation?.[7]}</li>
                                    <li>{celeb.occupation?.[8]}</li>
                                    <li>{celeb.occupation?.[9]}</li>
                                    <li>{celeb.occupation?.[10]}</li>
                                    <li>{celeb.occupation?.[11]}</li>
                                    <li>{celeb.occupation?.[12]}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Net worth:</td>
                            <td className="networth">{celeb.net_worth}</td>
                        </tr>

                    </tbody>
                ))}
                 </table>
          

        </>
    );
};
export default DetailsPerson;