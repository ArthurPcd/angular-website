import {ScheduleDayModel} from '../models/scheduleDay';

interface ScheduleDayDetail {
  day: string;
  morning: { open: string; close: string };
  afternoon: { open: string; close: string };
  closed: boolean;
}

async function updateScheduleDay(day: ScheduleDayDetail) {
  try {
    const dayDb = await ScheduleDayModel.findOne({"day": `${day.day}`}).exec();
    dayDb.openMorning = day.morning.open;
    dayDb.closeMorning = day.morning.close;
    dayDb.openAfternoon = day.afternoon.open;
    dayDb.closeAfternoon = day.afternoon.close;
    dayDb.closed = day.closed;
    await dayDb.save();
  } catch (error) {
    console.error('Unable to update day schedule', error);
  }
}

export {updateScheduleDay};
