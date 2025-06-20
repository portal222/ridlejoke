import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import Loader from "../Loader";
import SearchHistoryEvents from "./searchHistoryEvents";
import BooksCover from "./BooksCover";
import BooksDetails from "./BooksDetails";


const BooksClick = () => {

    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [totalBook, setTotalBook] = useState(0);
    const [pageBook, setPageBook] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    const params = useParams()
    const works = params.works;

    const limitBook = 5;

    useEffect(() => {
        getBook(works, pageBook);
    }, [works, pageBook]);

    const getBook = async (works, pageBook) => {
        const url = `https://openlibrary.org/search.json?q=${works}&page=${pageBook}&limit=5`

        try {
            const response = await axios.get(url);
            const data = response.data

            setBooks(data.docs);
            setTotalBook(data.numFound)
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    const totalPagesBook = Math.ceil(totalBook / limitBook);

    const handleClick = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />;
    } else if (totalBook == 0) {
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
                    {totalBook} books by title {works}
                </div>
                <div>
                    {books.map((b, id) => (
                        <div key={id}>
                            {b.author_key && (
                                <div className="imgBook" style={{ paddingTop: "10px" }}>
                                    <img src={`https://covers.openlibrary.org/a/olid/${b.author_key}-L.jpg`} alt=" " />
                                </div>
                            )}
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
                            {b.cover_edition_key && (
                                <div className="imgBook">
                                    <img src={`https://covers.openlibrary.org/b/olid/${b.cover_edition_key}-L.jpg`} alt=" " />
                                </div>
                            )}
                            <div className="titleBook">{b.title + " " + "(" + b.first_publish_year + ")"} </div>
                            {b.edition_key && (
                                <BooksCover covers={b.edition_key} />
                            )}
                            <div>
                                <BooksDetails edition={b.key} />
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
            <BackToTop />
        </>
    )
}
export default BooksClick;