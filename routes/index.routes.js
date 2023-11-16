const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/users", userRoutes);

const yearRoutes = require("./year.routes");
router.use("/years", yearRoutes);

const incomeRoutes = require("./income.routes");
router.use("/incomes", incomeRoutes);

const expenseRoutes = require("./expense.routes");
router.use("/expenses", expenseRoutes);

const budgetRoutes = require("./budget.routes");
router.use("/budgets", budgetRoutes);

const typeRoutes = require("./type.routes");
router.use("/types", typeRoutes);

const categoryRoutes = require("./category.routes");
router.use("/categories", categoryRoutes);

const subCategoryRoutes = require("./subcategory.routes");
router.use("/subcategories", subCategoryRoutes);

module.exports = router;
