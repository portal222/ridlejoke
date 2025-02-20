import React from "react";

const Cat = (props) => {
 
    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr 
                    className="results">
                        <th colSpan={4}>Number of Cat: {props.results}</th>       
                    </tr>
                </thead>

                {props.cat.map((dataObj) => (
                    <tbody key={dataObj.name} >
                        <tr>
                            <td className="navod">Name:</td>
                            <td className="celebrity" colSpan={3}>{dataObj.name}</td>
                        </tr>
                        <tr>
                            <td className="navod">Origin:</td>
                            <td className="nameComm" colSpan={3}>{dataObj.origin}</td>
                        </tr>
                        <tr >
                            <td colSpan={4}
                                className="imgAnimals">
                                <img src={dataObj.image_link} /></td>
                        </tr>
                        <tr>
                            <td className="navod">Length:</td>
                            <td className="nameComm" colSpan={3}>
                                {dataObj.length } 
                            </td>
                        </tr>
                        <tr>
                            <td className="navod">Min weight:</td>
                            <td className="nameComm">{(dataObj.min_weight * 0.453).toFixed(1)} kg</td>
                            <td className="navod">Max weight:</td>
                            <td className="nameComm">  {(dataObj.max_weight * 0.453).toFixed(1)} kg</td>

                        </tr>
                        <tr>
                            <td className="navod">Min Life Expectancy:</td>
                            <td className="nameComm">{dataObj.min_life_expectancy} year</td>
                            <td className="navod">Max Life Expectancy:</td>
                            <td className="nameComm">{dataObj.max_life_expectancy} year</td>
                        </tr>
                        <tr>
                            <td className="navod">General Health:</td>
                            <td className="nameComm">{dataObj.general_health}</td>
                            <td className="navod">Meowing:</td>
                            <td className="nameComm">{dataObj.meowing}</td>
                        </tr>
                        <tr>
                            <td className="navod">Grooming:</td>
                            <td className="nameComm">{dataObj.grooming}</td>
                            <td className="navod">Shedding:</td>
                            <td className="nameComm">{dataObj.shedding}</td>
                        </tr>
                        <tr>
                            <td className="navod">Intelligence:</td>
                            <td className="nameComm">{dataObj.intelligence}</td>
                            <td className="navod">Playfulness:</td>
                            <td className="nameComm">{dataObj.playfulness}</td>
                        </tr>
                        <tr>
                            <td className="navod">Family friendly:</td>
                            <td className="nameComm">{dataObj.family_friendly}</td>
                            <td className="navod">Children friendly:</td>
                            <td className="nameComm">{dataObj.children_friendly}</td>
                        </tr>
                        <tr>
                            <td className="navod">Other pets friendly:</td>
                            <td className="nameComm" colSpan={3}>{dataObj.other_pets_friendly}</td>
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
export default Cat;