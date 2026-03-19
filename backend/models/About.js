import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  aboutTitle: { type: String, default: "About Me" },
  aboutDescription: { type: String, default: "I'm a passionate MERN stack developer..." },
  aboutCards: {
    type: [{
      title: { type: String },
      desc: { type: String },
      icon: { type: String }
    }],
    default: [
      { icon: "Code", title: "Web Development", desc: "Passionate about creating responsive applications." },
      { icon: "School", title: "Continuous Learning", desc: "Always eager to learn new technologies." },
      { icon: "Psychology", title: "Problem Solving", desc: "Enjoy tackling complex challenges." }
    ]
  }
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);
