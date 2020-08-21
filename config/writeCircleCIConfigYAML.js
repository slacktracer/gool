import fs from "fs";
import ejs from "ejs";
import util from "util";

import { name } from "../package.json";

const finalFile = "./.circleci/config.yml";

const renderFile = util.promisify(ejs.renderFile);

const templateFile = "./.circleci/config.yml.template";

const writeFile = util.promisify(fs.writeFile);

async function writeCircleCIConfigYAML() {
  if (name === undefined) {
    console.error("You must set the name property on the package.json file");

    return process.exit(0);
  }

  const data = {
    projectName: name.toUpperCase(),
  };

  try {
    const finalString = await renderFile(templateFile, data);

    await writeFile(finalFile, finalString);

    console.info("npm run config done!");
  } catch (error) {
    console.error(error);
  }
}

writeCircleCIConfigYAML();
