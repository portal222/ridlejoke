import React from "react";
import BackToTop from "../BackToTop";
import ChatUnoRouter from "./ChatUnoRouter";
import ChatWithOpenRouterImage from "./ChatWithOpenRouterImage";
import ChatWithGroq from "./ChatWithGroq";
import AiUnoRouterPictures from "./AiUnoRouterPictures";
import AiPollinationImg from "./AiPollinationImg";
import AiUnoRouterPicturesChosen from "./AiUnoRouterPicturesChosen";
import ChatUnoRouterChosen from "./ChatUnoRouterChosen";
import ChatAiLmApi from "./ChatAiLmApi";
import ChatEdenAi from "./ChatEdenAi";

const Aigenerator = () => {

    return (
        <>
            <ChatUnoRouter />
            <ChatEdenAi />
            <ChatUnoRouterChosen />
            <ChatWithOpenRouterImage />
            <ChatWithGroq />
            <AiUnoRouterPictures />
            <AiUnoRouterPicturesChosen />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;