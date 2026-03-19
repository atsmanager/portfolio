import Section from "../models/Section.js";

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSection = async (req, res) => {
  console.log("HIT UPDATE SECTION! id:", req.params.id);
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json(section);
  } catch (error) {
    console.error("updateSection error:", error.message);
    res.status(400).json({ message: "XYZ_UPDATE " + error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json({ message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderSections = async (req, res) => {
  console.log("HIT REORDER SECTIONS!");
  try {
    const { sections } = req.body;
    if (!sections || !Array.isArray(sections)) {
      console.error("reorderSections invalid payload:", req.body);
      return res.status(400).json({ message: "XYZ_REORDER Invalid sections payload" });
    }
    const bulkOps = sections.map(sec => ({
      updateOne: {
        filter: { _id: sec.id },
        update: { order: sec.order }
      }
    }));
    await Section.bulkWrite(bulkOps);
    res.json({ message: "Sections reordered successfully" });
  } catch (error) {
    console.error("reorderSections error:", error.message);
    res.status(500).json({ message: "XYZ_REORDER " + error.message });
  }
};
