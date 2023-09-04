const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register); // api/users/register
router.patch("/update", userController.updateUser); // api/users/update
router.post("/login", userController.login); // api/users/login

module.exports = router;