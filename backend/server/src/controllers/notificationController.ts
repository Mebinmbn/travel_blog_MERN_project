// import { Request, Response } from "express";
// import {
//   getAllNotifications,
//   markNotificationsAsRead,
// } from "../usecases/notificationUseCases";

// const getNotifications = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const notifications = await getAllNotifications(id);
//     if (notifications) {
//       res.status(200).json({
//         success: true,
//         notifications,
//         message: "Notifications fetched successfully",
//       });
//     }
//   } catch (error: any) {
//     const errorMessage = error.message || "An unexpected error occurred";
//     res.status(400).json({ success: false, error: errorMessage });
//   }
// };

// const markAsRead = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const response = await markNotificationsAsRead(id);
//     if (response) {
//       res
//         .status(200)
//         .json({ success: true, message: "Request excecuted successfully" });
//     }
//   } catch (error: any) {
//     const errorMessage = error.message || "An unexpected error occurred";
//     res.status(400).json({ success: false, error: errorMessage });
//   }
// };

// export default { getNotifications, markAsRead };
