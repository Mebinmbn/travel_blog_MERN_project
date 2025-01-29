import UserModel from "../models/userModel";

const fetchUserDetails = async (id: string) => {
  try {
    return await UserModel.findOne({ _id: id });
  } catch (error) {
    throw new Error("Error in fetching user details");
  }
};

export default { fetchUserDetails };
