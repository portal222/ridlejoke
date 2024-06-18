import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PokJson = () => {

    const [podaci, setPodaci] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`../number.json`).then(res => {
            const data = res.data;
            setPodaci(data);
            console.log("PokJson podaci", data)
        });
    }, [])


    const handleClick = (numId) => {
        const LinkTo = `/${numId}`;
        navigate(LinkTo);
    }



    return (

        <div className="main">
            <div className="gridNum">

                {podaci.map((podatak) => (
                    <div className="number" key={podatak.number}
                        onClick={() => handleClick(podatak.number)}>
                        {podatak.number}</div>
                ))}
            </div>
        </div>
    )

}
export default PokJson;