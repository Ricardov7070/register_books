import React, { useEffect, useState } from "react";
import { Book } from "./Home";
import api from "../services/api";
import "../index.css";
import { useCustomAlert } from "../hooks/useCustomAlert";


interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onSave: (book: Book) => void;
}


const BookModal: React.FC<BookModalProps> = ({ book, onClose, onSave }) => {

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [publication_year, setYear] = useState<number>(new Date().getFullYear());
  const [edition, setEdition] = useState<number>(1);
  const [gender, setGender] = useState<string>("");
  const [quantity_pages, setPages] = useState<number>(1);
  const [format, setFormat] = useState<string>("");
  const { alert, showAlert } = useCustomAlert();


  useEffect(() => {

    if (book) {

      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setLanguage(book.language);
      setYear(book.publication_year);
      setEdition(book.edition || 1);
      setGender(book.gender);
      setPages(book.quantity_pages || 1);
      setFormat(book.format);

    } else {

      setTitle("");
      setAuthor("");
      setPublisher("");
      setLanguage("");
      setYear(new Date().getFullYear());
      setEdition(1);
      setGender("");
      setPages(1);
      setFormat("");

    }

  }, [book]);

   
  // Registra um novo livro
  const handleCreateBook = async () => {

    try {

      const response = await api.post("/registerBooks", {
        title,
        author,
        publisher,
        language,
        publication_year,
        edition,
        gender,
        quantity_pages,
        format,
      });

      if (response.status === 200) {

        showAlert(`✅ ${response.data.success}`, "success");
        onSave(response.data.book);

      }

      onClose();

    } catch (error: any) {

      if (error.response.status === 400) {

        showAlert(`⚠️ ${error.response.data.message}`, "info");

      } else {

        showAlert(`🚫 ${error.response.data.error}`, "error");

      };

    }

  };


  // Atualiza os dados de um livro selecionado
  const handleEditBook = async () => {

    if (!book) return;

    try {

      const response = await api.put(`/updateBook/${book.id}`, { title, author, publisher, language, publication_year, edition, gender, quantity_pages, format});

      if (response.status === 200) {

        showAlert(`✅ ${response.data.success}`, "success");
        onSave({ ...book, title, author, publisher, language, publication_year, edition, gender, quantity_pages, format });
    
      }

      onClose();

    } catch (error: any) {

      console.log(error);

      if (error.response.status === 400) {

        showAlert(`⚠️ ${error.response.data.message}`, "info");

      } else {

        showAlert(`🚫 ${error.response.data.error}`, "error");

      };

    }

  };


  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="row d-flex justify-content-end">
            <button type="button" className="btn-close" onClick={onClose}></button>
            {alert && <div className="alert-container">{alert}</div>}
          </div>
          <h2 className="text-center">{book ? "Edit Book" : "Add Book"}</h2>
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Title:</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Author:</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Publisher:</label>
                  <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Language:</label>
                  <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Publication Year:</label>
                  <input type="number" value={publication_year} onChange={(e) => setYear(parseInt(e.target.value) || 0)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Edition:</label>
                  <input type="number" min="1" value={edition} onChange={(e) => setEdition(parseInt(e.target.value) || 1)} required />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gender:</label>
                  <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Quantity Pages:</label>
                  <input type="number" min="1" value={quantity_pages} onChange={(e) => setPages(parseInt(e.target.value) || 1)} required />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Format:</label>
                  <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="modal-actions text-center d-flex justify-content-center">
              <div className="row">
                <div className="col-md-6">
                  {book ? (
                    <button type="button" className="btn btn-primary me-2" onClick={handleEditBook}>
                      Edit
                    </button>
                  ) : (
                    <button type="button" className="btn btn-primary me-2" onClick={handleCreateBook}>
                      Save
                    </button>
                  )}
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );

};

export default BookModal;
