import axios from "axios";
import { HttpError } from "./errors/HttpError";

export const consultAuthServiceOfMail = async () => {
  try {
    const response = await axios.get("http://o4d9z.mocklab.io/notify");
    return response.data;
  } catch (error) {
    throw new HttpError(401, "Auth service closed");
  }
};
