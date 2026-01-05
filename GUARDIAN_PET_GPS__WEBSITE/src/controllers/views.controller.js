const ConfigPageRepository = require("../repositories/configPage.repository");
const GuardianPetConfigRepository = require("../repositories/guardianPetConfig.repository");

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

    renderStore = (req, res) => {
        try {
            res.render("store");
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