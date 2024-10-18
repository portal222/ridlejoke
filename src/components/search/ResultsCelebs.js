import React from "react";


const ResultsCelebs = (props) => {


    if (props.results == 0) {
        return (
            <table className="tabelaZemlje">
                <thead>
                    <tr className="results">
                        <th colSpan={2} >
                          Nothing found in celebs base 
                        </th>
                    </tr>
                </thead>
            </table>

        )
    }
    return (
        <>
            <table className="tabelaZemlje">
                <thead>
                    <tr className="results">
                        <th colSpan={2} >
                        Data from celebs base
                        </th>
                    </tr>
                </thead>


                {props.celebs.map((celeb) => (
                    <tbody>
                        {celeb.name && (
                            <tr>
                                <td className="navod">Name:</td>
                                <td className="celebrity">{celeb.name}</td>
                            </tr>
                        )}
                        {celeb.gender && (
                            <tr>
                                <td className="navod">Gender:</td>
                                <td className="nameComm">{celeb.gender}</td>
                            </tr>
                        )}
                        {celeb.nationality && (
                            <tr>
                                <td className="navod">Nationality:</td>
                                <td className="nameComm">{celeb.nationality}</td>
                            </tr>
                        )}
                        {celeb.age && (
                            <tr>
                                <td className="navod">Age:</td>
                                <td className="nameComm">{celeb.age}</td>
                            </tr>
                        )}
                        {celeb.birthday && (
                            <tr>
                                <td className="navod">Birthday:</td>
                                <td className="nameComm">{celeb.birthday}</td>
                            </tr>
                        )}
                        {celeb.death && (
                            <tr>
                                <td className="navod">Death:</td>
                                <td className="nameComm">{celeb.death}</td>
                            </tr>
                        )}
                        {celeb.height && (
                            <tr>
                                <td className="navod">Height:</td>
                                <td className="nameComm">{celeb.height}</td>
                            </tr>
                        )}
                        {celeb.occupation && (
                            Array.isArray(celeb.occupation) ? (
                                <tr>
                                    <td className="navod">Occupation:</td>
                                    <td className="nameComm">
                                        <ul>
                                            {celeb.occupation.map((occup, id) => (
                                                <li key={id}>{occup}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="navod">Occupation:</td>
                                    <td className="nameComm">
                                        <td>
                                            {celeb.occupation}
                                        </td>
                                    </td>
                                </tr>
                            )
                        )}
                        {celeb.net_worth && (
                            <tr>
                                <td className="navod">Net worth:</td>
                                <td className="networth">{celeb.net_worth}</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={2} style={{height: "25px"}}></td>
                        </tr>
                    </tbody>
                ))}

            </table>
        </>
    );
};
export default ResultsCelebs;