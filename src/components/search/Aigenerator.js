import React from "react";
import BackToTop from "../BackToTop";
import ChatUnoRouter from "./ChatUnoRouter";
import AiPollinationImg from "./AiPollinationImg";
import ChatWithOpenRouterImage from "./ChatWithOpenRouterImage";
import ChatEdenAi from "./ChatEdenAi";

const Aigenerator = () => {

    return (
        <>
            <ChatEdenAi />
            <ChatWithOpenRouterImage />
            <ChatUnoRouter />
            <AiPollinationImg />
            <BackToTop />
        </>
    )
}
export default Aigenerator;