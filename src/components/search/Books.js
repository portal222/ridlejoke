import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import Loader from "../Loader";
import SearchHistoryEvents from "./searchHistoryEvents";
import BooksCover from "./BooksCover";

const Books = () => {

    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const [pageBook, setPageBook] = useState(1);
    const [bookAuthor, setBookAuthor] = useState([]);
    const [pageBookA, setPageBookA] = useState(1);
    const [totalBookA, setTotalBookA] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const limitBook = 5;

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getBook(searchStringValue, pageBook, pageBookA);
    }, [searchStringValue, pageBook, pageBookA]);

    const getBook = async (searchStringValue, pageBook, pageBookA) => {
        const url = `https://openlibrary.org/search.json?q=${searchStringValue}&page=${pageBook}&limit=5`
        const urlA = `https://openlibrary.org/search.json?author=${searchStringValue}&page=${pageBookA}&limit=5`

        try {
            const [response, responseA] = await Promise.all([axios.get(url), axios.get(urlA)]);

            const data = response.data
            const dataA = responseA.data

            setBooks(data.docs);
            setTotalBook(data.numFound)
            setBookAuthor(dataA.docs)
            setTotalBookA(dataA.numFound)
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const totalPagesBook = Math.ceil(totalBook / limitBook);
    const totalPagesBookA = Math.ceil(totalBookA / limitBook);

    const handleClick = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />;
    } else if (totalBook == 0 && totalBookA == 0) {
        return (
            <>
                <div className="mainBook">
                    <SearchHistoryEvents placeholder={'Books & Authors'} linkTo={'/books'} />
                    <div className="total"> Nothing found</div>
                </div>
                <div className="place"></div>
                <div className="place"></div>
            </>
        )
    }

    return (
        <>
            <div className="mainBook">
                <div className="total">
                    {totalBook} books by title {searchStringValue}
                </div>
                <div>
                    {books.map((b, id) => (
                        <div key={id}>
                            {b.author_name && (
                                Array.isArray(b.author_name) ? (
                                    <div >
                                        {b.author_name.map((author, id) => (
                                            <p key={id}
                                                className="author"
                                                onClick={() => {
                                                    handleClick(author);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                            >{author}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="author"
                                        onClick={() => {
                                            handleClick(author);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}>
                                        {b.author_name}
                                    </div>
                                )
                            )}
                            {b.author_key && (
                                <div className="imgBook">
                                    <img src={`https://covers.openlibrary.org/a/olid/${b.author_key}-L.jpg`} alt=" " />
                                </div>
                            )}
                            <div className="titleBook">{b.title + " " + "(" + b.first_publish_year + ")"} </div>
                            {b.cover_edition_key && (
                                <div className="imgBook">
                                    <img src={`https://covers.openlibrary.org/b/olid/${b.cover_edition_key}-L.jpg`} alt=" " />
                                </div>
                            )}
                            {b.edition_key && (
                                <BooksCover covers={b.edition_key} />
                            )}
                            {b.first_sentence && (
                                <div className="sentence">{b.first_sentence}</div>
                            )}
                            {b.person && (
                                <div className="subject">
                                    <p>PERSON:</p>
                                    {b.person.map((per, id) => (
                                        <p key={id}>{per}</p>
                                    ))}
                                </div>
                            )}
                            {b.subject && (
                                Array.isArray(b.subject) ? (
                                    <div
                                        className="subject">
                                        <p>SUBJECT:</p>
                                        {b.subject.map((sub, id) => (
                                            <p key={id}>
                                                {sub}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="subject">
                                        SUBJECT: {b.subject}
                                    </div>
                                )
                            )}
                            {b.place && (
                                Array.isArray(b.place) ? (
                                    <div className="subject">
                                        <p>PLACE:</p>
                                        {b.place.map((pla, id) => (
                                            <p key={id}>
                                                {pla}
                                            </p>
                                        ))}</div>
                                ) : (
                                    <div className="subject">
                                        PLACE: {b.place}
                                    </div>
                                )
                            )}
                            <div className="publisher">
                                <p>
                                    PUBLISHER: {b.publisher + ", "}
                                </p>
                                {b.publish_place && (
                                    <p>{b.publish_place + ", "}</p>
                                )}
                            </div>
                            <div>
                                <hr></hr>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="imageNum">
                {Array.from({ length: totalPagesBook }, (_, i) => (
                    <div className={pageBook === i + 1 ? 'numbActIm' : 'numbIm'}
                        key={i + 1}
                        onClick={() => {
                            setPageBook(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={i + 1 === pageBook}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <div className="videoTop"></div>

            <div className="mainBook">
                <div className="total"> {totalBookA} books by Author {searchStringValue}</div>
                <div>
                    {bookAuthor.map((b, id) => (
                        <div key={id}>
                            {b.author_name && (
                                Array.isArray(b.author_name) ? (

                                    <div >
                                        {b.author_name.map((author, id) => (
                                            <p key={id}
                                                className="author"
                                                onClick={() => {
                                                    handleClick(author);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                            >{author}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="author"
                                        onClick={() => {
                                            handleClick(author);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}>

                                        {b.author_name}

                                    </div>
                                )
                            )}
                            {b.author_key && (
                                <div className="imgBook">
                                    <img src={`https://covers.openlibrary.org/a/olid/${b.author_key}-L.jpg`} alt=" " />
                                </div>
                            )}
                            <div className="titleBook">{b.title + " " + "(" + b.first_publish_year + ")"} </div>
                            {b.cover_edition_key && (
                                <div className="imgBook">
                                    <img src={`https://covers.openlibrary.org/b/olid/${b.cover_edition_key}-L.jpg`} alt=" " />
                                </div>
                            )}
                            {b.edition_key && (
                                <BooksCover covers={b.edition_key} />
                            )}
                            {b.first_sentence && (
                                <div className="sentence">{b.first_sentence}</div>
                            )}
                            {b.person && (
                                <div className="subject">
                                    <p>PERSON:</p>
                                    {b.person.map((per, id) => (
                                        <p key={id}>{per}</p>
                                    ))}
                                </div>
                            )}
                            {b.subject && (
                                Array.isArray(b.subject) ? (
                                    <div
                                        className="subject">
                                        <p>SUBJECT:</p>
                                        {b.subject.map((sub, id) => (
                                            <p key={id}>
                                                {sub}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="subject">
                                        SUBJECT: {b.subject}
                                    </div>
                                )
                            )}
                            {b.place && (
                                Array.isArray(b.place) ? (
                                    <div className="subject">
                                        <p>PLACE:</p>
                                        {b.place.map((pla, id) => (
                                            <p key={id}>
                                                {pla}
                                            </p>
                                        ))}</div>
                                ) : (
                                    <div className="subject">
                                        PLACE: {b.place}
                                    </div>
                                )
                            )}
                            <div className="publisher">
                                <p>
                                    PUBLISHER: {b.publisher + ", "}
                                </p>
                                {b.publish_place && (
                                    <p>{b.publish_place + ", "}</p>
                                )}
                            </div>
                            <div>
                                <hr></hr>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="imageNum">
                {Array.from({ length: totalPagesBookA }, (_, i) => (
                    <div className={pageBookA === i + 1 ? 'numbActIm' : 'numbIm'}
                        key={i + 1}
                        onClick={() => {
                            setPageBookA(i + 1);
                            document.querySelector('.videoTop').scrollIntoView({ behavior: 'smooth' });
                        }}
                        disabled={i + 1 === pageBookA}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    )
}
export default Books;