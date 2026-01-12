const ConfigPageRepository = require("../repositories/configPage.repository");
const GuardianPetConfigRepository = require("../repositories/guardianPetConfig.repository");
const ProductRepository = require("../repositories/product.repository");
const CategoryRepository = require("../repositories/category.repository");
const CartRepository = require("../repositories/cart.repository");
const ShippingRepository = require("../repositories/shipping.repository");
const TicketRepository = require("../repositories/ticket.repository");

class ViewController {
    renderIndex = async (req, res) => {
        try {
            const pageInfo = await ConfigPageRepository.findAll();
            const CompanyInfo = await GuardianPetConfigRepository.findAll();
            res.render("index", { pageInfo, CompanyInfo });
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderStore = async (req, res) => {
        try {
            const categories = await CategoryRepository.getCategories();
            res.render("store", { categories });
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderProductDetail = async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await ProductRepository.getProductById(productId);
            if (!product) {
                return res.redirect("/page-not-found");
            }
            const reviews = await ProductRepository.getProductReviews(productId) || [];
            const features = await ProductRepository.getProductFeatures(productId) || [];
            res.render("productDetail", { product, reviews, features });
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderCart = async (req, res) => {
        try {
            const cartId = req.params.id;
            const cart = await CartRepository.getCartById(cartId);
            const shipping = await ShippingRepository.getShipping();
            if (!shipping) {
                res.status(404).json({ status: false, message: "no hay disponibilidad de encios en el momento, intentanlo mas tarde" });
            }
            if (!cart) {
                return res.redirect("/page-not-found");
            }
            const subtotal = cart.products.reduce((acc, item) => {
                return acc + item.product.price * item.quantity;
            }, 0);
            res.render("cart", { cart, subtotal, shipping });
        } catch (error) {
            res.redirect("/page-not-found");
        }
    };

    renderTicket = async (req, res) => {
        try {
            const ticketId = req.params.id;
            const ticket = await TicketRepository.getTicketById(ticketId);
            if (!ticket) {
                return res.redirect("/page-not-found");
            }
            res.render("ticket", { ticket });
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderFoundPet = (req, res) => {
        try {
            res.render("foundPet");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderContact = async (req, res) => {
        try {
            const CompanyInfo = await GuardianPetConfigRepository.findAll();
            res.render("contact", { CompanyInfo });
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderNotFound = (req, res) => {
        try {
            res.render("pageNotFound");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderAccessDenied = (req, res) => {
        try {
            res.render("accessDenied");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderLogin = (req, res) => {
        try {
            res.render("login");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderRegister = (req, res) => {
        try {
            res.render("register");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderResetPass = (req, res) => {
        try {
            res.render("resetPass");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderChangePass = (req, res) => {
        try {
            res.render("changePass");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderEmailConfirm = (req, res) => {
        try {
            res.render("emailConfirm");
        } catch (error) {
            res.render("pageNotFound");
        }
    };

    renderProfileUser = (req, res) => {
        try {
            res.render("profileUser");
        } catch (error) {
            res.render("pageNotFound");
        }
    };
}

module.exports = new ViewController();