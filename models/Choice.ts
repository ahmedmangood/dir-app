import { Choice } from "@/interfaces";
import { Schema, model, models } from "mongoose";

const ChoiceSchema = new Schema<Choice>({
  name: { type: String, required: true },
  steps: [{ type: String }],
  image: { type: String },
});

export default models.Choice || model<Choice>("Choice", ChoiceSchema);
