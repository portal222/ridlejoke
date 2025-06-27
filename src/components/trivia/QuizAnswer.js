import React, { useState } from "react";

const QuizAnswer = (props) => {

    const [style, setStyle] = useState("close");
    const [style1, setStyle1] = useState("close");
    const [style2, setStyle2] = useState("close");
    const [styleCo, setStyleCo] = useState("closeCo");

    const changeStyle = () => {
        if (style !== "close") setStyle("close");
        else setStyle("open");
    }
    const changeStyle1 = () => {
        if (style1 !== "close") setStyle1("close");
        else setStyle1("open");
    }
    const changeStyle2 = () => {
        if (style2 !== "close") setStyle2("close");
        else setStyle2("open");
    }
    const changeStyleCo = () => {
        if (styleCo !== "closeCo") setStyleCo("closeCo");
        else setStyleCo("openCo");
    }

    if (props.number == 1) {
        return (
            <>
                <div className="warp">
                    <p onClick={changeStyleCo}
                        className={styleCo}
                        dangerouslySetInnerHTML={{ __html: props.correct }}>
                    </p>
                    <p onClick={changeStyle}
                        className={style}
                        dangerouslySetInnerHTML={{ __html: props.incorrect?.[0] }}>
                    </p>
                </div>
                <div className="warp">
                    {props.incorrect?.[1] && (
                        <p onClick={changeStyle1}
                            className={style1}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[1] }}>
                        </p>
                    )}
                    {props.incorrect?.[2] && (
                        <p onClick={changeStyle2}
                            className={style2}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[2] }}>
                        </p>
                    )}
                </div>
            </>
        )
    } else if (props.number == 2) {
        return (
            <>
                <div className="warp">
                    <p onClick={changeStyle}
                        className={style}
                        dangerouslySetInnerHTML={{ __html: props.incorrect?.[0] }}>
                    </p>
                    <p onClick={changeStyleCo}
                        className={styleCo}
                        dangerouslySetInnerHTML={{ __html: props.correct }}>
                    </p>
                </div>
                <div className="warp">
                    {props.incorrect?.[1] && (
                        <p onClick={changeStyle1}
                            className={style1}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[1] }}>
                        </p>
                    )}
                    {props.incorrect?.[2] && (
                        <p onClick={changeStyle2}
                            className={style2}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[2] }}>
                        </p>
                    )}
                </div>
            </>
        )
    } else if (props.number == 3) {
        return (
            <>
                <div className="warp">
                    {props.incorrect?.[1] && (
                        <p onClick={changeStyle1}
                            className={style1}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[1] }}>
                        </p>
                    )}
                    <p onClick={changeStyle}
                        className={style}
                        dangerouslySetInnerHTML={{ __html: props.incorrect?.[0] }}>
                    </p>
                </div>
                <div className="warp">
                    <p onClick={changeStyleCo}
                        className={styleCo}
                        dangerouslySetInnerHTML={{ __html: props.correct }}>
                    </p>
                    {props.incorrect?.[2] && (
                        <p onClick={changeStyle2}
                            className={style2}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[2] }}>
                        </p>
                    )}
                </div>
            </>
        )
    } else if (props.number == 0) {
        return (
            <>
                <div className="warp">
                    {props.incorrect?.[2] && (
                        <p onClick={changeStyle2}
                            className={style2}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[2] }}>
                        </p>
                    )}
                    <p onClick={changeStyle}
                        className={style}
                        dangerouslySetInnerHTML={{ __html: props.incorrect?.[0] }}>
                    </p>
                </div>
                <div className="warp">
                    {props.incorrect?.[1] && (
                        <p onClick={changeStyle1}
                            className={style1}
                            dangerouslySetInnerHTML={{ __html: props.incorrect?.[1] }}>
                        </p>
                    )}
                    <p onClick={changeStyleCo}
                        className={styleCo}
                        dangerouslySetInnerHTML={{ __html: props.correct }}>
                    </p>
                </div>
            </>
        )
    }
}
export default QuizAnswer;