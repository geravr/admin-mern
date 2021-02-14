const fs = require("fs");

// Models
const Permission = require("../models/Permission");

/*************** Variables ***************/
const permissions = ["Can add", "Can read", "Can edit", "Can delete"];

// Models that should not be created
const modelsToIgnore = ["Permission"];

/*************** Main function ***************/
const createInitalPermitions = async () => {
  const modelFilesFound = findModelsFiles();

  modelFilesFound.map((file) => {
    const modelName = removeExtension(file.name);
    if (modelsToIgnore.includes(modelName)) {
      return;
    }
    permissions.map(async (permission) => {
      const permissionName = `${permission} - ${modelName}s`;
      createPermission(permissionName);
    });
  });
};

/*************** Helpers ***************/
const removeExtension = string => string.split(".").slice(0, -1).join(".");

const findModelsFiles = () => {
  return fs
    .readdirSync("./models/", { withFileTypes: true })
    .filter((file) => !file.isDirectory());
};

const createPermission = async (name) => {
  try {
    const newPermission = new Permission({ name });
    await newPermission.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createInitalPermitions };
