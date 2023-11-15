const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Income = require("../models/Income.model");
const Year = require("../models/Year.model");

//CREATE NEW INCOME
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const yearId = req.body.year;
    const income = { ...req.body };
    const newIncome = await Income.create(income);
    await Year.findByIdAndUpdate(yearId, {
      $push: { income: newIncome._id },
    });
    res.status(201).json({ income: newIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// UPDATE SPECIFIC INCOME
router.put("/:incomeId", isAuthenticated, async (req, res) => {
  const { incomeId } = req.params;
  try {
    const updatedIncome = await Income.findByIdAndUpdate(incomeId, req.body, {
      new: true,
    });
    res.status(200).json({ income: updatedIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE SPECIFIC INCOME
router.delete("/:incomeId", isAuthenticated, async (req, res) => {
  const { incomeId } = req.params;
  try {
    const currentIncome = await Income.findById(incomeId);
    await Income.findByIdAndDelete(incomeId);
    await Year.findByIdAndUpdate(currentIncome.year, {
      $pull: { income: incomeId },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL THE INCOMES FOR SPECIFIC YEAR
router.get("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const yearIncomes = await Income.find({ year: yearId }).populate({
      path: "category",
      model: "Category",
      populate: { path: "subcategory", model: "Subcategory" },
    });
    res.json(yearIncomes);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
