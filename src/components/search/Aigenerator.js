import React from "react";
import BackToTop from "../BackToTop";
import ChatWithHistoryAir from "./ChatWithHistoryAir";
import ChatWithGroq from "./ChatWithGroq";
import ChatOpenRouter from "./ChatOpenRouter";
import AiPollinationImg from "./AiPollinationImg";

const Aigenerator = () => {


    return (
        <>
            <ChatWithHistoryAir />
            <ChatOpenRouter />
            <ChatWithGroq />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;