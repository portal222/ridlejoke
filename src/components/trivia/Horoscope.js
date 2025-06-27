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

const Horoscope = () => {
    const [error, setError] = useState(null);
    const [horos, setHoros] = useState([]);
    const [horos2, setHoros2] = useState([]);
    const [horos3, setHoros3] = useState([]);
    const [horos4, setHoros4] = useState([]);
    const [horos5, setHoros5] = useState([]);
    const [horos6, setHoros6] = useState([]);
    const [horos7, setHoros7] = useState([]);
    const [horos8, setHoros8] = useState([]);
    const [horos9, setHoros9] = useState([]);
    const [horos10, setHoros10] = useState([]);
    const [horos11, setHoros11] = useState([]);
    const [horos12, setHoros12] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getHoros();
    }, []);

    const getHoros = async () => {

        const url = `https://api.api-ninjas.com/v1/horoscope?zodiac=aries`;
        const url2 = `https://api.api-ninjas.com/v1/horoscope?zodiac=taurus`;
        const url3 = `https://api.api-ninjas.com/v1/horoscope?zodiac=gemini`;
        const url4 = `https://api.api-ninjas.com/v1/horoscope?zodiac=cancer`;
        const url5 = `https://api.api-ninjas.com/v1/horoscope?zodiac=leo`;
        const url6 = `https://api.api-ninjas.com/v1/horoscope?zodiac=virgo`;
        const url7 = `https://api.api-ninjas.com/v1/horoscope?zodiac=libra`;
        const url8 = `https://api.api-ninjas.com/v1/horoscope?zodiac=scorpio`;
        const url9 = `https://api.api-ninjas.com/v1/horoscope?zodiac=sagittarius`;
        const url10 = `https://api.api-ninjas.com/v1/horoscope?zodiac=capricorn`;
        const url11 = `https://api.api-ninjas.com/v1/horoscope?zodiac=aquarius`;
        const url12 = `https://api.api-ninjas.com/v1/horoscope?zodiac=pisces`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response2 = await axios.get(url2,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response3 = await axios.get(url3,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response4 = await axios.get(url4,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response5 = await axios.get(url5,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response6 = await axios.get(url6,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response7 = await axios.get(url7,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response8 = await axios.get(url8,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response9 = await axios.get(url9,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response10 = await axios.get(url10,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response11 = await axios.get(url11,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const response12 = await axios.get(url12,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );

            const data = response.data;
            const data2 = response2.data;
            const data3 = response3.data;
            const data4 = response4.data;
            const data5 = response5.data;
            const data6 = response6.data;
            const data7 = response7.data;
            const data8 = response8.data;
            const data9 = response9.data;
            const data10 = response10.data;
            const data11 = response11.data;
            const data12 = response12.data;

            setHoros(data);
            setHoros2(data2);
            setHoros3(data3);
            setHoros4(data4);
            setHoros5(data5);
            setHoros6(data6);
            setHoros7(data7);
            setHoros8(data8);
            setHoros9(data9);
            setHoros10(data10);
            setHoros11(data11);
            setHoros12(data12);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    if (isLoading) {
        return (
            <HashLoad />)
    }

    return (
        <>
            <div className="facts">
                <div className="horoscope">
                    <h2>Horoscope for {horos.date}</h2>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={aries} alt="" className="signImg" />
                        <p>
                            {horos.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={taurus} alt="" className="signImg" />
                        <p>
                            {horos2.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos2.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={gemini} alt="" className="signImg" />
                        <p>
                            {horos3.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos3.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={cancer} alt="" className="signImg" />
                        <p>
                            {horos4.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos4.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={leo} alt="" className="signImg" />
                        <p>
                            {horos5.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos5.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={virgo} alt="" className="signImg" />
                        <p>
                            {horos6.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos6.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={libra} alt="" className="signImg" />
                        <p>
                            {horos7.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos7.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={scorpio} alt="" className="signImg" />
                        <p>
                            {horos8.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos8.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={sagittarius} alt="" className="signImg" />
                        <p>
                            {horos9.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos9.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={capricorn} alt="" className="signImg" />
                        <p>
                            {horos10.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos10.horoscope}
                    </p>
                </div>
                <div className="horoscope">

                    <div className="sign">
                        <img src={aquarius} alt="" className="signImg" />

                        <p>
                            {horos11.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos11.horoscope}
                    </p>
                </div>
                <div className="horoscope">
                    <div className="sign">
                        <img src={pisces} alt="" className="signImg" />
                        <p>
                            {horos12.sign}
                        </p>
                    </div>
                    <p className="text">
                        {horos12.horoscope}
                    </p>
                </div>
                <div style={{ height: "60px" }}></div>
            </div>
        </>
    )
}
export default Horoscope;