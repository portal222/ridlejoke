import React from "react";
import BackToTop from "../BackToTop";
import ChatWithGroq from "./ChatWithGroq";
import ChatOpenRouter from "./ChatOpenRouter";
import AiPollinationImg from "./AiPollinationImg";
import ChatRouteWay from "./ChatRouteWay";
import ChatUnoRouter from "./ChatUnoRouter";
import AiUnoRouterPictures from "./AiUnoRouterPictures";


const Aigenerator = () => {


    return (
        <>
            <ChatUnoRouter />
            <ChatOpenRouter />
            <ChatRouteWay />
            <ChatWithGroq />
            <AiUnoRouterPictures />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;