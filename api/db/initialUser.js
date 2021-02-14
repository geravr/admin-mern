const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");

const createAdminUser = async () => {
  const adminUser = new User({
    firstName: "Admin",
    username: "admin",
    email: "admin@mail.com",
    password: process.env.ROOT_PASSWORD || "qwert12345",
    isActive: true,
    isAdmin: true
  });

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    adminUser.password = bcrypt.hashSync(adminUser.password, salt);

  await adminUser.save();
}

module.exports = { createAdminUser };