import React from "react";
import { ScaleLoader  } from 'react-spinners';

const LoaderScale = () => {

    return (
        <>
            <div className="loaderScale">
                <ScaleLoader  size='170px'
                    color='dodgerblue'
                    speedMultiplier='0.3'
                />
            </div>
      
        </>
    )
}
export default LoaderScale;