// import TimeSlotsModel, { ITimeSlots } from "../models/timeSlotsModel";

// const createNewTimeSlotRecord = async (doctorId: string, slots: any) => {
//   try {
//     const timeSlots = slots.map((slot: any) => ({
//       doctor: doctorId,
//       date: new Date(slot.date),
//       timeSlots: slot.timeSlots.map((timeSlot: any) => ({
//         time: timeSlot.time,
//         isBooked: false,
//       })),
//     }));
//     console.log("time slots", timeSlots);
//     const existingSlot = await TimeSlotsModel.findOne({
//       doctor: doctorId,
//       date: { $in: timeSlots.map((slot: any) => slot.date) },
//     });

//     if (existingSlot) {
//       console.log("Existing time slot:", existingSlot);
//       throw new Error("Time slots already exist for one or more dates.");
//     }

//     const timeSlotsRecord = await TimeSlotsModel.insertMany(timeSlots);

//     return timeSlotsRecord;
//   } catch (error) {
//     throw new Error("Time slots already exist for one or more dates.");
//   }
// };

// export default { createNewTimeSlotRecord };
