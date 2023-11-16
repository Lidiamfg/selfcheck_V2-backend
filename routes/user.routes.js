const { isAuthenticated } = require("../middlewares/routeGuard.middleware");
const router = require("express").Router();
const User = require("../models/User.model");

//GET SPECIFIC USER
router.get("/:userdId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;

  try {
    const oneUser = await User.findById(userId);
    const userCopy = oneUser._doc;
    delete userCopy.passwordHash; //<= delete the password from the inspect
    res.status(200).json({ user: userCopy });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//DELETE SPECIFIC USER
router.delete("/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
