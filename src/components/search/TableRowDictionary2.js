import React from "react";
import Player from "../Player";

const TableRowDictionary2 = (props) => {
    return (
        <>
            <tr>
                <td className="phon">
                    <p>{props.dictRow2.word}</p>
                    {props.dictRow2.phonetic && (
                        <p>{props.dictRow2.phonetic}</p>
                    )}
                </td>
            </tr>
            {props.dictRow2.phonetics.map((phone, id) => (
                <>

                    <Player key={id} url={phone.audio} />

                </>
            ))}
            {props.dictRow2.meanings.map((mean, id) => (
                <>
                    {mean.antonyms && (
                        <tr key={id}>
                            <td className="nameComm">
                                <ul style={{ paddingLeft: "25px" }}>
                                    {mean.antonyms.map((anto, id) => (
                                        <li key={id}>{anto}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    )}
                    {mean.definitions.map((defin, id) => (
                        <tr key={id}>
                            <td className="dictionary">
                                {defin.definition}         </td>
                        </tr>
                    ))}
                    {mean.synonyms && mean.synonyims > 0 && (
                        <tr>
                            <td >
                                <div className="synonyms">
                                    <p className="syn">synonyms</p>

                                    {mean.synonyms.map((syn, id) => (
                                        <p key={id} className="nyms">
                                            {syn}
                                        </p>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    )}
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