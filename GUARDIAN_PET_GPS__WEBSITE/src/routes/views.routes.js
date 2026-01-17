const { Router } = require("express");
const ViewsController = require("../controllers/views.controller");
const auth = require("../middlewares/auth.middleware");

const router = Router();

router.get("/login", ViewsController.renderLogin);
router.get("/register", ViewsController.renderRegister);
router.get("/reset-password", ViewsController.renderResetPass);
router.get("/change-password", ViewsController.renderChangePass);
router.get("/confirm", ViewsController.renderEmailConfirm);
router.get("/", ViewsController.renderIndex);
router.get("/tienda", ViewsController.renderStore);
router.get("/tienda/:id", ViewsController.renderProductDetail);
router.get("/datos-de-envio", ViewsController.renderRegisterGuest);
router.get("/cart/:id", ViewsController.renderCart);
router.get("/ticket/:id", ViewsController.renderTicket);
router.get("/rastrea-tu-mascota", ViewsController.renderFoundPet);
router.get("/contacto", ViewsController.renderContact);
router.get("/access-denied", ViewsController.renderAccessDenied);
router.get("/page-not-found", ViewsController.renderNotFound);
router.get("/perfil-usuario", auth.authenticate, auth.restrict(["user"]), ViewsController.renderProfileUser);
router.get("/perfil-admin", auth.authenticate, auth.restrict(["admin"]), ViewsController.renderProfileAdmin);
router.get("/dashboard", auth.authenticate, auth.restrict(["admin"]), ViewsController.renderAdminDashboard);

module.exports = router;