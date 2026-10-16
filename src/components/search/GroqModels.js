import React, { useState, useEffect } from "react";
import axios from "axios";


export default function GroqModels() {

    const [error, setError] = useState(null);

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/groqmodels`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            console.log("groq modeli", response);

        } catch (err) {
            setError(err);
        }
    };


}