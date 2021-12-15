import { readdir, writeFile } from "fs";
import { promisify } from "util";

export const promiseReadDir = promisify(readdir);
export const promiseWriteFile = promisify(writeFile);
