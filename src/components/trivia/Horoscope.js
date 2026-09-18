import React, { useEffect, useState } from "react";
import horoscope from "../../../public/horoscope.json";
import HoroscopeDetails from "./HoroscopeDetails";
import Time from "./Time";

const Horoscope = () => {

    const [zoname, setZoname] = useState("");
    const [zourl, setZourl] = useState("");


    return (
        <>
            <div className="facts">
                <div className="horoscope">
                    <h2>Horoscope for <Time /></h2>

                    <div>
                        <select
                            className="select"
                            value={zoname}
                            onChange={(e) => {
                                const selectedName = e.target.value;
                           
                                const selectedHor = horoscope.find(h => h.name === selectedName);
                                if (selectedHor) {
                                    setZoname(selectedName);
                                    setZourl(selectedHor.url);
                                }
                            }}
                        >
                            <option value="" disabled>choose zodiac</option>
                            {horoscope.map((hor, id) => (
                                <option key={id} value={hor.name}>
                                    {hor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <HoroscopeDetails zoname={zoname}/>
                <div style={{ height: "60px" }}></div>
            </div>
        </>
    )
}
export default Horoscope;