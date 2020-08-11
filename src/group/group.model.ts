import * as mongoose from "mongoose";
import { IGroup, IServiceType, IRankType } from "./group.interface";

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    kartoffelID:{
      type: String,
      required:true,
      unique: true
    },
    ancestors: {
      // TODO: IMPLEMENT
    },
    children: {
      // TODO: implement
    },
    isMador: {
      type: Boolean,
      default: false, // TODO: check if there can be a default value with required state
    },
    unitName: {
      type: String
    },
    peopleSum: {
      type: Number,
      default: 0 // TODO: check if there can be a default value with required state
    },
    serviceType: {

    },
    rankType: {

    },
    assignedCount: {
      type: Number,
      default: 0 // TODO: check if there can be a default value with required state
    }
// TODO: to json 
);

export const GroupModel = mongoose.model<IGroup & mongoose.Document>(
  "group",
  groupSchema
);
