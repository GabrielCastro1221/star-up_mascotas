const { Router } = require('express');
const TicketController = require('../controllers/ticket.controller');
const ticketController = require('../controllers/ticket.controller');

const router = Router();

router.post("/cart/:cid/finish-purchase", TicketController.finishPurchase);
router.get("/:id", TicketController.getTicketById);
router.get("/products/:id", ticketController.getProductsByTicketId);
router.put("/pay/:id", TicketController.payTicket);
router.put("/cancel/:id", TicketController.cancelTicket);
router.put("/process/:id", TicketController.processTicket);
router.delete("/:id", TicketController.deleteTicket);

module.exports = router;
