const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Subcategory = require("../models/Subcategory.model");

//CREATE A NEW SUBCATEGORY WITH ITS RESPECTIVE USER ID
router.post("/", isAuthenticated, async (req, res) => {
  try {
    /* const userId = req.body.user; */
    const subCategory = { ...req.body }; // <= the user Id is being supplied in the post at the frontend
    const newSubCategory = await Subcategory.create(subCategory);
    res.status(201).json({ subcategory: newSubCategory });
    /* await User.findByIdAndUpdate(userId, {
      $push: { year: newYear._id },
    }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

//UPDATE A SPECIFIC SUBCATEGORY
router.put("/:subcategoryId", isAuthenticated, async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    const updatedSubCategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ subcategory: updatedSubCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//DELETE A SPECIFIC SUBCATEGORY
router.delete("/:subcategoryId", isAuthenticated, async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    /*  const currentYear = await Year.findById(yearId); */
    await Subcategory.findByIdAndDelete(subcategoryId);
    /* await User.findByIdAndUpdate(currentYear.user, {
      $pull: { year: yearId },
    }); */
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//GET ALL SUBCATEGORY OF THE USER AND OF SPECIFIC CATEGORY
router.get(
  "/category/:categoryId/user/:userId/",
  isAuthenticated,
  async (req, res) => {
    const { categoryId, userId } = req.params;
    try {
      const subCategories = await Subcategory.find({
        $and: [
          { $or: [{ user: userId }, { user: { $exists: false } }] }, // <= TO FIND TYPES WITH USER ID AND WITHOUT USER ID
          { category: categoryId }, // <= AND WITH OF A SPECIFIC CATEGORY
        ],
      });
      res.json(subCategories);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
);

module.exports = router;
