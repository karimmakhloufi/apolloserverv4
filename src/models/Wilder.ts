import mongoose from "mongoose";

interface IWilder {
  name: string;
  city: string;
  skills: string[];
}

const Schema = mongoose.Schema;

// Type Schema with interface IWilder as a generic
const WilderSchema = new Schema<IWilder>({
  name: { type: String, required: true, unique: true },
  city: { type: String },
  skills: [{ title: String, votes: Number }],
});

export default mongoose.model("Wilder", WilderSchema);
