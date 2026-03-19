import express from "express";
import { getSections, createSection, updateSection, deleteSection, reorderSections } from "../controllers/sectionController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Define /reorder completely explicitly FIRST to avoid /:id intercepting it
router.put('/reorder', protect, reorderSections);

// Regular CRUD routes
router.get('/', getSections);
router.post('/', protect, createSection);

router.put('/:id', protect, updateSection);
router.delete('/:id', protect, deleteSection);

export default router;
