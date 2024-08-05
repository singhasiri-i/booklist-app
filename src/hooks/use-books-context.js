import { useContext } from "react"
import BooksContext from "../context/books"

function useBooksContext() {
    return useContext(BooksContext) 
    // สร้าง function ใหม่ ให้มัน return เป็น useContext
}

export default useBooksContext;
