import React from "react";
import BackToTop from "../BackToTop";
import ChatUnoRouter from "./ChatUnoRouter";
import ChatWithGroq from "./ChatWithGroq";
import AiPollinationImg from "./AiPollinationImg";
import ChatWithOpenRouterImage from "./ChatWithOpenRouterImage";
import ChatEdenAi from "./ChatEdenAi";

const Aigenerator = () => {

    return (
        <>
            <ChatEdenAi />
            <ChatWithOpenRouterImage />
            <ChatUnoRouter />
            <ChatWithGroq />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;