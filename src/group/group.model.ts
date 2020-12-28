import mongoose from 'mongoose';
import { IGroup } from './group.interface';

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
  hierarchy: {
    type: [String],
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
    miluimSum: {
      type: Number,
      default: 0,
      required: true,
    },
    civilianSum: {
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
    hovaSum: {
      type: Number,
      default: 0,
      required: true,
    },
    miluimSum: {
      type: Number,
      default: 0,
      required: true,
    },
    civilianSum: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  assignedCount: {
    type: Number,
    default: 0,
    required: true,
  }
});

// Virtual populate, we need to use this way because we populated children not by their mongo _id, but by the kartoffelID
// populate from group schema (ref) from localfield children
groupSchema.virtual('childrenPopulated', { ref: 'group', localField: 'children', foreignField: 'kartoffelID' });

export const GroupModel = mongoose.model<IGroup & mongoose.Document>('group', groupSchema);
