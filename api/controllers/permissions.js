const { response } = require("express");

// Models
const Permission = require("../models/Permission");

/*************** GET - list ***************/
const getPermissions = async (req, res = response) => {
  // Query filters
  const { limit = 10, page = 1, name } = req.query;
  const count = await Permission.countDocuments();
  const totalPages = Math.ceil(count / limit);
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  try {
    const permissions = await Permission.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res.json({
      count,
      totalPages,
      results: permissions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

module.exports = { getPermissions };
