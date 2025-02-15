import React, { useEffect, useState } from "react";
import axios from 'axios';
import BooksCoverImg from "./BooksCoverImg";

const BooksDetails = (props) => {

    const [error, setError] = useState(null);
    const [book, setBook] = useState([]);

    const edition = props.edition

    console.log("props podaci bookdetails", edition);

    useEffect(() => {
        getBooks()
    }, [edition])

    const getBooks = async () => {

        const url = `https://openlibrary.org${edition}.json`
        try {
            const response = await axios.get(url);
            const data = response.data
            setBook(data);

            console.log("detalji knjige po keyu", data);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            {book.description && (
                <div className="sentence">
                    {typeof book.description === 'object' ? book.description.value : book.description}
                </div>
            )}
            {book.excerpts && book.excerpts[0] && (
                <div className="sentence">
                    {typeof book.excerpts[0].excerpt === 'object' ? JSON.stringify(book.excerpts[0].excerpt) : book.excerpts[0].excerpt}
                </div>
            )}
            {book.subject_people && (
                <div className="subject">
                    <p>PEOPLE:</p>
                    {book.subject_people.map((people, id) => (
                        <p key={id}>{people}</p>
                    ))}
                </div>
            )}
            {book.subject_places && (
                <div className="subject">
                    <p>PLACES:</p>
                    {book.subject_places.map((places, id) => (
                        <p key={id}>{places}</p>
                    ))}
                </div>
            )}
            {book.subject_times && (
                <div className="subject">
                    <p>TIMES:</p>
                    {book.subject_times.map((times, id) => (
                        <p key={id}>{times}</p>
                    ))}
                </div>
            )}
            {book.subjects && (
                <div className="subject">
                    <p>SUBJECTS:</p>
                    {book.subjects.map((subject, id) => (
                        <p key={id}>{subject}</p>
                    ))}
                </div>
            )}
        </>
    )
}
export default BooksDetails;