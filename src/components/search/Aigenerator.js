import React from "react";
import BackToTop from "../BackToTop";
import ChatWithGroq from "./ChatWithGroq";
import ChatWithOpenRouter from "./ChatOpenRouter";
import AiPollinationImg from "./AiPollinationImg";
import ChatUnoRouter from "./ChatUnoRouter";
import AiUnoRouterPictures from "./AiUnoRouterPictures";

const Aigenerator = () => {

    return (
        <>
            <ChatUnoRouter />
            <ChatWithOpenRouter />
            <ChatWithGroq />
            <AiUnoRouterPictures />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;