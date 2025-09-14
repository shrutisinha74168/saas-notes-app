import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const addNote = async (note) => {
    try {
      const res = await api.post("/notes", note);
      setNotes([...notes, res.data]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container my-4"
    >
      <h2 className="mb-4 text-center fw-bold">Your Notes</h2>

      {/* Note Form */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-5"
      >
        <NoteForm onAdd={addNote} />
      </motion.div>

      {/* Note List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <NoteList notes={notes} onDelete={deleteNote} />
      </motion.div>
    </motion.div>
  );
};

export default Notes;
