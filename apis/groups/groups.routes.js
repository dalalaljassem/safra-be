const express = require("express");
const router = express.Router();
const passport = require("passport");
// const upload = require("../../middleware/multer");

const {
  groupGet,
  groupUpdate,
  groupDelete,
  groupCreate,
  fetchGroup,
} = require("./groups.controls");

router.get("/", groupGet);
router.get("/:groupId", fetchGroup);
router.post("/", passport.authenticate("jwt", { session: false }), groupCreate);
router.delete("/:groupId", groupDelete);
router.put("/:groupId", groupUpdate);

module.exports = router;
