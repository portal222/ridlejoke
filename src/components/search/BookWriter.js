import React from "react";
import BooksAuthors from "./BooksAuthors";
import { useNavigate } from "react-router-dom";

const BookWriter = (props) => {

    const navigate = useNavigate();

    const handleClick = (personName) => {
        const LinkTo = `/historyPerson/${personName}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div key={props.b.id}>
                <img src={`https://covers.openlibrary.org/a/olid/${props.b.key}-L.jpg`} alt=" " 
                style={{paddingTop: "10px"}} />
                {props.b.name && (
                    <div className="author"
                        onClick={() => {
                            handleClick(props.b.name);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {props.b.name}
                    </div>
                )}
                {props.b.top_work && (
                    <div className="titleBook">{props.b.top_work} </div>
                )}
                <div className="bornDate">
                    {props.b.birth_date && (
                        <div>Born: {props.b.birth_date}</div>
                    )}
                    {props.b.death_date && (
                        <div style={{ paddingLeft: "20px" }}> Death: {props.b.death_date}</div>
                    )}
                    {props.b.work_count && (
                        <div style={{ paddingLeft: "80px" }}> {props.b.work_count + " works"}</div>

                    )}
                </div>
                <BooksAuthors author={props.b.key} />
                {props.b.top_subjects && (
                <div className="subject">
                    <p>SUBJECTS:</p>
                    {props.b.top_subjects.map((top, id) => (
                        <p key={id}>{top}</p>
                    ))}
                </div>
            )}
                <hr></hr>
            </div>
        </>
    )
}
export default BookWriter;