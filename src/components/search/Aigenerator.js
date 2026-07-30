import React from "react";
import BackToTop from "../BackToTop";
import ChatWithGroq from "./ChatWithGroq";
import ChatOpenRouter from "./ChatOpenRouter";
import AiPollinationImg from "./AiPollinationImg";
import ChatRouteWay from "./ChatRouteWay";

const Aigenerator = () => {


    return (
        <>
            <ChatOpenRouter />
            <ChatRouteWay />
            <ChatWithGroq />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;