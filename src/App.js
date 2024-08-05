import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

function App() {

    const { fetchBooks } = useContext(BooksContext);
    // การใช้ useContext(BooksContext) หมายถึงดึงทั้งหมดจาก Provider มา
    // แต่เราต้องการแค่ function "fetchBooks" ก็ประกาศเป็นตัวแปรได้

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    );
}

export default App;
