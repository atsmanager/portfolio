import express from "express"
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js"
import protect from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(getProjects).post(protect, createProject)
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject)

export default router

// router.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
