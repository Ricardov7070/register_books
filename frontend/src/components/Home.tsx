import React, { useEffect, useState } from "react";
import BookModal from "./BookModal";
import Pagination from "./Pagination";
import Header from "./Header";
import api from "../services/api";
import "../index.css";
import { useCustomAlert } from "../hooks/useCustomAlert";

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  language: string;
  publication_year: number;
  edition: number;
  gender: string;
  quantity_pages: number;
  format: string;
}


const Home: React.FC = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 10;
  const { alert, showAlert } = useCustomAlert();


  // Realiza a visualização de todos os livros cadastrados
  const fetchBooks = async () => {

    try {

      const response = await api.get("/viewBook");

      if (response.status === 200) {
        
        if (Array.isArray(response.data)) {

          setBooks(response.data); 
          setFilteredBooks(response.data);

        } else {

          setBooks(response.data.books || []);
          setFilteredBooks(response.data.books || []);

        }

      }

    } catch (error: any) {

      if (error.response?.status === 400) {

        showAlert(`⚠️ ${error.response.data.message}`, "info");

      } else {

        showAlert(`🚫 ${error.response?.data.error}`, "error");

      }  

    }

  };


  useEffect(() => {
    fetchBooks();
  }, []);


  useEffect(() => {

    if (searchQuery.trim() === "") {

      setFilteredBooks(books); 

    } else {

      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

    }

  }, [searchQuery, books]);


  const handleAddBook = () => {
    setEditBook(null);
    setModalOpen(true);
  };


  const handleEditBook = (book: Book) => {
    setEditBook(book);
    setModalOpen(true);
  };


  // Realiza a exlusão do livro selecionado
  const handleDeleteBook = async (id: number) => {

    if (window.confirm("Do you want to delete this book?")) {

      try {

        const response = await api.delete(`/deleteBook/${id}`);

        if (response.status === 200) {

          showAlert(`✅ ${response.data.success}`, "success");

          fetchBooks(); 

        }

      } catch (error: any) {

        if (error.response?.status === 400) {

          showAlert(`⚠️ ${error.response.data.message}`, "info");
  
        } else {
  
          showAlert(`🚫 ${error.response?.data.error}`, "error");
  
        }  

      }

    }

  };


  const handleSaveBook = () => {
    setModalOpen(false);
    fetchBooks();
  };


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  

  return (
    <div className="">
      <Header />
      {alert}
      <div className="row d-flex justify-content-around mt-5">
        <div className="col-md-3">
          <h1 className="title">Book Management</h1>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button onClick={handleAddBook} className="btn btn-success">
            + Add Book
          </button>
        </div>
      </div>

      <div className="container mt-3 d-flex justify-content-center">
        <table className="table table-sm table-striped table-bordered table-hover table-ordered nowrap w-100px">
          <thead>
            <tr>
              <th className="text-center bg-secondary">ID</th>
              <th className="text-center bg-secondary">Title</th>
              <th className="text-center bg-secondary">Author</th>
              <th className="text-center bg-secondary">Publisher</th>
              <th className="text-center bg-secondary">Language</th>
              <th className="text-center bg-secondary">Publication Year</th>
              <th className="text-center bg-secondary">Edition</th>
              <th className="text-center bg-secondary">Gender</th>
              <th className="text-center bg-secondary">Quantity pages</th>
              <th className="text-center bg-secondary">Format</th>
              <th className="text-center bg-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.language}</td>
                  <td>{book.publication_year}</td>
                  <td>{book.edition}</td>
                  <td>{book.gender}</td>
                  <td>{book.quantity_pages}</td>
                  <td>{book.format}</td>
                  <td className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-primary" onClick={() => handleEditBook(book)}>
                      Edit<i className="bi bi-pencil-square ms-1"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBook(book.id)}>
                      Delete<i className="bi bi-trash ms-1"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-black text-center" colSpan={11}>
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-md-1">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={booksPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>


      {modalOpen && (
        <BookModal
          book={editBook}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveBook}
        />
      )}
    </div>
  );

};

export default Home;
