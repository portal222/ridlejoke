import React from "react";
import SearchNYT from "./SearchNYT";

const NyTimes = (props) => {

    if (props.news.length === 0) {
        return (
            <>
                <div className="nytFont">
                    <div>The New York Times</div>
                    <SearchNYT placeholder={'Search'} linkTo={'/nyTimes'} />
                    <div className="archive">{props.name} not found in archive
                    </div>
                </div>
                <div className="place">
                </div>
            </>
        )
    }

    return (
        <>
            <div className="nytFont">
                <div>The New York Times</div>
                <div className="archive">{props.name} in archive</div>
                <hr></hr>
            </div>
            <div className="tableNYT">
                {props.news.map((details, id) => (
                    <div key={id} >
                        <div className="nytTitle"> {details.headline.main} </div>
                        <div className="nytAbs">{details.abstract} </div>
                        <div className="nytPar">{details.lead_paragraph} </div>
                        {details.multimedia[0]?.url && (
                            <div className="imgHold">
                                <img className="nytImg" src={`https://www.nytimes.com/${details.multimedia[0]?.url}`} alt="no picture" />
                            </div>
                        )}
                        <div className="nytDate">
                            <div>{details.byline.original}</div>
                            <div>{details.pub_date} </div>
                            <a href={details.web_url} target="_blank">NYT</a>
                        </div>
                        <hr></hr>
                    </div>
                ))}
            </div>
        </>
    )
}
export default NyTimes;