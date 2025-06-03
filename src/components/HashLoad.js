import React from "react";
import { BeatLoader } from 'react-spinners';

const HashLoad = () => {

    return (
        <>
            <div className="loader">
                <BeatLoader size='20px'
                    color='dodgerblue'
                    speedMultiplier='1.3'
                />
            </div>
            <div className="place"></div>
        </>
    )
}
export default HashLoad;