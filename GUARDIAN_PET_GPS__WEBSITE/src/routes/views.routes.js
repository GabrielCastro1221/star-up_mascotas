const { Router } = require("express");
const ViewsController = require("../controllers/views.controller");
const auth = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", ViewsController.renderIndex);
router.get("/tienda", ViewsController.renderStore);
router.get("/tienda/:id", ViewsController.renderProductDetail);
router.get("/rastrea-tu-mascota", ViewsController.renderFoundPet);
router.get("/contacto", ViewsController.renderContact);
router.get("/access-denied", ViewsController.renderAccessDenied);
router.get("/page-not-found", ViewsController.renderNotFound);
router.get("/login", ViewsController.renderLogin);
router.get("/register", ViewsController.renderRegister);
router.get("/reset-password", ViewsController.renderResetPass);
router.get("/change-password", ViewsController.renderChangePass);
router.get("/confirm", ViewsController.renderEmailConfirm);
router.get(
    "/perfil-usuario",
    auth.authenticate,
    auth.restrict(["user"]),
    ViewsController.renderProfileUser
);
/*router.get(
    "/perfil-admin",
    auth.authenticate,
    auth.restrict(["admin"]),
    ViewsController.renderProfileAdmin
);*/

module.exports = router;