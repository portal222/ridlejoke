import React, { useState, useEffect } from "react";
import axios from "axios";

const ExtinctAnimal = () => {

    const [anim, setAnim] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAnim();
    }, []);

    const getAnim = async () => {
        const urlEx = `https://extinct-api.herokuapp.com/api/v1/animal/`

        try {
            const responseEx = await axios.get(urlEx);
            const dataEx = responseEx.data

            setAnim(dataEx.data?.[0])

        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div className="extinct">
                <h1>Extinct Animal</h1>
            </div>

            <>
                <div >
                    <div className="extinct"
                        key={anim.binomialName} >
                        <div className="extName">
                            {anim.commonName}
                        </div>
                        <div className="extBioname">
                            {anim.binomialName}
                        </div>
                    </div>
                    <div className="extinct"
                    >
                        <p className="records">Last time seen</p>
                        <div className="records">
                            {anim.lastRecord + " " + anim.location}
                        </div>
                    </div>
                    <div className="imgPlace"
                    >
                        <img src={anim.imageSrc} alt="" className="imgExt" />
                    </div>
                    <div className="extinct"
                    >
                        {anim.shortDesc}
                    </div>
                    <div className="extinct">
                        <a href={anim.wikiLink} target="_blank"
                            className="wikilink">Wikipedia</a>
                    </div>


                </div>
            </>


        </>
    )
}
export default ExtinctAnimal;