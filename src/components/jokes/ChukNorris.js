import React, { useState, useEffect } from "react";

import axios from 'axios';



const ChukNorris = () => {

    const [error, setError] = useState(null);

    const [facts, setFacts] = useState([]);









    useEffect(() => {
        getFacts();
    }, [])

    const getFacts = async () => {


        
        const url = "https://api.chucknorris.io/jokes/random"

        try {
            const response = await axios.get(url);
            const data = response.data;

            console.log("chuk norris sale", data);


            setFacts(data);

        } catch (err) {
            setError(err);

        }

    };




    return (
        <>
            <table className="dadJokes">
                <thead>
                    <tr>
                        <th colSpan={2}>
                            Chuk Norris jokes

                        </th>
                    </tr>
                </thead>

                <tbody>

                    <tr>

                        <td colSpan={2}>{facts.value}</td>
                    </tr>
                    <tr>
                        <td className="created">
                            Created at:
                        </td>
                        <td className="created">
                            {facts.created_at}
                        </td>
                    </tr>

                </tbody>

            </table>
        </>
    )

}
export default ChukNorris;