const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authentication");
const videoController = require("../Controllers/videoController");


router.post("/video", auth, videoController.uploadVideo);
router.get("/allVideo", videoController.getAllVideo);
router.get("/getVideoById/:id", videoController.getVideoById);
router.get("/:userId/channel", videoController.getAllVideoByUserId);



module.exports = router;