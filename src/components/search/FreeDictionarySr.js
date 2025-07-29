import React, { useEffect, useState } from "react";
import axios from "axios";

const FreeDictionarySr = (props) => {

    const [letter, setLetter] = useState([]);
    const [results, setResults] = useState([]);

    const word = props.dictionary

    useEffect(() => {
        getDictionary(word);
    }, [word])

    const getDictionary = async () => {
        const url = `https://freedictionaryapi.com/api/v1/entries/sh/${word}`;

        try {
            const response = await axios.get(url);
            const data = response.data.entries;
            setLetter(data);
            setResults(data.length);

        } catch (err) {
            setError(err);
        }
    };

    if (results == 0) {
        return (
            <div className="tabelaZemlje">
            </div>
        )
    }

    return (
        <>
            <div className="tabelaZemlje">
                <p className="results">FREE dictionari for {word}</p>
            </div>
            {letter.map((lett, id) => (
                <>
                    <table className="tabelaZemlje">
                        <tbody key={id}>


                            {lett.senses.map((l, idx) => (
                                <>
                                    <tr key={idx}>
                                        <td className="navod">definition</td>
                                        <td className="nameComm">{l.definition}</td>
                                    </tr>
                                    {l.examples?.[0] && (
                                        <tr>
                                            <td className="navod">
                                                exaples
                                            </td>
                                            <td className="example">
                                                {l.examples?.[0]}
                                            </td>
                                        </tr>
                                    )}
                                    {l.quotes && (
                                        <>
                                            {l.quotes.map((q, id) => (
                                                <>
                                                    <tr key={id}>
                                                        <td className="navod">
                                                            quotes text
                                                        </td>
                                                        <td className="quotes">
                                                            {q.text}
                                                        </td>
                                                    </tr>
                                                    <tr key={id}>
                                                        <td className="navod">
                                                            reference
                                                        </td>
                                                        <td className="quotes2">
                                                            {q.reference}
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </>
                                    )}
                                </>
                            ))}
                            <>
                                <tr>
                                    <td colSpan={2}>
                                        {lett.synonyms && lett.synonyms > 0 && (
                                            <div className="synonyms">
                                                <p className="syn">synonyms</p>

                                                {lett.synonyms.map((syn, id) => (
                                                    <p key={id} className="nyms">
                                                        {syn}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </>
                        </tbody>
                    </table>
                    <div className="tabelaZemlje">
                        {lett.forms && (
                            <div className="forms">
                                <p className="form">forms</p>
                                {lett.forms.map((f, id) => (
                                    <>
                                        <div className="wordMain">
                                            {f.tags.map((t, id) => (
                                                <p key={id}>{t}</p>
                                            ))}
                                            <p key={id}
                                                className="word">
                                                {f.word}</p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}

                    </div>
                </>
            ))}
        </>
    )
}
export default FreeDictionarySr;