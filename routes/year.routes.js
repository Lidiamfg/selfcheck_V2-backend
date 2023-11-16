const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Year = require("../models/Year.model");
/* const User = require("../models/User.model"); */

//CREATE A NEW YEAR WITH ITS RESPECTIVE USER ID
router.post("/", isAuthenticated, async (req, res) => {
  try {
    /* const userId = req.body.user; */
    const year = { ...req.body }; // <= the user Id is being supplied in the post at the frontend
    const newYear = await Year.create(year);
    res.status(201).json({ year: newYear });
    /* await User.findByIdAndUpdate(userId, {
      $push: { year: newYear._id },
    }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

//GET A SPECIFIC YEAR
router.get("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const oneYear = await Year.findById(yearId);
    res.json(oneYear);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//UPDATE A SPECIFIC YEAR
router.put("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const updatedYear = await Year.findByIdAndUpdate(yearId, req.body, {
      new: true,
    });
    res.status(200).json({ year: updatedYear });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE A SPECIFIC YEAR
router.delete("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    /*  const currentYear = await Year.findById(yearId); */
    await Year.findByIdAndDelete(yearId);
    /* await User.findByIdAndUpdate(currentYear.user, {
      $pull: { year: yearId },
    }); */
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL YEARS OF THE USER
router.get("/user/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const years = await Year.find({ user: userId });
    res.json(years);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
