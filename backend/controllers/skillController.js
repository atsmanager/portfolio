import Skill from "../models/Skill.js"

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
    res.json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body)
    await skill.save()
    res.status(201).json(skill)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id)
    res.json({ message: "Skill deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
