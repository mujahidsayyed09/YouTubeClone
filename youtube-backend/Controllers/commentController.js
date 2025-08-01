const mongoose = require("mongoose");
const Comment = require("../Models/comment");

exports.addComment = async (req, res) => {
    try {
        let { video, message } = req.body;

        // Validate input
        if (!message || !message.trim()) {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }
        if (!mongoose.Types.ObjectId.isValid(video)) {
            return res.status(400).json({ error: "Invalid video ID" });
        }

        const comment = new Comment({ user: req.user._id, video, message });
        await comment.save();

        res.status(200).json({
            message: "Success",
            comment
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.getCommentByVideoId = async (req, res) => {
    try {
        let { videoId } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ error: "Invalid video ID" });
        }

        const comments = await Comment.find({ video: videoId })
            .populate("user", "channelName profilePic userName createdAt")
            .sort({ createdAt: -1 }); // latest comments first

        res.status(200).json({
            message: "Success",
            comments
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
