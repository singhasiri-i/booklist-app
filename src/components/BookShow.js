import { useState } from "react"
import BookEdit from "./BookEdit"
import useBooksContext from "../hooks/use-books-context"

function BookShow({ book }) {

    const { deleteBookById } = useBooksContext()

    const [showEdit, setShowEdit] = useState(false)

    const handleDeleteClick = () => { 
        // ถ้ามีการกด onClick มันจะเรียก function handleClick
        // handleClick ก็จะเรียก onDelete โดยส่งตัว id ของ book ไปด้วย
        // เป็นการเรียก deleteBookById มันก็จะส่ง id ไปด้วย
        deleteBookById(book.id)
    }

    const handleSubmit = () => {
        setShowEdit(false)
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit) // ทำให้มัน toggle ได้ระหว่าง true/false สลับไปมาได้
    }

    let content = <h3>{ book.title }</h3>
    if(showEdit) {
        content = <BookEdit onSubmit={ handleSubmit } book={ book } />
    }

    return (
        <div className="book-show">
            <img 
                alt="books"
                src={`https://picsum.photos/seed/${book.id}/300/200`}
            />
            <div>{ content }</div>
            <div className="actions">
                <button className="edit" onClick={ handleEditClick }>
                    Edit
                </button>
                <button className="delete" onClick={ handleDeleteClick } >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default BookShow
