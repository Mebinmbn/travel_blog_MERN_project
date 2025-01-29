import { Request, Response } from "express";
import { getUser } from "../usecases/userUseCases";

const user = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
    console.log("user", user);
    if (user) {
      res.status(200).json({
        success: true,
        user,
        message: "user detials collected successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export default { user };
