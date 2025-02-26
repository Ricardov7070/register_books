import React, { useEffect, useState } from "react";
import { Book } from "./Home";

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose, onSave }) => {
  
  const [title, setTitle] = useState<string>(book ? book.title : "");
  const [author, setAuthor] = useState<string>(book ? book.author : "");
  const [year, setYear] = useState<number>(book ? book.year : new Date().getFullYear());

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
    } else {
      setTitle("");
      setAuthor("");
      setYear(new Date().getFullYear());
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const newBook: Book = {
      id: book ? book.id : Date.now(),
      title,
      author,
      year,
    };
    onSave(newBook);
    onClose();

  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{book ? "Editar Livro" : "Adicionar Livro"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Autor:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Ano:</label>
            <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} required />
          </div>
          <div className="modal-actions">
            <button type="submit">{book ? "Atualizar" : "Salvar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
