import React from "react";
import Player from "../Player";

const TableRowDictionary2 = (props) => {
    return (
        <>
            <tr>
                <td className="celebrity">{props.dictRow2.word + " " + props.dictRow2.phonetic}</td>
            </tr>
            {props.dictRow2.phonetics.map((phone) => (
           
                        <Player url={phone.audio}/>
           
            ))}
            {props.dictRow2.meanings.map((mean, id) => (
                <>
                    {mean.definitions.map((defin, id) => (
                        <tr key={id}>
                            <td>
                                {defin.definition}         </td>
                        </tr>
                    ))}
                    <tr>
                        <td key={id} className="nameComm"> 
                            <ul>
                                <li>{mean.synonyms?.[0]}</li>
                                <li>{mean.synonyms?.[1]}</li>
                                <li>{mean.synonyms?.[2]}</li>
                                <li>{mean.synonyms?.[3]}</li>
                                <li>{mean.synonyms?.[5]}</li>
                                <li>{mean.synonyms?.[6]}</li>
                                <li>{mean.synonyms?.[7]}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <hr></hr>
                        </td>
                    </tr>
                </>
            ))}
        </>
    );
};
export default TableRowDictionary2;