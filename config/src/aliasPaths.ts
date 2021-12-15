import { lstatSync } from "fs";
import { resolve } from "path";

import { promiseReadDir, promiseWriteFile } from "./utils";

interface PATH_ALIAS {
  name: string;
  path: string;
}

export const getSrcDirs = async (): Promise<PATH_ALIAS[]> => {
  const dirContent = await promiseReadDir(resolve(__dirname, "../../src"));

  const dirs = await Promise.all(
    dirContent
      .filter((dir) =>
        lstatSync(resolve(__dirname, "../../src", dir)).isDirectory()
      )
      .map((dir) => ({ name: `@${dir}`, path: dir }))
  );

  await promiseWriteFile(
    resolve(__dirname, "PATH_ALIASES.json"),
    JSON.stringify(dirs)
  );

  return dirs;
};

export const setupPathsAlias = async () => {
  const PATH_ALIASES = await getSrcDirs();

  const tsconfigBase = {
    compilerOptions: {
      baseUrl: "./src",
      paths: PATH_ALIASES.reduce(
        (acc, { name, path }) => ({ ...acc, [name]: [`./${path}`] }),
        {}
      ),
    },
  };

  await promiseWriteFile(
    resolve(__dirname, "../..", "tsconfig.base.json"),
    JSON.stringify(tsconfigBase)
  );
};
