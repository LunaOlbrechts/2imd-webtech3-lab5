const express = require("express");
const router = express.Router();
const messagesController = require('../../../controllers/api/v1/messages');

router.get("/", messagesController.getAllMessages);
router.get("/:id", messagesController.getMessageById);
router.post("/", messagesController.createMessage);
router.delete("/:id", messagesController.removeMessage);
router.put("/:id", messagesController.updateMessage);

module.exports = router;