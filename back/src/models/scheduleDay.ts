import {model, Schema} from 'mongoose';

interface IScheduleDayModel {
  _id?: string;
  day: string;
  openMorning: string;
  closeMorning: string;
  openAfternoon: string;
  closeAfternoon: string;
  closed: boolean;
}

const schema = new Schema<IScheduleDayModel>({
  day: {
    type: String,
    required: true,
  },
  openMorning: {
    type: String,
    required: true,
  },
  closeMorning: {
    type: String,
    required: true,
  },
  openAfternoon: {
    type: String,
    required: true,
  },
  closeAfternoon: {
    type: String,
    required: true,
  },
  closed: {
    type: Boolean,
    required: true,
  },
});

const ScheduleDayModel = model<IScheduleDayModel>('ScheduleDayModel', schema);

export type {IScheduleDayModel};
export {ScheduleDayModel};
