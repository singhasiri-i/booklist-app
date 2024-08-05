import { useState } from "react"
import useBooksContext from "../hooks/use-books-context";

function BookEdit({ book, onSubmit }) {

    const [title, setTitle] = useState(book.title);
    
    const { editBookById } = useBooksContext();

    const handleChangeInput = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault() // ทำให้เวลาที่ submit form ไม่เกิดการ refresh
        onSubmit()
        editBookById(book.id, title)
    }

    return (
        <form onSubmit={ handleSubmit } className="book-edit">
            <label>Title</label>
            <input className="input" value={ title } onChange={ handleChangeInput }/>
            <button className="button is-primary">Save</button>
        </form>
    )
}

export default BookEdit
