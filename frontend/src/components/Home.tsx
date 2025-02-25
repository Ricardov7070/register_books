import React, { useState } from "react";
import BookModal from "./BookModal";
import Pagination from "./Pagination";
import Header from "./Header";

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 5;

  const handleAddBook = () => {
    setEditBook(null);
    setModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditBook(book);
    setModalOpen(true);
  };

  const handleDeleteBook = (id: number) => {
    if (window.confirm("Deseja deletar este livro?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleSaveBook = (book: Book) => {
    if (editBook) {
      // Atualiza livro existente
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
    } else {
      // Adiciona novo livro (atribui id baseado em Date.now)
      setBooks([...books, { ...book, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  // Lógica de paginação
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="">
      <Header />

      <div className="row d-flex justify-content-around mt-5">
        <div className="col-md-5">
          <h1 className="title">Book Management</h1>
        </div>
        <div className="col-md-2">
          <button onClick={handleAddBook} className="btn btn-success">
            Add Book
          </button>
        </div>
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Author</th>
            <th className="text-center">Year</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>
                  <button onClick={() => handleEditBook(book)}>Editar</button>
                  <button onClick={() => handleDeleteBook(book.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-white text-center" colSpan={4}>
                No books registered
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalItems={books.length}
        itemsPerPage={booksPerPage}
        onPageChange={setCurrentPage}
      />
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
