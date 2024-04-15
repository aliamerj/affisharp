import { env } from "process";

export const SERVERURL = env.SERVER_URL || "http://localhost:8080";
export const SERVERCALL = env.SERVER_CALL || "http://server:8080";
