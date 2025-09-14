const Note = require("../models/Note");
const Tenant = require("../models/Tenant");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const tenant = await Tenant.findById(req.user.tenant);
    if (!tenant) return res.status(404).json({ msg: "Tenant not found" });

    if (tenant.plan === "Free") {
      const count = await Note.countDocuments({ tenant: tenant._id });
      if (count >= 3) {
        return res.status(403).json({ msg: "Free plan limit reached. Upgrade to Pro." });
      }
    }

    const note = new Note({
      title,
      content,
      tenant: req.user.tenant,
      createdBy: req.user.id
    });

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ tenant: req.user.tenant });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, tenant: req.user.tenant });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenant: req.user.tenant },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: req.user.tenant });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createNote, getNotes, getNote, updateNote, deleteNote };

