import { Schema, model } from 'mongoose';
import { ScheduleModel } from '../Interface/scheduleInterface'

export const scheduledSchema = new Schema<ScheduleModel>({
  monday: {
    type: String,
    required: true
  },
  tuesday: {
    type: String,
    required: true
  },
  wednesday: {
    type: String,
    required: true
  },
  thursday: {
    type: String,
    required: true
  },
  friday: {
    type: String,
    required: true
  },
  saturday: {
    type: String,
    required: true
  },
  sunday: {
    type: String,
    required: true
  },
})

export const Scheduled = model<ScheduleModel>('Scheduled', scheduledSchema);