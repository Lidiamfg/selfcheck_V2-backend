const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Year = require("../models/Year.model");
const User = require("../models/User.model");

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

/* //GET A SPECIFIC YEAR
router.get("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const oneYear = await Year.findById(yearId)
      .populate({
        path: "income",
        model: "Income",
        populate: { path: "category", model: "Category" },
      })
      .populate({
        path: "expense",
        model: "Expense",
        populate: { path: "category", model: "Category" },
      })
      .populate({ path: "budget", model: "Budget" });
    res.json(oneYear);
  } catch (error) {
    res.status(500).json({ error });
  }
});
 */
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

router.delete("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const currentYear = await Year.findById(yearId);
    await Year.findByIdAndDelete(yearId);
    await User.findByIdAndUpdate(currentYear.user, {
      $pull: { year: yearId },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL YEARS OF THE USER
router.get("/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const oneYear = await Year.find({ user: userId })
      .populate({
        path: "income",
        model: "Income",
        populate: { path: "category", model: "Category" },
      })
      .populate({
        path: "expense",
        model: "Expense",
        populate: { path: "category", model: "Category" },
      })
      .populate({ path: "budget", model: "Budget" });
    res.json(oneYear);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
