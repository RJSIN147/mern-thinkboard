import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNoteById);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

export default router;
