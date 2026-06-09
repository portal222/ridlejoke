import React, { useState, useEffect } from "react";
import axios from "axios";

const AiOpenRouterFree = () => {

    const [modelRouter, setModelRouter] = useState([]);
    const [models, setModels] = useState([]);


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
                  // filtriraj samo besplatne modele
      const freeModels = data.data.filter(
        (model) => model.pricing?.completion === "0"
      );
          setModels(freeModels);
            console.log("openrouter besplatni modeli", response);


        } catch (err) {
            setError(err);
        }
    };
 
    return (
        <div className="mainBook">
            <div className="polli">OpenRouter FREE models</div>
            <div className="aiGrid">
                {models.map((mod, id) => (
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
export default AiOpenRouterFree;


