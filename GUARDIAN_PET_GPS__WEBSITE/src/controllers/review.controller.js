const ReviewRepository = require("../repositories/review.repository");

class ReviewController {
    async createReview(req, res) {
        try {
            const reviewData = req.body;
            const newReview = await ReviewRepository.createReview(reviewData);
            await MailerController.sendProductReviewEmail(user, product, newReview);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getReviews(req, res) {
        try {
            const { productId } = req.query;
            const reviews = await ReviewRepository.getReviews(productId);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReview(req, res) {
        try {
            const { id } = req.params;
            const review = await ReviewRepository.getReview(id);
            if (!review) {
                return res.status(404).json({ message: "Reseña no encontrada" });
            }
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateReview(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedReview = await ReviewRepository.updateReview(id, updateData);
            if (!updatedReview) {
                return res.status(404).json({ message: "Reseña no encontrada" });
            }
            res.status(200).json(updatedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteReview(req, res) {
        try {
            const { id } = req.params;
            const deletedReview = await ReviewRepository.deleteReview(id);
            if (!deletedReview) {
                return res.status(404).json({ message: "Reseña no encontrada" });
            }
            res.status(200).json({ message: "Reseña eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ReviewController();
