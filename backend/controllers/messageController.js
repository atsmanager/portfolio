import Message from "../models/Message.js"
import sendEmail from "../utils/sendEmail.js"
import dotenv from "dotenv"
dotenv.config()

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createMessage = async (req, res) => {
  try {
    const message = new Message(req.body)
    await message.save()

    // Send email notification to admin
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `📬 New Message from ${message.name} - Portfolio`,
        text: `You have received a new message!\n\nName: ${message.name}\nEmail: ${message.email}\nMessage: ${message.message}`,
      })
    } catch (emailErr) {
      console.error("Email failed (message still saved):", emailErr.message)
    }

    res.status(201).json(message)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const replyToMessage = async (req, res) => {
  const { id } = req.params;
  const { replyText } = req.body;

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await sendEmail({
      to: message.email,
      subject: `Re: Your message to Portfolio`,
      text: replyText,
    });

    res.json({ message: "Reply sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

