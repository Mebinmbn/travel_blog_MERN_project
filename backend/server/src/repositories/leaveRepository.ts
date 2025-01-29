// import LeaveModel, { ILeave } from "../models/leaveModel";

// const checkExistingLeaveApplication = async (leaveData: ILeave) => {
//   return await LeaveModel.findOne({
//     doctorId: leaveData.doctorId,
//     startDate: leaveData.startDate,
//     endDate: leaveData.endDate,
//   });
// };

// const leaveApplication = async (leaveData: {}) => {
//   try {
//     console.log("leave repo", leaveData);
//     const leave = new LeaveModel(leaveData);
//     await leave.save();
//     console.log("leave repo", leave);
//     return leave;
//   } catch (error) {
//     throw new Error("Error in applying leave");
//   }
// };

// const findAllRequests = async (page: number, limit: number) => {
//   const requests = await LeaveModel.find({ status: "Pending" })
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .populate("doctorId")
//     .sort({ createdAt: -1 });
//   const totalDocs = await LeaveModel.countDocuments();
//   const totalPages = Math.ceil(totalDocs / limit);
//   console.log("requests", requests);
//   return { requests, totalDocs, totalPages };
// };

// const updateLeaveStatus = async (id: string, status: string) => {
//   try {
//     console.log("Update status leave repo", id, status);
//     const leave = await LeaveModel.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );
//     console.log(leave);
//     if (!leave) {
//       throw new Error("Leave request not found");
//     }
//     return leave;
//   } catch (error) {
//     throw new Error("Error in leave status updation");
//   }
// };

// const findDoctorLeaves = async (id: string) => {
//   try {
//     const leaves = await LeaveModel.find({ doctorId: id });
//     console.log("leaves in leav repo", leaves);
//     return leaves;
//   } catch (error) {
//     throw new Error("Error in fetching leaves");
//   }
// };

// export default {
//   leaveApplication,
//   checkExistingLeaveApplication,
//   findAllRequests,
//   updateLeaveStatus,
//   findDoctorLeaves,
// };
