import express from "express"
import { getMessages, createMessage, replyToMessage } from "../controllers/messageController.js"
import protect from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(protect, getMessages).post(createMessage)
router.route("/:id/reply").post(protect, replyToMessage)

export default router
