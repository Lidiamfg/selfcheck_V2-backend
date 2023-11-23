const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Expense = require("../models/Expense.model");
const Year = require("../models/Year.model");

//CREATE NEW EXPENSE
router.post("/", isAuthenticated, async (req, res) => {
  try {
    /* const yearId = req.body.year; */
    const expense = { ...req.body };
    const newExpense = await Expense.create(expense);
    /* await Year.findByIdAndUpdate(yearId, {
      $push: { expense: newExpense._id },
    }); */
    res.status(201).json({ expense: newExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL THE EXPENSES
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const expenses = await Expense.find({})
      .populate("year")
      .populate("category")
      .populate("subcategory");
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// UPDATE SPECIFIC EXPENSE
router.put("/:expenseId", isAuthenticated, async (req, res) => {
  const { expenseId } = req.params;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ expense: updatedExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE SPECIFIC EXPENSE
router.delete("/:expenseId", isAuthenticated, async (req, res) => {
  const { expenseId } = req.params;
  try {
    /* const currentExpense = await Expense.findById(expenseId); */
    await Expense.findByIdAndDelete(expenseId);
    /* await Year.findByIdAndUpdate(currentExpense.year, {
      $pull: { expense: expenseId },
    }); */
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL THE EXPENSES FOR SPECIFIC YEAR
router.get("/year/:yearId", isAuthenticated, async (req, res) => {
  const { yearId } = req.params;
  try {
    const yearExpenses = await Expense.find({ year: yearId });
    res.json(yearExpenses);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
