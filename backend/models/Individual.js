import mongoose from "mongoose";

const IndividualSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true, trim: true },
    gender:         { type: String, enum: ["ذكر", "أنثى"], required: true },
    email:          { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:          { type: String, required: true, unique: true, trim: true },
    studyWork:      { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    age:            { type: String, required: true, trim: true }, // per spec: string
    skills:         { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Individual", IndividualSchema);