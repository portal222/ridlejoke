import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import SearchColors from "./SearchColors";


import Loader from "../Loader";
import BackToTop from "../BackToTop";





const SearchResultsColor = () => {
    const [error, setError] = useState(null);
    const [colors, setColors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [prikaz, setPrikaz] = useState([]);

    const navigate = useNavigate();


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;






    useEffect(() => {
        getBoje(searchStringValue);
    }, [searchStringValue]);

    const getBoje = async (searchStringValue) => {
        const url = "./colors.json";

        try {
            const response = await axios.get(url);
            const data = response.data;
            const filterData = data.filter((color) => {
                return (
                    color.name.toLowerCase().includes(searchStringValue.toLowerCase())

                )

            });
            console.log("spisak boja", data);
            console.log("Pretraga boja", filterData);
            setIsLoading(false);

            setColors(filterData);
            setPrikaz(filterData.length);

        } catch (err) {
            setError(err);
            setIsLoading(false);

        }

    };

    const colorClick = () => {
        const LinkTo = `/colors`
        navigate(LinkTo);
    }



    if (isLoading) {
        return <Loader />
    } else if (prikaz == 0) {
        return (
            <><table className="tabelaZemlje">

                <tr>
                    <td colSpan={2}>
                        <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />

                    </td>
                </tr>
                <tr >
                    <td>
                        <h2 className="results">Nothing found</h2>
                    </td>
                </tr>
            </table>
            </>
        )
    }


    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <td colSpan={2}>
                            <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />

                        </td>
                    </tr>


                    <tr>
                        <th className="results">Number of color:</th>
                        <th className="results">{prikaz}</th>
                    </tr>
                    <tr><th colSpan={2}
                    ></th></tr>

                </thead>

                {colors.map((dataObj) => (
                    <tbody key={dataObj.name}  >
                        <tr>
                            <td className="networth"
                            >
                                {dataObj.name}</td>


                            <td className="colorHex"
                                style={{ backgroundColor: `${dataObj.hex}` }}
                                onClick={() => {
                                    navigator.clipboard.writeText(dataObj.hex)
                                }}>
                                {dataObj.hex}</td>
                        </tr>
                    </tbody>

                ))}
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <hr></hr>
                        </td>
                    </tr>
                    <tr>
                        <td className="networth">
                            View about 1300 colors</td>
                        <td>
                            <p className="colorBut"
                           onClick={() => colorClick()} >
                           Colors 
                                </p> 
                            
                        </td>
                    </tr>
                </tbody>
            </table>

<BackToTop />
        </>

    );
};
export default SearchResultsColor;