import * as mongoose from "mongoose";
import { IGroup } from "./group.interface";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kartoffelID: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  ancestors: {
    type: [{ type: ObjectId, ref: "group" }],
    default: [],
    required: true,
  },
  children: {
    type: [{ type: ObjectId, ref: "group" }],
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

export const GroupModel = mongoose.model<IGroup & mongoose.Document>(
  "group",
  groupSchema
);
