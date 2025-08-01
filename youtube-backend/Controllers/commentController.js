const Comment = require("../Models/comment");




exports.addComment = async(req,res)=>{
    try{
        let { video, message} = req.body;
        const comment = new Comment({ user: req.user._id, video, message });
        await comment.save();

        res.status(200).json({
            message: "Success",
            comment
        });
    }catch(error){
        res.status(400).json({ error: "Server error"})
    }
}

exports.getCommentByVideoId = async(req, res)=>{
    try{
        let {videoId} = req.params;
        const comments = await Comment.find({ video: videoId}).populate("user", "channelName profilePic userName createdAt");          
        
        res.status(200).json({
            message: "Success",
            comments
        });
    }catch(error){
        res.status(400).json({ error: "Server error"})
    }
}