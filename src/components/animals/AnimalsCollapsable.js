import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

const AnimalsCollapsable = (props) => {
    const [error, setError] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        getAnimals();
    }, []);


    const getAnimals = async () => {
        const url = `https://api.api-ninjas.com/v1/animals?name=${props.animalId}`;
        const urlImg = `https://list.ly/api/v4/search/image?q=${props.animalId}`;
   


        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const responseImg = await axios.get(urlImg,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
          

            const data = response.data;
            const dataImg = responseImg.data;
        

         

            console.log("rezultat collapsable pojedine  zivotinjе", data);
            console.log("rezultat slike za zivotinje", dataImg);
            setAnimals(data[0]);
            setPhoto(dataImg.results);

        } catch (err) {
            setError(err);

        }
    };

    return (
        <>
            <table className="tabelaZemlje">
                <tbody  >
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            {photo.slice(1, 3).map((img, id) => (
                                <p key={id}>

                                    <img src={img.image} alt=" " />
                                </p>
                            ))}
                        </td>
                    </tr>
                    {animals.characteristics?.common_name && (
                        <tr>
                            <td className="statement">Common name:</td>
                            <td className="nameComm">
                                {animals.characteristics?.common_name}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.["other_name(s)"] && (
                        <tr>
                            <td className="statement">Other name:</td>
                            <td className="nameComm">
                                {animals.characteristics?.["other_name(s)"]}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.slogan && (
                        <tr>
                            <td className="statement">Slogan:</td>
                            <td className="nameComm">
                                {animals.characteristics?.slogan}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.distinctive_feature && (
                        <tr>
                            <td className="statement">Distinctive feature:</td>
                            <td className="nameComm">
                                {animals.characteristics?.distinctive_feature}
                            </td>
                        </tr>
                    )}
                    {animals.taxonomy?.family && (
                        <tr>
                            <td className="statement">Family:</td>
                            <td className="nameComm">
                                {animals.taxonomy?.family}
                            </td>
                        </tr>
                    )}
                    {animals.taxonomy?.genus && (
                        <tr>
                            <td className="statement">Genus:</td>
                            <td className="nameComm">
                                {animals.taxonomy?.genus}
                            </td>
                        </tr>
                    )}
                    {animals.taxonomy?.order && (
                        <tr>
                            <td className="statement">Order:</td>
                            <td className="nameComm">
                                {animals.taxonomy?.order}
                            </td>
                        </tr>
                    )}
                    {animals.taxonomy?.phylum && (
                        <tr>
                            <td className="statement">Phylum:</td>
                            <td className="nameComm">
                                {animals.taxonomy?.phylum}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.group && (
                        <tr>
                            <td className="statement">Group:</td>
                            <td className="nameComm">
                                {animals.characteristics?.group}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.type && (
                        <tr>
                            <td className="statement">Type:</td>
                            <td className="nameComm">
                                {animals.characteristics?.type}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.water_type && (
                        <tr>
                            <td className="statement">Water type:</td>
                            <td className="nameComm">
                                {animals.characteristics?.water_type}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.origin && (
                        <tr>
                            <td className="statement">Origin:</td>
                            <td className="nameComm">
                                {animals.characteristics?.origin}
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td className="statement">Location:</td>
                        <td>
                            {animals.locations?.map((loc, id) => (
                                <p key={id}
                                    className="nameComm">
                                    {loc}
                                </p>
                            ))}
                        </td>
                    </tr>
                    {animals.characteristics?.training && (
                        <tr>
                            <td className="statement">Training:</td>
                            <td className="nameComm">
                                {animals.characteristics?.training}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.color && (
                        <tr>
                            <td className="statement">Color:</td>
                            <td className="nameComm2">
                                {animals.characteristics?.color}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.skin_type && (
                        <tr>
                            <td className="statement">Skin type:</td>
                            <td className="nameComm">
                                {animals.characteristics?.skin_type}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.habitat && (
                        <tr>
                            <td className="statement">Habitat:</td>
                            <td className="nameComm">
                                {animals.characteristics?.habitat}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.estimated_population_size && (
                        <tr>
                            <td className="statement">Estimated population size:</td>
                            <td className="nameComm">
                                {animals.characteristics?.estimated_population_size}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.average_clutch_size && (
                        <tr>
                            <td className="statement">Average clutch size:</td>
                            <td className="nameComm">
                                {animals.characteristics?.average_clutch_size}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.diet && (
                        <tr>
                            <td className="statement">Diet:</td>
                            <td className="nameComm">
                                {animals.characteristics?.diet}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.favorite_food && (
                        <tr>
                            <td className="statement">Favorite food:</td>
                            <td className="nameComm">
                                {animals.characteristics?.favorite_food}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.prey && (
                        <tr>
                            <td className="statement">Prey:</td>
                            <td className="nameComm">
                                {animals.characteristics?.prey}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.main_prey && (
                        <tr>
                            <td className="statement">Main prey:</td>
                            <td className="nameComm">
                                {animals.characteristics?.main_prey}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.predators && (
                        <tr>
                            <td className="statement">Predators:</td>
                            <td className="nameComm">
                                {animals.characteristics?.predators}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.group_behavior && (
                        <tr>
                            <td className="statement">Group behavior:</td>
                            <td className="nameComm">
                                {animals.characteristics?.group_behavior}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.biggest_threat && (
                        <tr>
                            <td className="statement">Biggest threat:</td>
                            <td className="nameComm">
                                {animals.characteristics?.biggest_threat}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.most_distinctive_feature && (
                        <tr>
                            <td className="statement">Most distinctive feature:</td>
                            <td className="nameComm">
                                {animals.characteristics?.most_distinctive_feature}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.lifespan && (
                        <tr>
                            <td className="statement">Lifespan:</td>
                            <td className="nameComm">
                                {animals.characteristics?.lifespan}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.lifestyle && (
                        <tr>
                            <td className="statement">Lifestyle:</td>
                            <td className="nameComm">
                                {animals.characteristics?.lifestyle}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.age_of_sexual_maturity && (
                        <tr>
                            <td className="statement">Age of sexual maturity:</td>
                            <td className="nameComm">
                                {animals.characteristics?.age_of_sexual_maturity}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.gestation_period && (
                        <tr>
                            <td className="statement">Gestation period:
                                :</td>
                            <td className="nameComm">
                                {animals.characteristics?.gestation_period}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.average_litter_size && (
                        <tr>
                            <td className="statement">Average litter size:</td>
                            <td className="nameComm">
                                {animals.characteristics?.average_litter_size}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.litter_size && (
                        <tr>
                            <td className="statement">Litter size:</td>
                            <td className="nameComm">
                                {animals.characteristics?.litter_size}
                            </td>
                        </tr>
                    )}

                    {animals.characteristics?.age_of_weaning && (
                        <tr>
                            <td className="statement">Age of weaning:</td>
                            <td className="nameComm">
                                {animals.characteristics?.age_of_weaning}
                            </td>
                        </tr>
                    )}

                    {animals.characteristics?.name_of_young && (
                        <tr>
                            <td className="statement">Name of young:</td>
                            <td className="nameComm">
                                {animals.characteristics?.name_of_young}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.temperament && (
                        <tr>
                            <td className="statement">Temperament:</td>
                            <td className="nameComm">
                                {animals.characteristics?.temperament}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.weight && (
                        <tr>
                            <td className="statement">Weight:</td>
                            <td className="nameComm">
                                {animals.characteristics?.weight}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.length && (
                        <tr>
                            <td className="statement">Length:</td>
                            <td className="nameComm">
                                {animals.characteristics?.length}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.height && (
                        <tr>
                            <td className="statement">Height:</td>
                            <td className="nameComm">
                                {animals.characteristics?.height}
                            </td>
                        </tr>
                    )}
                    {animals.characteristics?.top_speed && (
                        <tr>
                            <td className="statement">Top speed:</td>
                            <td className="nameComm">
                                {animals.characteristics?.top_speed + " - " + animals.characteristics?.top_speed.split('m')[0] * 1.6 + " kmph"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table >
        </>
    );
};
export default AnimalsCollapsable;