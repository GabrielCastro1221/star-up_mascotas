const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/cloudinary.middleware");
const router = Router();

router.post("/create", UserController.createUser);
router.get("/", UserController.getUsers);
router.get(
    "/profile/me",
    auth.authenticate,
    auth.restrict(["user", "admin"]),
    UserController.getUserProfile
);
router.get("/:userId/pets", UserController.getUserPets);
router.put(
    "/update/:id",
    upload.single("foto"),
    UserController.updateUser
);
router.put("/user/:id", UserController.changeRolUser);
router.put("/admin/:id", UserController.changeRolAdmin);
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;