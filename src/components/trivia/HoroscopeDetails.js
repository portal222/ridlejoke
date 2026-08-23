import React, { useEffect, useState } from "react";
import axios from "axios";
import aries from "../../../public/assets/img/aries.png";
import taurus from "../../../public/assets/img/taurus.png";
import gemini from "../../../public/assets/img/gemini.png";
import cancer from "../../../public/assets/img/cancer.png";
import leo from "../../../public/assets/img/leo.png";
import virgo from "../../../public/assets/img/virgo.png";
import libra from "../../../public/assets/img/libra.png";
import scorpio from "../../../public/assets/img/scorpio.png";
import sagittarius from "../../../public/assets/img/sagittarius.png";
import capricorn from "../../../public/assets/img/capricorn.png";
import aquarius from "../../../public/assets/img/aquarius.png";
import pisces from "../../../public/assets/img/pisces.png";
import HashLoad from "../HashLoad";
import horoscope from "../../../public/horoscope.json";

const HoroscopeDetails = (props) => {
    const [error, setError] = useState(null);
    const [horos, setHoros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const zoname = props.zoname
    const zourl = props.zoname
 
    useEffect(() => {
        if (zoname) {
            getHoros(zoname);
        }
    }, [zoname]);

    const getHoros = async (zoname) => {

        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/horoscope?zodiac=${zoname}`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );


            const data = response.data;

            setHoros(data);
            setIsLoading(false);

        } catch (err) {
            setError(err);
            setIsLoading(false);

        }
    }





    const getImagePath = (name) => {
        const item = horoscope.find(z => z.name === name);
        return item ? `/assets/img/${item.url}.png` : null;
    };

    const imageSrc = getImagePath(zoname);

    return (
        <div className="facts">
            <div className="horoscope">
                <div className="sign">


                    <h2>{zoname}</h2>
                    {imageSrc && <img src={imageSrc} alt={zoname} className="signImg" />}
                
              

                </div>
                {!isLoading && horos &&
                    <p className="text">
                        {horos.horoscope}
                    </p>}
            </div>
        </div>
    );
};




// return (
//     <>
//         <div className="facts">

//             <div className="horoscope">
//                 <div className="sign">
//                     {/* <img src={zourl} alt="" className="signImg" /> */}
//                     <p>
//                         {horos.sign}
//                     </p>
//                 </div>
//                 <p className="text">
//                     {horos.horoscope}
//                 </p>
//             </div>

//             <div style={{ height: "60px" }}></div>
//         </div>
//     </>
// )
export default HoroscopeDetails;