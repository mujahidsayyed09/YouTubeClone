const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authentication");
const videoController = require("../Controllers/videoController");


router.post("/upload", auth, videoController.uploadVideo);
router.get("/videos", videoController.getAllVideo);
router.get("/video/:id", videoController.getVideoById);
router.get("/channel/:userId", videoController.getAllVideoByUserId);




module.exports = router;