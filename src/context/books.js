import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {

    const [books, setBooks] = useState([])

    // function สำหรับดึงข้อมูล book ทั้งหมดจาก API Server
    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:3001/books")
        // ตัวแปร response ด้านบนเราจะได้ออกมาเป็น book ทั้งหมด เราก็เอาไป update state ตัว books ได้เลย
        setBooks(response.data || [])
    }

    const editBookById = async (id, newTitle) => { // id ที่จะเปลี่ยน และ title ใหม่
        const response = await axios.put(`http://localhost:3001/books/${id}`,{
            title: newTitle
        })

        const updatedBooks = books.map((book) => { // เอา books มาวน
            if(book.id === id) { // ถ้าวนแล้ว id ตรงกับ id ที่จะเปลี่ยน title
                // ให้มัน copy object เดิมลงมาก่อนแล้วแทนที่ book นั้นทั้งก้อนด้วย data จาก response ด้านบน
                return { ...book, ...response.data }
            }
            return book // แต่ถ้า id ไม่ตรงก็ return ตัวเดิม ไม่ต้องทำอะไร
        })

        setBooks(updatedBooks)
    }

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`)

        const updatedBooks = books.filter((book) => {
            return book.id !== id
            // ใช้ filter สร้าง array ใหม่ มันจะส่งเฉพาะตัวที่ผ่านการกรองไป
            // วนแต่ละครั้งมันจะเอาแค่ id ที่ไม่ตรงกับ id ที่เลือก id ตรงก็จะถูกลบออก
            // ถ้าส่ง id จาก BookShow เป็นเลขไหนมา มันก็จะ filter out เลขนั้นออก
        })

        setBooks(updatedBooks) // จากนั้นมันก็ set จำนวนให้ "books" ใหม่
    }

    const createBookHandler = async (title) => {
        const response = await axios.post("http://localhost:3001/books", { title: title })

        const updatedBooks = [
            ...books, // copy book ที่มีทั้งหมดที่อยู่ใน state array books เดิมมาด้วย 
            response.data // แล้วก็เอาตัวที่ได้จาก server ใส่เพิ่มเข้าไป รวมแล้วจะได้ array ใหม่
        ]
        setBooks(updatedBooks) // เอา array ใหม่ด้านบนแปะกลับเข้าไปเพื่อ update ค่าใน state
    }

    const valueToShare = {
        books: books,
        fetchBooks :        fetchBooks,
        deleteBookById :    deleteBookById,
        editBookById :      editBookById,
        createBookHandler : createBookHandler
    }


    return (
        <BooksContext.Provider value={valueToShare}>
            { children }
        </BooksContext.Provider>
    )
}

export { Provider };
export default BooksContext;
