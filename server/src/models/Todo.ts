import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    status: {
      type: String,
      enum: ["Unfinished", "Done"],
      default: "Unfinished",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide user"],
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", TodoSchema);
