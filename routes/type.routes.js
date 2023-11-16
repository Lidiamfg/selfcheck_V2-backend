const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Type = require("../models/Type.model");
/* const User = require("../models/User.model"); */

//CREATE A NEW TYPE WITH ITS RESPECTIVE USER ID
router.post("/", isAuthenticated, async (req, res) => {
  try {
    /* const userId = req.body.user; */
    const type = { ...req.body }; // <= the user Id is being supplied in the post at the frontend
    const newType = await Type.create(type);
    res.status(201).json({ type: newType });
    /* await User.findByIdAndUpdate(userId, {
      $push: { year: newYear._id },
    }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

//UPDATE A SPECIFIC TYPE
router.put("/:typeId", isAuthenticated, async (req, res) => {
  const { typeId } = req.params;
  try {
    const updatedType = await Type.findByIdAndUpdate(typeId, req.body, {
      new: true,
    });
    res.status(200).json({ type: updatedType });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE A SPECIFIC TYPE
router.delete("/:typeId", isAuthenticated, async (req, res) => {
  const { typeId } = req.params;
  try {
    /*  const currentYear = await Year.findById(yearId); */
    await Type.findByIdAndDelete(typeId);
    /* await User.findByIdAndUpdate(currentYear.user, {
      $pull: { year: yearId },
    }); */
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL TYPES OF THE USER
router.get("/user/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const types = await Type.find({
      $or: [{ user: userId }, { user: { $exists: false } }], // <= TO FIND TYPES WITH USER ID AND WITHOUT USER ID
    });
    res.json(types);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
