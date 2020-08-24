import mongoose from "mongoose";
import { IGroup } from "./group.interface";

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kartoffelID: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: String,
    required: true,
    default: null,
  },
  ancestors: {
    type: [String],
    default: [],
    required: true,
  },
  children: {
    type: [String],
    default: [],
    required: true,
  },
  isMador: {
    type: Boolean,
    default: false,
    required: true,
  },
  unitName: {
    type: String,
  },
  peopleSum: {
    type: Number,
    default: 0,
    required: true,
  },
  serviceType: {
    kevaSum: {
      type: Number,
      default: 0,
      required: true,
    },
    hovaSum: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  rankType: {
    aSum: {
      type: Number,
      default: 0,
      required: true,
    },
    bSum: {
      type: Number,
      default: 0,
      required: true,
    },
    cSum: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  assignedCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

groupSchema.virtual("childrenGroup", { ref: "group", localField: "children", foreignField: "kartoffelID" });

export const GroupModel = mongoose.model<IGroup & mongoose.Document>("group", groupSchema);
