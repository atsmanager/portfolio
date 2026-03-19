import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
 name:String,
 percentage:Number
})

export default mongoose.model("Skill",skillSchema)
