import express from "express"
import { getSkills, createSkill, deleteSkill } from "../controllers/skillController.js"
import protect from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(getSkills).post(protect, createSkill)
router.route("/:id").delete(protect, deleteSkill)

export default router
