import userServiceClient from "./userServiceClient.js";

const getAdmins = async () => {
  try {
    const response = await userServiceClient.get("api/users/internal/admins");

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch admins from User Service:", error.message);

    throw new Error("Unable to retrieve admins");
  }
};

export { getAdmins };
