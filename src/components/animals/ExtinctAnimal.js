import React, { useState, useEffect } from "react";
import axios from "axios";

const ExtinctAnimal = () => {

    const [extinct, setExtinct] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAnim();
    }, []);

    const getAnim = async () => {
        const urlEx = `https://extinct-api.herokuapp.com/api/v1/animal/`

        try {
            const responseEx = await axios.get(urlEx);
            const dataEx = responseEx.data

            setExtinct(dataEx.data)
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="extinct">
                <h1>Extinct Animal</h1>
            </div>
            {extinct.map((anim) => (
                <>
                    <div key={anim.binomialName}>
                        <div className="extinct">
                            <div className="extName">
                                {anim.commonName}
                            </div>
                            <div className="extBioname">
                                {anim.binomialName}
                            </div>
                        </div>
                        <div className="extinct">
                            <p className="records">Last time seen</p>
                            <div className="records">
                                {anim.lastRecord + " " + anim.location}
                            </div>
                        </div>
                        <div className="imgPlace">
                            <img src={anim.imageSrc} alt="" className="imgExt" />
                        </div>
                        <div className="extinct">
                            {anim.shortDesc}
                        </div>
                    </div>
                </>
            ))
            }
        </>
    )
}
export default ExtinctAnimal;