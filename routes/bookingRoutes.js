const bookController = require("../controller/bookingController");
const express = require("express");
const router = express.Router();
const app = express();

router.post("/booking", bookController.booking);
router.get("/get_booking/:id", bookController.userbooking);
router.get("/get_venderbooking/:id", bookController.venderInquiry);

exports.router = router;
