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

export const consultAuthServiceOfTransactions = async () => {
  try {
    const response = await axios.get(
      "https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6"
    );
    return response.data;
  } catch (error) {
    throw new HttpError(401, "Auth service closed");
  }
};
