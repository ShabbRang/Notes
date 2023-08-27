import express from "express";
import * as NoteControllers from "../controllers/notesControllers";

const router = express.Router();

router.get("/", NoteControllers.getNotes);

router.post("/", NoteControllers.createNote);

router.get("/:noteId", NoteControllers.getNote);

router.patch("/:noteId", NoteControllers.updateNote);

router.delete("/:noteId", NoteControllers.deleteNote);

export default router;