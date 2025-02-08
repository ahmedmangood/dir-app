import mongoose, { Schema, model, models } from "mongoose";

export interface IDirection {
  choiceId: mongoose.Types.ObjectId;
  steps: string[];
}

const DirectionSchema = new Schema<IDirection>({
  choiceId: { type: Schema.Types.ObjectId, ref: "Choice", required: true },
  steps: [{ type: String, required: true }],
});

export default models.Direction ||
  model<IDirection>("Direction", DirectionSchema);
