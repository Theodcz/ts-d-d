import { JsonDB, Config } from "node-json-db";

const db = new JsonDB(new Config("characterDatabase", true, false, "/"));

export default db;
