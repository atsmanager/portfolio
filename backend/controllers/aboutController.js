import About from "../models/About.js";

// @desc    Get about section
// @route   GET /api/about
// @access  Public
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update about section
// @route   PUT /api/about
// @access  Private/Admin
export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      about.aboutTitle = req.body.aboutTitle || about.aboutTitle;
      about.aboutDescription = req.body.aboutDescription || about.aboutDescription;
      about.aboutCards = req.body.aboutCards || about.aboutCards;
    }
    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
