import React, { useState, useEffect } from "react";
import axios from "axios";

const AiEdenFree = () => {

    const [modelRouter, setModelRouter] = useState([]);
    const [models, setModels] = useState([]);


    useEffect(() => {
        getModels();
    }, []);

    const getModels = async () => {
        const url = `https://api.edenai.run/v3/models`;
        // const url = 'https://api.unorouter.com/v1/models';

        try {
            const response = await axios.get(url);

            const data = response.data;
                  // filtriraj samo besplatne modele
      const freeModels = data.data.filter(
        (model) => model.pricing?.input_cost_per_token <= "0.0000000001"
      );
          setModels(freeModels);
            console.log("eden ai modeli", data);
            console.log("eden free ai modeli", freeModels);


        } catch (err) {
            setError(err);
        }
    };
 
    return (
        <div className="mainBook">
            <div className="polli">Eden FREE models</div>
            {/* <div className="aiGrid">
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
            </div> */}

        </div>
    );
};
export default AiEdenFree;


