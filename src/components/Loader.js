import React from "react";
import { PuffLoader } from 'react-spinners';

const Loader = () => {

    return (
        <>
            <div className="loader">
                <PuffLoader size='170px'
                    color='dodgerblue'
                    speedMultiplier='0.3'
                />
            </div>
            <div className="place"></div>
        </>
    )
}
export default Loader;