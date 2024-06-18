import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';


const MetropolitanCollapsable = (props) => {
    const [error, setError] = useState(null);
    const [metro, setMetro] = useState([]);


    useEffect(() => {
        getCity();
    }, []);


    const getCity = async () => {

        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.metropolitan}`;

        try {

            const response = await axios.get(url);
            const data = response.data;
            console.log("rezultat metropolitan", data)
            setMetro(data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>

            <tr className="tableRow">
                <td >
                    <img
                        className="imgMetro"
                        src={metro.primaryImage}
                        alt=" no picture"
                    />
                </td>
            </tr>
            <tr>

                <td className="dropdown">
                    <span>


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
                </td>
            </tr>

            <tr>

                <td className="metroTitle">{metro.title}</td>
            </tr>
            <tr>
                <td>{metro.objectDate}</td>
            </tr>
            <tr>
                <td>{metro.classification}</td>
            </tr>
            <tr>
                <td>{metro.medium}</td>
            </tr>
            <tr>
                <td>{metro.dimensions}</td>
            </tr>
            <tr>
                <td>{metro.culture}</td>
            </tr>
            <tr>
                <td>{metro.dynasty}</td>
            </tr>
            <tr>
                <td>{metro.creditLine}</td>
            </tr>
            <tr>
                <td>{metro.portfolio}</td>
            </tr>
            <tr>
                <td>{metro.department}</td>
            </tr>
            <tr>
                <td className="forLink">
                    <a href={metro.objectURL} target="_blank" >
                        {metro.objectURL}</a>
                </td>
            </tr>
            <tr>
                <td >
                    <hr></hr>
                </td>
            </tr>
        </>
    );
};
export default MetropolitanCollapsable;