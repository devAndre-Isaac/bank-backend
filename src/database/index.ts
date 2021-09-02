import { Connection, createConnection } from "typeorm";

const connection = async (): Promise<Connection> => {
  return createConnection();
};

export { connection };