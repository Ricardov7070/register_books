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
  const [titleError, setTitleError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);
  const [publisherError, setPublisherError] = useState<string | null>(null);
  const [languageError, setLanguageError] = useState<string | null>(null);
  const [yearError, setYearError] = useState<string | null>(null);
  const [editionError, setEditionError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [pagesError, setPagesError] = useState<string | null>(null);
  const [formatError, setFormatError] = useState<string | null>(null);


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
        
      }

      setTimeout(() => {
        onSave(response.data.book);
        onClose();
      }, 1500);

    } catch (error: any) {

      if (error.response.status === 400) {

        const erros = error.response.data.errors;

        setTitleError(erros.title ? erros.title[0] : null);
        setAuthorError(erros.author ? erros.author[0] : null);
        setPublisherError(erros.publisher ? erros.publisher[0] : null);
        setLanguageError(erros.language ? erros.language[0] : null);
        setYearError(erros.publication_year ? erros.publication_year[0] : null);
        setEditionError(erros.edition ? erros.edition[0] : null);
        setGenderError(erros.gender ? erros.gender[0] : null);
        setPagesError(erros.quantity_pages ? erros.quantity_pages[0] : null);
        setFormatError(erros.format ? erros.format[0] : null);

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
    
      }

      setTimeout(() => {
        onSave({ ...book, title, author, publisher, language, publication_year, edition, gender, quantity_pages, format });
        onClose();
      }, 1500);

    } catch (error: any) {

      if (error.response.status === 400) {

        const erros = error.response.data.errors;

        setTitleError(erros.title ? erros.title[0] : null);
        setAuthorError(erros.author ? erros.author[0] : null);
        setPublisherError(erros.publisher ? erros.publisher[0] : null);
        setLanguageError(erros.language ? erros.language[0] : null);
        setYearError(erros.publication_year ? erros.publication_year[0] : null);
        setEditionError(erros.edition ? erros.edition[0] : null);
        setGenderError(erros.gender ? erros.gender[0] : null);
        setPagesError(erros.quantity_pages ? erros.quantity_pages[0] : null);
        setFormatError(erros.format ? erros.format[0] : null);

      } else {

        showAlert(`🚫 ${error.response.data.error}`, "error");

      };

    }

  };


  return (
    <>
      <div className="modal-overlay">
        <div className="modalUser">
          <div className="row d-flex justify-content-end">
            <button type="button" className="btn-close" onClick={onClose}></button>
            {alert && <div className="alert-container">{alert}</div>}
          </div>
          <h2 className="text-center">{book ? "Edit Book" : "Add Book"}</h2>
          <form>
            <div className="row d-flex justify-content-center">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Title:</label>
                  <input 
                    type="text" 
                    value={title} 
                    className={titleError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (titleError) setTitleError(null);
                    }}
                    required 
                  />
                  {titleError && <small className="invalid-feedback">{titleError}</small>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Author:</label>
                  <input 
                    type="text" 
                    value={author} 
                    className={authorError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                      if (authorError) setAuthorError(null);
                    }}
                    required 
                  />
                  {authorError && <small className="invalid-feedback">{authorError}</small>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Publisher:</label>
                  <input 
                    type="text" 
                    value={publisher} 
                    className={publisherError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setPublisher(e.target.value);
                      if (publisherError) setPublisherError(null);
                    }}
                    required 
                  />
                  {publisherError && <small className="invalid-feedback">{publisherError}</small>}
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Language:</label>
                  <input 
                    type="text" 
                    value={language} 
                    className={languageError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      if (languageError) setLanguageError(null);
                    }}
                    required 
                  />
                  {languageError && <small className="invalid-feedback">{languageError}</small>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Publication Year:</label>
                  <input 
                    type="number" 
                    value={publication_year} 
                    className={yearError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setYear(parseInt(e.target.value) || 0);
                      if (yearError) setYearError(null);
                    }}
                    required 
                  />
                  {yearError && <small className="invalid-feedback">{yearError}</small>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Edition:</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={edition} 
                    className={editionError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setEdition(parseInt(e.target.value) || 1);
                      if (editionError) setEditionError(null);
                    }}
                    required 
                  />
                  {editionError && <small className="invalid-feedback">{editionError}</small>}
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Gender:</label>
                  <input 
                    type="text" 
                    value={gender} 
                    className={genderError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setGender(e.target.value);
                      if (genderError) setGenderError(null);
                    }}
                    required 
                  />
                  {genderError && <small className="invalid-feedback">{genderError}</small>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Quantity Pages:</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity_pages} 
                    className={pagesError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setPages(parseInt(e.target.value) || 1);
                      if (pagesError) setPagesError(null);
                    }}
                    required 
                  />
                  {pagesError && <small className="invalid-feedback">{pagesError}</small>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Format:</label>
                  <input 
                    type="text" 
                    value={format} 
                    className={formatError ? "is-invalid" : ""}
                    onChange={(e) => {
                      setFormat(e.target.value);
                      if (formatError) setFormatError(null);
                    }}
                    required 
                  />
                  {formatError && <small className="invalid-feedback">{formatError}</small>}
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
