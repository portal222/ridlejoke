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
            {props.dictRow2.phonetics.map((phone) => (
                <>
                    <div style={{ paddingLeft: "30px" }}>
                        <Player url={phone.audio} />
                    </div>
                </>
            ))}
            {props.dictRow2.meanings.map((mean, id) => (
                <>
                    {mean.antonyms && (
                        <tr>
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
                    {mean.synonyms && (
                        <tr>
                            <td key={id} className="nameComm" >
                                <ul style={{ paddingLeft: "25px" }}>
                                    {mean.synonyms.map((syno, id) => (
                                        <li key={id}>{syno}</li>
                                    ))}
                                </ul>
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