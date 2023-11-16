const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Category = require("../models/Category.model");

//CREATE A NEW CATEGORY WITH ITS RESPECTIVE USER ID
router.post("/", isAuthenticated, async (req, res) => {
  try {
    /* const userId = req.body.user; */
    const category = { ...req.body }; // <= the user Id is being supplied in the post at the frontend
    const newCategory = await Category.create(category);
    res.status(201).json({ category: newCategory });
    /* await User.findByIdAndUpdate(userId, {
      $push: { year: newYear._id },
    }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

//UPDATE A SPECIFIC CATEGORY
router.put("/:categoryId", isAuthenticated, async (req, res) => {
  const { categoryId } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE A SPECIFIC CATEGORY
router.delete("/:categoryId", isAuthenticated, async (req, res) => {
  const { categoryId } = req.params;
  try {
    /*  const currentYear = await Year.findById(yearId); */
    await Category.findByIdAndDelete(categoryId);
    /* await User.findByIdAndUpdate(currentYear.user, {
      $pull: { year: yearId },
    }); */
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL CATEGORY OF THE USER AND OF SPECIFIC TYPE
router.get("/type/:typeId/user/:userId/", isAuthenticated, async (req, res) => {
  const { typeId, userId } = req.params;
  try {
    const categories = await Category.find({
      $and: [
        { $or: [{ user: userId }, { user: { $exists: false } }] }, // <= TO FIND TYPES WITH USER ID AND WITHOUT USER ID
        { typeIE: typeId }, // <= AND WITH OF A SPECIFIC TYPE
      ],
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
