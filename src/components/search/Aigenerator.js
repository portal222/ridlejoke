import React from "react";
import BackToTop from "../BackToTop";
import ChatWithHistoryAir from "./ChatWithHistoryAir";
import ChatWithGroq from "./ChatWithGroq";
import ChatOpenRouter from "./ChatOpenRouter";

const Aigenerator = () => {


    return (
        <>
            <ChatWithHistoryAir />
            <ChatOpenRouter />
            <ChatWithGroq />
            <BackToTop />
        </>
    )
}
export default Aigenerator;