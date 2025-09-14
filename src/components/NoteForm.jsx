import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const NoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Add a New Note</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Title"
                className="form-control form-control-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Content"
                className="form-control"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100"
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
