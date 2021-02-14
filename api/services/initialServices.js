// Models
const Permission = require("../models/Permission");
const Group = require("../models/Group");
const User = require("../models/User");

const { createInitalPermitions } = require("../db/initialPermissions");
const { createInitialRoles } = require("../db/initialGroups");
const { createAdminUser } = require("../db/initialUser");

const rolesPermissions = async () => {
  /*************** Permissions ***************/
  const permissionsExist = (await Permission.find()).length > 0;
  if (!permissionsExist) {
    await createInitalPermitions();
  }

  /*************** Roles ***************/
  const rolesExist = (await Group.find()).length > 0;
  if (!rolesExist) {
    await createInitialRoles();
  }

  /*************** Root user ***************/
  const userExist = (await User.find()).length > 0;
  if (!userExist) {
    await createAdminUser()
  }
};

module.exports = { rolesPermissions };
