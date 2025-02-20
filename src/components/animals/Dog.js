import React from "react";

const Dog = (props) => {

    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr
                        className="results">
                        <th colSpan={4}>Number of Dogs: {props.results}</th>
                    </tr>
                </thead>

                {props.dog.map((dataObj) => (
                    <tbody key={dataObj.name} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="celebrity" colSpan={3}>{dataObj.name}</td>
                        </tr>
                        <tr >
                            <td colSpan={4}
                                className="imgAnimals">
                                <img src={dataObj.image_link} alt=" "/></td>

                        </tr>
                        <tr>
                            <td className="navod">Min height male/female:</td>
                            <td className="nameComm"
                                colSpan={3}>
                                {(dataObj.min_height_male * 2.54).toFixed(1) + "/" + (dataObj.min_height_female * 2.54).toFixed(1) + "cm"}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Max height male/female:</td>
                            <td className="nameComm"
                                colSpan={3}>
                                {(dataObj.max_height_male * 2.54).toFixed(1) + "/" + (dataObj.max_height_female * 2.54).toFixed(1) + "cm"}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Min weight male/female:</td>
                            <td className="nameComm"
                                colSpan={3}>
                                {(dataObj.min_weight_male * 0.453).toFixed(1) + "/" + (dataObj.min_weight_female * 0.453).toFixed(1) + "kg"}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Max weight male/female:</td>
                            <td className="nameComm"
                                colSpan={3}>
                                {(dataObj.max_weight_male * 0.453).toFixed(1) + "/" + (dataObj.max_weight_female * 0.453).toFixed(1) + "kg"}
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Min Life Expectancy:</td>
                            <td className="nameComm"
                                colSpan={3}>{dataObj.min_life_expectancy} year</td>
                        </tr>
                        <tr>
                            <td className="navod">Max Life Expectancy:</td>
                            <td className="nameComm"
                                colSpan={3}>{dataObj.max_life_expectancy} year</td>
                        </tr>
                        <tr>
                            <td className="navod">Barking:</td>
                            <td className="nameComm">{dataObj.barking}</td>
                            <td className="navod">Drooling:</td>
                            <td className="nameComm">{dataObj.drooling}</td>
                        </tr>
                        <tr>
                            <td className="navod">Grooming:</td>
                            <td className="nameComm">{dataObj.grooming}</td>
                            <td className="navod">Shedding:</td>
                            <td className="nameComm">{dataObj.shedding}</td>
                        </tr>
                        <tr>
                            <td className="navod">Coat length:</td>
                            <td className="nameComm">{dataObj.coat_length}</td>
                            <td className="navod">Trainability:</td>
                            <td className="nameComm">{dataObj.trainability}</td>
                        </tr>
                        <tr>
                            <td className="navod">Protectiveness:</td>
                            <td className="nameComm">{dataObj.protectiveness}</td>
                            <td className="navod">Energy:</td>
                            <td className="nameComm">{dataObj.energy}</td>
                        </tr>
                        <tr>
                            <td className="navod">Playfulness:</td>
                            <td className="nameComm">{dataObj.playfulness}</td>
                            <td className="navod">Good with strangers:</td>
                            <td className="nameComm">{dataObj.good_with_strangers}</td>
                        </tr>
                        <tr>
                            <td className="navod">Children friendly:</td>
                            <td className="nameComm">{dataObj.good_with_children}</td>
                            <td className="navod">Other dogs friendly:</td>
                            <td className="nameComm">{dataObj.good_with_other_dogs}</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table >
        </>
    );
};
export default Dog;