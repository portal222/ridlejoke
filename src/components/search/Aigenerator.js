import React from "react";
import BackToTop from "../BackToTop";
import ChatUnoRouter from "./ChatUnoRouter";
import ChatWithOpenRouterImage from "./ChatWithOpenRouterImage";
import ChatWithGroq from "./ChatWithGroq";
import AiUnoRouterPictures from "./AiUnoRouterPictures";
import AiPollinationImg from "./AiPollinationImg";

const Aigenerator = () => {

    return (
        <>
            <ChatUnoRouter />
            <ChatWithOpenRouterImage />
            <ChatWithGroq />
            <AiUnoRouterPictures />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;