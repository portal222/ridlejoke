import React from "react";
import TableRowAnimals from "./TableRowAnimals";

const Animals = (props) => {
 
    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr
                        className="results">
                        <th colSpan={3}>Number of Animals: {props.results}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="statement1">Name:</td>
                        <td className="statement1">Scientific name:</td>
                        <td className="statement1">Class:</td>             
                    </tr>
                    {props.animals.map((dataObj, id) => (
                        <TableRowAnimals key={id} animalId={dataObj} />
                    ))}
                </tbody>
            </table >
        </>
    );
};
export default Animals;