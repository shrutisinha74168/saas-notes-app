import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="container mt-4">
      <div className="row g-3">
        {notes.map((note) => (
          <motion.div
            key={note._id}
            className="col-12 col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card h-100 shadow-sm border-light">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text flex-grow-1">{note.content}</p>
                <button
                  onClick={() => onDelete(note._id)}
                  className="btn btn-danger mt-3"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
