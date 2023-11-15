const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

const yearRoutes = require("./year.routes");
router.use("/year", yearRoutes);

module.exports = router;
