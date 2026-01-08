const { Router } = require("express");
const ReviewController = require("../controllers/review.controller");

const router = Router();

router.post("/create", ReviewController.createReview);
router.get("/", ReviewController.getReviews);
router.get("/:id", ReviewController.getReview);
router.put("/update/:id", ReviewController.updateReview);
router.delete("/delete/:id", ReviewController.deleteReview);

module.exports = router;