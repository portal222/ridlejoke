import React from "react";
import BackToTop from "../BackToTop";
import ChatUnoRouter from "./ChatUnoRouter";
import ChatWithGroq from "./ChatWithGroq";
import AiUnoRouterPictures from "./AiUnoRouterPictures";
import AiPollinationImg from "./AiPollinationImg";
import ChatUnoRouterChosen from "./ChatUnoRouterChosen";
import ChatWithOpenRouterImage from "./ChatWithOpenRouterImage";
import ChatEdenAi from "./ChatEdenAi";

const Aigenerator = () => {

    return (
        <>
            <ChatUnoRouter />
            <ChatWithOpenRouterImage />
            <ChatEdenAi />
            <ChatWithGroq />
            <ChatUnoRouterChosen />
            <AiUnoRouterPictures />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;