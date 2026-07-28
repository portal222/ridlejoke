import React from "react";
import BackToTop from "../BackToTop";
import ChatWithHistoryAir from "./ChatWithHistoryAir";
import ChatWithGroq from "./ChatWithGroq";
import ChatOpenRouter from "./ChatOpenRouter";
import AiPollinationImg from "./AiPollinationImg";
import ChatWithDeepSeek from "./ChatWithDeepSeek";

const Aigenerator = () => {


    return (
        <>
            <ChatWithDeepSeek />
            <ChatOpenRouter />
            <ChatWithGroq />
            <ChatWithHistoryAir />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;