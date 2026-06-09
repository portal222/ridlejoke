import React, { useState, useEffect } from "react";
import axios from "axios";

const AiOpenRouter = () => {

    const [modelRouter, setModelRouter] = useState([]);


    useEffect(() => {
        getModels();
    }, []);

    const getModels = async () => {
        const url = `https://openrouter.ai/api/v1/models`;

        try {
            const response = await axios.get(url,
                {
                    headers: {

                        Authorization: "Bearer REMOVED",
                    }
                }
            );

            const data = response.data;
            setModelRouter(data.data);
            console.log("openrouter modeli", response);


        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="mainBook">
            <div className="polli">OpenRouter</div>
            <div className="aiGrid">
                {modelRouter.map((mod, id) => (
                    <div className="modelPlace">
                        <p style={{ fontWeight: "bold", fontSize: "22px" }}>{mod.name}</p>
                        <p>pricing: {mod.pricing.completion + " " + mod.pricing.prompt}</p>
                        <p>{mod.architecture.modality}</p>
                        <div className="descriptionModel">
                            description: {mod.description}
                        </div>
                          <div className="descriptionModel">
                            ид: {mod.id}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
export default AiOpenRouter;


