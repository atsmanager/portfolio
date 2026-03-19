import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create a default profile if none exists
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  console.log("Updating Profile with data:", JSON.stringify(req.body, null, 2));
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    } else {
      profile = await Profile.create(req.body);
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
