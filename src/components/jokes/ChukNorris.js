import React, { useState, useEffect } from "react";

import axios from 'axios';
import { randomNumberBetween } from "@mui/x-data-grid/utils/utils";



const ChukNorris = () => {

    const [error, setError] = useState(null);

    const [facts, setFacts] = useState([]);
    const [robot, setRobot] = useState([]);










    useEffect(() => {
        getFacts();
        getRobot();
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

    const name = Math.random();

    const getRobot = async () => {
        const url = `https://robohash.org/set_set1/${name}.png`


        try {
            const response = await axios.get(url);
            const data = response;
            console.log("robot randum slike", name)
            setRobot(url)
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

                        <td >{facts.value}</td>
                    </tr>
                    <tr>
                      
                        <td className="borderChuk">
                            Created: {facts.created_at}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={robot}></img>
                        </td>
                    </tr>

                </tbody>

            </table>
        </>
    )

}
export default ChukNorris;