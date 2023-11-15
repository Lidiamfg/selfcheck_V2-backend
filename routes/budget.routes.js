const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Budget = require("../models/Budget.model");
const Year = require("../models/Year.model");

//CREATE NEW BUDGET
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const yearId = req.body.year;
    const budget = { ...req.body };
    const newBudget = await Budget.create(budget);
    await Year.findByIdAndUpdate(yearId, {
      $push: { budget: newBudget._id },
    });
    res.status(201).json({ budget: newBudget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// UPDATE SPECIFIC BUDGET
router.put("/:budgetId", isAuthenticated, async (req, res) => {
  const { budgetId } = req.params;
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(budgetId, req.body, {
      new: true,
    });
    res.status(200).json({ budget: updatedBudget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE SPECIFIC BUDGET
router.delete("/:budgetId", isAuthenticated, async (req, res) => {
  const { budgetId } = req.params;
  try {
    const currentBudget = await Budget.findById(budgetId);
    await Budget.findByIdAndDelete(budgetId);
    await Year.findByIdAndUpdate(currentBudget.year, {
      $pull: { budget: budgetId },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL THE BUDGETS FOR SPECIFIC YEAR
router.get("/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const yearBudgets = await Budget.find({ year: yearId }).populate({
      path: "category",
      model: "Category",
      populate: { path: "subcategory", model: "Subcategory" },
    });
    res.json(yearBudgets);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
