import React, { useEffect, useState } from "react";
import axios from "axios";
import Time from "./Time";


const MoonPhase = () => {

    const [moonPhase, setMoonPhase] = useState([]);
    const [moonCal, setMoonCal] = useState([]);
    const [moonImg, setMoonImg] = useState([]);

    useEffect(() => {
        getMoon();
    }, []);

    const getMoon = async () => {
        const url = `https://api.tasta.space/v1/moon`;
        const urlC = `https://api.tasta.space/v1/moon/calendar`;

        try {
            const response = await axios.get(url);
            const responseC = await axios.get(urlC);

            setMoonPhase(response.data.data);
            setMoonCal(responseC.data.data.days);

        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="facts">
                <div className="table">
                    <h3>
                        Moon {moonPhase.emoji}
                    </h3>
                    <h3>
                        {moonPhase.phase_name}  on <Time />
                    </h3>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={5}>
                                <img src={moonPhase.image} alt="" className="moonImg" />
                            </td>
                            <td className="distance">
                                distance
                            </td>
                            <td className="distance2">{moonPhase.distance_km} km</td>
                        </tr>
                        <tr>
                            <td className="distance">First quarter</td>
                            <td className="distance2"> {moonPhase.next?.first_quarter.split('T')[0]}</td>
                        </tr>
                        <tr>
                            <td className="distance">Full moon</td>
                            <td className="distance2"> {moonPhase.next?.full.split('T')[0]}</td>
                        </tr>
                        <tr>
                            <td className="distance">Last quarter</td>
                            <td className="distance2"> {moonPhase.next?.last_quarter.split('T')[0]}</td>
                        </tr>
                        <tr>
                            <td className="distance">New moon</td>
                            <td className="distance2"> {moonPhase.next?.new.split('T')[0]}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <table>
                    <tbody className="moonPar">
                        <tr>
                            <td>phase angle</td>
                            <td>illumination</td>
                            <td>age days</td>
                            <td>cycle</td>

                        </tr>
                        <tr>
                            <td>{moonPhase.phase_angle}</td>
                            <td>{moonPhase.illumination}</td>
                            <td>{moonPhase.age_days}</td>
                            <td>{moonPhase.cycle}</td>

                        </tr>
                    </tbody>
                </table>
                <br />
                <div className="moonGrid">
                    {moonCal.map(moon => (
                        <div key={moon.date}>
                            <p>
                                {moon.emoji}
                            </p>
                            <h4>
                                {moon.date}
                            </h4>
                            <h4>
                                {moon.illumination}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default MoonPhase;