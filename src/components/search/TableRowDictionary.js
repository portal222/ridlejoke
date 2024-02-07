import React from "react";



const TableRowDictionary = (props) => {

    return (
        <>
    
                        <tr>
                           
                            <td className="celebrity">{props.dictRow.word}</td>
                        </tr>
                        <tr>
                           
                           <td className="dictionary">{props.dictRow.definition}</td>
                       </tr>
        </>
    );
};
export default TableRowDictionary;