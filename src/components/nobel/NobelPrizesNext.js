import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const NobelPrizesNext = () => {

    const [error, setError] = useState(null);
    const [nobel, setNobel] = useState([]);
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams()
    const link = params.link;

    const navigate = useNavigate();

    useEffect(() => {
        getApi();
    }, [link])

    const getApi = async () => {

        const url = `https://api.nobelprize.org/2.1/nobelPrizes?offset=${link}&limit=10`;

        try {
            const response = await axios.get(url);
            const data = response.data.nobelPrizes;
            const dataLink = response.data

            setIsLoading(false);
            setNobel(data);
            setLinks(dataLink.links)


        } catch (err) {
            setError(err);
        }
    }
    const handleClick = (link) => {
        const LinkTo = `/nobelNext/${link}`;
        navigate(LinkTo);
    };

    const handlePerson = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;
        navigate(LinkTo);
    }

    const offsetNum = +link + 10
    const offsetNumPrev = +link - 10
    const offsetNumFirst = 0
    const offsetNumLast = 674

    if (isLoading) {
        return <Loader />
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
                            {nob.laureates && (
                                <>
                                    {nob.laureates.map((laur, id) => (
                                        <div key={id}>
                                            <p className="nobelName"
                                                onClick={() => {
                                                    handlePerson(laur.knownName?.en);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}>
                                                {laur.knownName?.en}
                                            </p>
                                            {laur.orgName?.en && (
                                                <p className="nobelName">
                                                    {laur.orgName?.en}
                                                </p>
                                            )}
                                            <div className="motivation"
                                                dangerouslySetInnerHTML={{ __html: laur.motivation?.en }}
                                            >
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            {nob.topMotivation?.en && (
                                <div className="motivation"
                                 dangerouslySetInnerHTML={{ __html: nob.topMotivation?.en }}
                                >
                                </div>
                            )}
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
                    }}>
                    FIRST
                </p>
                <p className="nobutt"
                    onClick={() => {
                        handleClick(offsetNumPrev);
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
export default NobelPrizesNext;