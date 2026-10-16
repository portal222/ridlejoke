import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BooksAuthors = (props) => {

    const [error, setError] = useState(null);
    const [biographi, setBiographi] = useState([]);
    const [works, setWorks] = useState([]);

    const navigate = useNavigate();
    const author = props.author

    useEffect(() => {
        getAuthor()
    }, [author])

    const getAuthor = async () => {
        const url = `https://openlibrary.org/authors/${author}.json`
        const urlA = `https://openlibrary.org/authors/${author}/works.json`

        try {
            const [response, responseA] = await Promise.all([axios.get(url), axios.get(urlA)]);
            const data = response.data
            const dataA = responseA.data

            setBiographi(data);
            setWorks(dataA.entries);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (works) => {
        const LinkTo = `/linkBooks/${works}`;
        navigate(LinkTo);
    }

    return (
        <>
            {biographi.bio && biographi.bio.value && (
                <div className="sentence">
                    {typeof biographi.bio === 'object' ? biographi.bio.value : biographi.bio}
                </div>
            )}
            {works && (
                <div className="subject">
                    <p>WORKS:</p>
                    {works.map((work, id) => (
                        <p key={id}
                            className="work"
                            onClick={() => {
                                handleClick(work.title);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >{work.title}</p>
                    ))}
                </div>
            )}
        </>
    )
}
export default BooksAuthors;