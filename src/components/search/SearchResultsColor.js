import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import SearchColors from "./SearchColors";
import datas from "../../../public/colors.json";
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


    const getBoje = (searchStringValue) => {

        try {
            const filterData = datas.filter((color) => {
                return (
                    color.name.toLowerCase().includes(searchStringValue.toLowerCase())
                )
            });
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
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <SearchColors placeholder={'Colors'} linkTo={'/colorsSearch'} />
                        </td>
                    </tr>
                    <tr >
                        <td colSpan={2} >
                            <div className="results">Nothing found</div>
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
                <div className="place"></div>
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
                {colors.map((dataObj, id) => (
                    <tbody key={id}  >
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