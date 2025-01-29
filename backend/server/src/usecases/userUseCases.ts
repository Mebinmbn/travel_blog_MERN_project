import userRepository from "../repositories/userRepository";

export const getUser = async (id: string) => {
  try {
    return await userRepository.fetchUserDetails(id);
  } catch (error) {
    throw new Error("Error in fetching user details");
  }
};
