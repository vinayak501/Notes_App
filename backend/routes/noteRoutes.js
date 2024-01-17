const express = require('express');
const { getNotes,createNote, getNoteById, UpdateNote, DeleteNote } = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/").get(protect,getNotes);
router.route("/create").post(protect,createNote);
router.route("/:id").get(getNoteById);
router.route("/:id").put(protect,UpdateNote);
router.route("/:id").delete(protect,DeleteNote);



module.exports = router;