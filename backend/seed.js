import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const projectSchema = new mongoose.Schema({ title:String, description:String, tech:[String], github:String, live:String });
const skillSchema = new mongoose.Schema({ name:String, percentage:Number });

const Project = mongoose.model('Project', projectSchema);
const Skill = mongoose.model('Skill', skillSchema);

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio');
    console.log("Connected to populate MongoDB");

    await Project.deleteMany();
    await Skill.deleteMany();

    await Project.insertMany([
      {
        title: 'VideoCall Project (MERN + WebRTC + Socket.IO)',
        description: 'A real-world video calling application built with the MERN stack.',
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        github: 'https://github.com/ABBASALI1001/videocall.git',
        live: 'https://frontendvideocall.onrender.com'
      },
      {
        title: 'AI Component Generator',
        description: 'A React + Vite web application built with TailwindCSS to generate mini apps.',
        tech: ['React', 'Vite', 'Gemini Api', 'TailwindCSS'],
        github: 'https://github.com/ABBASALI1001/genuiWebApp.git',
        live: 'https://genuiwebapp.onrender.com'
      },
      {
        title: 'Personal Portfolio',
        description: 'My personal portfolio project deployed on Render.',
        tech: ['React', 'Nodejs', 'Mongodb', 'Express'],
        github: 'https://github.com/ABBASALI1001/Portfolio_Frontend.git',
        live: 'https://portfolio-frontend-xxjt.onrender.com/'
      }
    ]);

    await Skill.insertMany([
      { name: "HTML/CSS", percentage: 85 },
      { name: "JavaScript", percentage: 80 },
      { name: "React.js", percentage: 75 },
      { name: "Node.js", percentage: 70 },
      { name: "Express.js", percentage: 70 },
      { name: "MongoDB", percentage: 65 },
      { name: "Tailwind CSS", percentage: 80 },
      { name: "Git/GitHub", percentage: 75 }
    ]);

    console.log("Data successfully Seeded! You can refresh your page now.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
