import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NobelPrizes = () => {

    const [error, setError] = useState(null);
    const [nobel, setNobel] = useState([]);
    const [links, setLinks] = useState([]);


    const params = useParams()

    const link = decodeURIComponent(params.sanitizedLink);

    console.log("link u NobelPrizes", link)
    const navigate = useNavigate();

    useEffect(() => {
        getApi();
    }, [link])

    const getApi = async () => {



        const url = `http://api.nobelprize.org/2.1/nobelPrizes?offset=0&limit=10`;



        try {
            const response = await axios.get(url);

            const data = response.data.nobelPrizes;
            const dataLink = response.data

            setNobel(data);
            setLinks(dataLink.links)


            console.log("probe nobel", dataLink);

        } catch (err) {
            setError(err);
        }
    }

    const offsetNum = 10
    const offsetNumFirst = 0
    const offsetNumLast = 674


    const handleClick = (link) => {

        const LinkTo = `/nobelNext/${link}`;
        navigate(LinkTo);
    };

    const handlePerson = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div className="nobelGrid">
                {nobel.map((nob, id) => (
                    <div key={id} className="nobel">
                        <div>
                            <div style={{ display: "flex" }}>
                                {nob.awardYear && (
                                    <p className="nobYear">
                                        {nob.awardYear}
                                    </p>
                                )}
                                <p className="nobCat">
                                    {nob.category.en}
                                </p>
                            </div>
                            {nob.laureates.map((laur, id) => (
                                <div key={id}>
                                    <p className="nobelName"
                                        onClick={() => {
                                            handlePerson(laur.knownName?.en);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}>
                                        {laur.knownName?.en}
                                    </p>
                                    <div className="motivation">
                                        {laur.motivation?.en}
                                    </div>
                                </div>
                            ))}
                            <p className="prize">
                                Date awarded {nob.dateAwarded}   prize amount   {nob.prizeAmount} $
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="buttPlace">
                <p className="nobutt"
                    onClick={() => {
                        handleClick(offsetNumFirst);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} >
                    FIRST
                </p>
                <p className="nobutt"
                    onClick={() => {
                        handleClick(offsetNumFirst);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    PREV
                </p>
                <p className="nobutt"
                    onClick={() => {
                        handleClick(offsetNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} >
                    NEXT
                </p>
                <p className="nobutt"
                    onClick={() => {
                        handleClick(offsetNumLast);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} >
                    LAST
                </p>
            </div>
        </>
    )
}
export default NobelPrizes;