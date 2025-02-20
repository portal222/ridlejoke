import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MetroIDClick = (props) => {
    const [error, setError] = useState(null);
    const [metro, setMetro] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCity();
    }, []);


    const getCity = async () => {

        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.metropolitan}`;

        try {
            const response = await axios.get(url);
            const data = response.data;
         
            setMetro(data);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (linkName) => {
        const LinkTo = `/linkMetro2/${linkName}`;
        navigate(LinkTo);
    }

    return (
        <>
            {metro.primaryImage && (
                <div className="tableRow">
                    <img
                        className="imgMetro"
                        src={metro.primaryImage}
                        alt=" no picture"
                    />
                </div>
            )}
            {metro.artistDisplayName && (
                <div className="dropdown">
                    <span
                        onClick={() => handleClick(metro.artistDisplayName)}
                    >
                        {metro.artistDisplayName}
                    </span>
                    <span className="dropdown-content">
                        <p>{metro.artistRole}</p>
                        <p>{metro.artistDisplayBio}</p>

                        <a href={metro.artistWikidata_URL} target="_blank">
                            {metro.artistWikidata_URL}
                        </a>
                        <br></br>
                        <a href={metro.artistULAN_URL} target="_blank">
                            {metro.artistULAN_URL}
                        </a>
                    </span>
                </div>
            )}
            <div className="metroTitle">{metro.title}</div>
            {metro.objectDate && (
                <div className="object">{metro.objectDate}</div>
            )}
            {metro.period && (
                <div className="object">{metro.period}</div>
            )}
            {metro.classification && (
                <div className="object">{metro.classification}</div>
            )}
            {metro.medium && (
                <div className="object">{metro.medium}</div>
            )}
            {metro.dimensions && (
                <div className="object">{metro.dimensions}</div>
            )}
            {metro.culture && (
                <div className="object">{metro.culture}</div>
            )}
            {metro.dynasty && (
                <div className="object">{metro.dynasty}</div>
            )}
            {metro.creditLine && (
                <div className="gift">{metro.creditLine}</div>
            )}
            {metro.portfolio && (
                <div className="gift">{metro.portfolio}</div>
            )}
            {metro.department && (
                <div className="object">{metro.department}</div>
            )}
            {metro.objectURL && (
                <div className="forLink">
                    <a href={metro.objectURL} target="_blank" >
                        {metro.objectURL}</a>
                </div>
            )}
            <div >
                <hr></hr>
            </div>
        </>
    );
};
export default MetroIDClick;