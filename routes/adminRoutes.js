const adminController = require("../controller/adminController");
const express = require("express");
const app = express();
const router = express.Router();

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);
router.post("/changePassword/:id", adminController.changePassword);
router.patch("/updateProfile/:id", adminController.changeProfile);
router.get("/adminGet/:id", adminController.getAdmin);

exports.router = router;
