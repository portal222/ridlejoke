import React from "react";

const TableRowDictionary2 = (props) => {
    return (
        <>
            <tr>
                <td className="celebrity">{props.dictRow2.word + " " + props.dictRow2.phonetic}</td>
            </tr>
            {props.dictRow2.phonetics.map((phone) => (
                <tr>
                    <td >
                        <a href={phone.audio} target="_blank"
                            className="phonetics">{phone.audio}
                        </a></td>
                </tr>
            ))}
            {props.dictRow2.meanings.map((mean) => (
                <>
                    {mean.definitions.map((defin) => (
                        <tr>
                            <td>
                                {defin.definition}         </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="nameComm"> synonyms
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