const Group = require("../../models/Group");
const User = require("../../models/User");

exports.groupCreate = async (req, res) => {
  req.body.admin = req.user._id;
  req.body.users = [req.user._id];

  try {
    const newGroup = await Group.create(req.body);
    await User.findByIdAndUpdate(req.user._id, {
      $push: { groups: newGroup._id },
    });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.groupDelete = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    await Group.findByIdAndDelete(groupId);
    res.status(204).end();
  } catch (error) {
    next(error);
    //res.status(500).json({ message: error.message });
  }
};

exports.groupUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    const { groupId } = req.params;
    await Group.findByIdAndUpdate(groupId, req.body, {
      new: true,
    }); //if it breaks remove new:true..
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const foundGroup = await Group.findById(groupId);
    console.log(
      "🚀 ~ file: groups.controls.js ~ line 53 ~ exports.fetchGroup= ~ foundGroup",
      foundGroup
    );
    console.log(
      "🚀 ~ file: groups.controls.js ~ line 53 ~ exports.fetchGroup= ~ groupId",
      groupId
    );
    res.status(201).json(foundGroup);
  } catch (error) {
    return error;
  }
};

//when fetching groups, we get the user object with each group
exports.groupGet = async (req, res) => {
  try {
    //pass userId
    let groups = await Group.find().populate("admin");
    groups = await Group.find().populate("users");

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
