// Models
const Group = require("../models/Group");
const Permission = require("../models/Permission");

/*************** Main function ***************/
const createInitialRoles = async () => {
  await readOnly();
  await editor();
};

/*************** Roles ***************/
const readOnly = async () => {
  const readPermissions = await Permission.find({ name: /read/i }, "id");
  try {
    const newGroup = new Group({
      name: "readOnly",
      description: "Rol con permisos de solo lectura",
      permissions: readPermissions,
    });
    await newGroup.save();
  } catch (error) {
    console.log(error);
  }
};

const editor = async () => {
  const editorPermissions = await Permission.find({ name: /add|read|edit/i }, "id");
  try {
    const newGroup = new Group({
      name: "editor",
      description: "Rol con permisos de creación, lectura y edición",
      permissions: editorPermissions,
    });
    await newGroup.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createInitialRoles };
