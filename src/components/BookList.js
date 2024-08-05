import BookShow from "./BookShow"
import useBooksContext from "../hooks/use-books-context";
import { useEffect } from "react";

function BookList() {
    const { books } = useBooksContext(); // ด้านล่างก็แค่เอา function ที่ return ด้านบนมาใช้

    const renderedBooks = books?.map((book) => {
        return <BookShow key={ book.id } book={ book } />
        // key เอามาจาก book.id ได้เลย เพราะ unique อยู่แล้ว
        // book={ book } เราต้องการส่ง book แต่ละอันไปให้ BookShow ด้วย
        // renderedBooks ใต้ <div> ด้านล่างเป็นการเอา book ไปแปะหน้าเว็บได้เลย
    })

    useEffect(() => {
        console.log("Books", books);
    }, [books])
    

    return (
        <div className="book-list">
            { renderedBooks }
        </div>
    )
}

export default BookList
