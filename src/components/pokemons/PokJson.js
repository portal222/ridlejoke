import React from "react";
import { useNavigate } from "react-router-dom";
import datas from "../../../public/number.json";

const PokJson = () => {

    const navigate = useNavigate();

    const handleClick = (numId) => {
        const LinkTo = `/${numId}`;
        navigate(LinkTo);
    }

    return (
        <div className="main">
            <div className="gridNum">

                {datas.map((data) => (
                    <div className="number" key={data.number}
                        onClick={() => handleClick(data.number)}>
                        {data.number}</div>
                ))}
            </div>
        </div>
    )
}
export default PokJson;