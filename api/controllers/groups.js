const { response } = require("express");

// Models
const Group = require("../models/Group");

/*************** GET - list ***************/
const getGroups = async (req, res = response) => {
  // Query filters
  const { limit = 10, page = 1, name } = req.query;
  const count = await Group.countDocuments();
  const totalPages = Math.ceil(count / limit);
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  try {
    const groups = await Group.find(query)
      .populate("permissions", "name")
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return res.json({
      count,
      totalPages,
      results: groups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** GET - detail ***************/
const getGroup = async (req, res = response) => {
  const groupID = req.params.id;

  try {
    const group = await Group.findById(groupID);

    if (!group) {
      return res.status(404).json({
        msg: "Group not found.",
      });
    }

    return res.json({
      results: [group],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** POST ***************/
const createGroup = async (req, res = response) => {
  const { name } = req.body;

  try {
    const nameExist = await Group.findOne({ name });

    if (nameExist) {
      return res.status(400).json({
        msg: "This name is already in use.",
      });
    }

    const group = new Group(req.body);

    await group.save();

    res.status(201).json({
      uid: group.id,
      name: group.name,
      description: group.description,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** PATCH ***************/
const updateGroup = async (req, res = response) => {
  const groupID = req.params.id;
  const groupDataToUpdate = req.body;

  try {
    const groupToUpdate = await Group.findById(groupID);

    if (!groupToUpdate) {
      return res.status(404).json({
        msg: "Group not found.",
      });
    }
    const groupUpdated = await Group.findByIdAndUpdate(
      groupID,
      groupDataToUpdate,
      {
        new: true,
      }
    );
    return res.json({
      groupUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

/*************** DELETE ***************/
const deleteGroup = async (req, res = response) => {
  const groupID = req.params.id;

  try {
    const groupToDelete = await Group.findById(groupID);

    if (!groupToDelete) {
      return res.status(404).json({
        msg: "Group not found.",
      });
    }
    await Group.findByIdAndDelete(groupID);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong, please contact an administrator.",
    });
  }
};

module.exports = { getGroups, getGroup, createGroup, updateGroup, deleteGroup };
